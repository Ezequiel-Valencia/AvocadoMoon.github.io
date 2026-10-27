<script lang="ts">
  import { onMount } from 'svelte';
  import {
    describe,
    fetchCurrentForCities,
    globeCities,
    reverseGeocode,
    type CityNow,
    type Units,
    type WeatherLocation,
  } from './weather';

  interface Props {
    units: Units;
    current: WeatherLocation;
    onselect: (location: WeatherLocation) => void;
    onclose: () => void;
  }

  let { units, current, onselect, onclose }: Props = $props();

  const deg = Math.PI / 180;
  const minZoom = 0.8;
  const maxZoom = 5;
  const maxLat = 80 * deg;

  let canvas: HTMLCanvasElement;
  let stage: HTMLElement;

  // Size of the stage in CSS pixels; the globe is centered in it and allowed to grow past
  // its edges when zoomed in
  let width = $state(0);
  let height = $state(0);

  // The point of the Earth facing the viewer, in radians
  let centerLon = $state(0);
  let centerLat = $state(0);
  let zoom = $state(1);
  let radius = $derived(0.4 * Math.min(width * 0.92, height * 0.62) * zoom);

  let textureLoaded = $state(false);
  let unsupported = $state(false);
  let cityWeather: CityNow[] = $state([]);
  let picking = $state<{ latitude: number; longitude: number } | null>(null);
  let busy = $state(false);

  let cities = $derived(
    globeCities.some((c) => c.name == current.name) ? globeCities : [...globeCities, current]
  );

  let markers = $derived(
    cities
      .map((city, i) => ({ city, now: cityWeather[i], ...project(city.latitude, city.longitude) }))
      .filter((m) => m.depth > 0.12 && m.x > 0 && m.x < width && m.y > 0 && m.y < height)
  );
  let pickMarker = $derived(picking ? project(picking.latitude, picking.longitude) : null);

  // Generated once so the starfield stays put between renders
  const stars = Array.from({ length: 160 }, () => {
    const x = Math.round(Math.random() * 100);
    const y = Math.round(Math.random() * 100);
    const alpha = (0.3 + Math.random() * 0.7).toFixed(2);
    return `${x}vw ${y}vh 0 ${Math.random() < 0.15 ? 1 : 0}px rgba(255,255,255,${alpha})`;
  }).join(',');

  // Each pixel is sampled from the equirectangular Earth texture on the GPU, so the globe
  // stays sharp and fast at any zoom. Shaded from a light in the upper left, with a soft
  // atmosphere glow around the rim.
  const vertexSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision highp float;
    uniform sampler2D earth;
    uniform vec2 size;
    uniform float pixelRatio;
    uniform float radius;
    uniform float centerLon;
    uniform float centerLat;
    const float PI = 3.14159265;

    void main() {
      vec2 n = (gl_FragCoord.xy / pixelRatio - size * 0.5) / radius;
      float d = length(n);

      float rim = max(0.0, d - 1.0) * radius;
      float haze = 0.55 * exp(-rim / 18.0) + 0.25 * exp(-rim / 70.0);
      vec4 atmosphere = vec4(vec3(0.43, 0.75, 1.0) * haze, haze);

      // soften the rim so the edge isn't jagged
      float inside = clamp((1.0 - d) * radius * pixelRatio, 0.0, 1.0);
      if (inside <= 0.0) {
        gl_FragColor = atmosphere;
        return;
      }

      float z = sqrt(max(0.0, 1.0 - d * d));
      float s0 = sin(centerLat);
      float c0 = cos(centerLat);
      float lat = asin(clamp(z * s0 + n.y * c0, -1.0, 1.0));
      float lon = centerLon + atan(n.x, z * c0 - n.y * s0);
      vec2 uv = vec2(lon / (2.0 * PI) + 0.5, 0.5 - lat / PI);
      vec3 color = texture2D(earth, uv).rgb;

      float light = 0.3 + 0.85 * max(0.0, -0.4 * n.x + 0.45 * n.y + 0.8 * z);
      color = color * light + vec3(0.0, 0.0, 0.05);
      gl_FragColor = mix(atmosphere, vec4(color, 1.0), inside);
    }
  `;

  let gl: WebGLRenderingContext | null = null;
  let uniforms: Record<string, WebGLUniformLocation | null> = {};
  let pixelRatio = 1;
  let autoSpin = true;
  let dragging = false;
  let flight: {
    from: [number, number, number];
    to: [number, number, number];
    start: number;
    duration: number;
    done: () => void;
  } | null = null;

  onMount(() => {
    centerLon = current.longitude * deg;
    centerLat = clampLat(current.latitude * deg);

    gl = setupGl();
    if (!gl) unsupported = true;

    // The last view drawn; cleared to force a redraw
    let last = '';

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Capped so huge high-DPI screens don't render more pixels than they need
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      last = '';
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);

    const img = new Image();
    img.onload = () => {
      if (!gl) return;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      // No mipmaps: the longitude wraps around behind the poles, and a mip lookup there
      // would draw a visible seam
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      textureLoaded = true;
      last = '';
    };
    img.src = '/weather/earth.jpg';

    fetchCurrentForCities(cities, units)
      .then((w) => (cityWeather = w))
      .catch(() => {
        // the globe still works without the temperature bubbles
      });

    // Registered by hand so preventDefault can stop the page from scrolling
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (busy) return;
      autoSpin = false;
      zoom = Math.min(maxZoom, Math.max(minZoom, zoom * Math.exp(-e.deltaY * 0.001)));
    };
    stage.addEventListener('wheel', onWheel, { passive: false });

    const onKey = (e: KeyboardEvent) => {
      if (e.key == 'Escape' && !busy) onclose();
    };
    window.addEventListener('keydown', onKey);

    let raf = requestAnimationFrame(tick);
    function tick(time: number) {
      if (flight) {
        const p = Math.min(1, (time - flight.start) / flight.duration);
        const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        centerLon = flight.from[0] + (flight.to[0] - flight.from[0]) * ease;
        centerLat = flight.from[1] + (flight.to[1] - flight.from[1]) * ease;
        zoom = flight.from[2] + (flight.to[2] - flight.from[2]) * ease;
        if (p == 1) {
          const done = flight.done;
          flight = null;
          done();
        }
      } else if (autoSpin && !dragging) {
        centerLon += 0.0015;
      }
      const key = `${centerLon},${centerLat},${radius}`;
      if (key != last && textureLoaded) {
        last = key;
        render();
      }
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      stage.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    };
  });

  function setupGl() {
    const context = canvas.getContext('webgl', { antialias: false });
    if (!context) return null;
    const program = context.createProgram() as WebGLProgram;
    for (const [type, source] of [
      [context.VERTEX_SHADER, vertexSource],
      [context.FRAGMENT_SHADER, fragmentSource],
    ] as const) {
      const shader = context.createShader(type) as WebGLShader;
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error(context.getShaderInfoLog(shader));
        return null;
      }
      context.attachShader(program, shader);
    }
    context.linkProgram(program);
    if (!context.getProgramParameter(program, context.LINK_STATUS)) return null;
    context.useProgram(program);

    // One triangle that covers the whole canvas
    context.bindBuffer(context.ARRAY_BUFFER, context.createBuffer());
    context.bufferData(
      context.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      context.STATIC_DRAW
    );
    const position = context.getAttribLocation(program, 'position');
    context.enableVertexAttribArray(position);
    context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);

    for (const name of ['size', 'pixelRatio', 'radius', 'centerLon', 'centerLat']) {
      uniforms[name] = context.getUniformLocation(program, name);
    }
    return context;
  }

  function render() {
    if (!gl) return;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.size, canvas.width / pixelRatio, canvas.height / pixelRatio);
    gl.uniform1f(uniforms.pixelRatio, pixelRatio);
    gl.uniform1f(uniforms.radius, radius);
    // Wrapped so float precision on the GPU doesn't degrade after a long spin
    gl.uniform1f(uniforms.centerLon, wrapLon(centerLon));
    gl.uniform1f(uniforms.centerLat, centerLat);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function clampLat(lat: number) {
    return Math.max(-maxLat, Math.min(maxLat, lat));
  }

  // Orthographic projection of a lat/lon (degrees) to a pixel position on the stage.
  // depth is the cosine of the angle from the globe's center, so <= 0 is the far side.
  function project(latitude: number, longitude: number) {
    const phi = latitude * deg;
    const dLon = longitude * deg - centerLon;
    const sin0 = Math.sin(centerLat);
    const cos0 = Math.cos(centerLat);
    const depth = sin0 * Math.sin(phi) + cos0 * Math.cos(phi) * Math.cos(dLon);
    const x = width / 2 + radius * Math.cos(phi) * Math.sin(dLon);
    const y = height / 2 - radius * (cos0 * Math.sin(phi) - sin0 * Math.cos(phi) * Math.cos(dLon));
    return { x, y, depth };
  }

  // Inverse projection from stage pixels back to lat/lon (degrees), or null off the globe
  function unproject(px: number, py: number) {
    const nx = (px - width / 2) / radius;
    const ny = (height / 2 - py) / radius;
    const rr = nx * nx + ny * ny;
    if (rr > 1) return null;
    const z = Math.sqrt(1 - rr);
    const sin0 = Math.sin(centerLat);
    const cos0 = Math.cos(centerLat);
    const lat = Math.asin(z * sin0 + ny * cos0);
    const lon = centerLon + Math.atan2(nx, z * cos0 - ny * sin0);
    return { latitude: lat / deg, longitude: wrapLon(lon) / deg };
  }

  function wrapLon(lon: number) {
    return ((((lon + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
  }

  // Spins the globe to face a point, zooms in, then runs done
  function flyTo(latitude: number, longitude: number, done: () => void) {
    autoSpin = false;
    const dLon = wrapLon(longitude * deg - centerLon);
    flight = {
      from: [centerLon, centerLat, zoom],
      to: [centerLon + dLon, clampLat(latitude * deg), Math.max(zoom, 1.8)],
      start: performance.now(),
      duration: 900,
      done,
    };
  }

  function chooseCity(city: WeatherLocation) {
    if (busy) return;
    busy = true;
    flyTo(city.latitude, city.longitude, () => onselect(city));
  }

  async function choosePoint(latitude: number, longitude: number) {
    if (busy) return;
    busy = true;
    picking = { latitude, longitude };
    const landed = new Promise<void>((resolve) => flyTo(latitude, longitude, resolve));
    const [name] = await Promise.all([reverseGeocode(latitude, longitude), landed]);
    onselect({
      name,
      latitude: Math.round(latitude * 100) / 100,
      longitude: Math.round(longitude * 100) / 100,
    });
  }

  let dragStart = { x: 0, y: 0, lon: 0, lat: 0, moved: false };

  function pointerDown(e: PointerEvent) {
    if (busy) return;
    dragging = true;
    autoSpin = false;
    dragStart = { x: e.clientX, y: e.clientY, lon: centerLon, lat: centerLat, moved: false };
    stage.setPointerCapture(e.pointerId);
  }

  function pointerMove(e: PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) dragStart.moved = true;
    // One pixel of drag turns the globe by one pixel at its center, so the Earth follows
    // the pointer at every zoom level
    centerLon = dragStart.lon - dx / radius;
    centerLat = clampLat(dragStart.lat + dy / radius);
  }

  function pointerUp(e: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    if (dragStart.moved) return;
    // A tap without dragging picks that spot on the Earth
    const rect = stage.getBoundingClientRect();
    const point = unproject(e.clientX - rect.left, e.clientY - rect.top);
    if (point) choosePoint(point.latitude, point.longitude);
  }

  function zoomBy(factor: number) {
    autoSpin = false;
    zoom = Math.min(maxZoom, Math.max(minZoom, zoom * factor));
  }
</script>

<div class="space" role="dialog" aria-modal="true" aria-label="Choose a city">
  <div class="stars" style="box-shadow: {stars};"></div>

  <div
    class="stage"
    bind:this={stage}
    onpointerdown={pointerDown}
    onpointermove={pointerMove}
    onpointerup={pointerUp}
    onpointercancel={() => (dragging = false)}
    role="application"
    aria-label="Globe"
  >
    <canvas bind:this={canvas}></canvas>

    {#if unsupported}
      <p class="loading">Your browser can't draw the globe. Try searching for a city instead.</p>
    {:else if !textureLoaded}
      <p class="loading">Loading globe…</p>
    {/if}

    {#each markers as m (m.city.name)}
      {@const cond = m.now ? describe(m.now.weatherCode, m.now.isDay) : null}
      <button
        class="bubble"
        class:current={m.city.name == current.name}
        style="left: {m.x}px; top: {m.y}px; opacity: {Math.min(1, (m.depth - 0.12) * 4)};
          z-index: {Math.round(m.depth * 100)};"
        onpointerdown={(e) => e.stopPropagation()}
        onclick={() => chooseCity(m.city)}
        title={m.city.name}
      >
        <span class="bubble-body">
          {#if cond && m.now}
            <span>{cond.icon}</span><span>{Math.round(m.now.temp)}°</span>
          {:else}
            <span>📍</span>
          {/if}
        </span>
        <span class="city-name">{m.city.name.split(',')[0]}</span>
      </button>
    {/each}

    {#if pickMarker && pickMarker.depth > 0}
      <span class="pick" style="left: {pickMarker.x}px; top: {pickMarker.y}px;">📍</span>
    {/if}
  </div>

  <header>
    <h2>Choose a Location</h2>
    <p>Drag to spin · Scroll to zoom · Tap a city or anywhere on Earth</p>
  </header>

  <div class="controls">
    <button onclick={() => zoomBy(1 / 1.25)} aria-label="Zoom out" disabled={busy}>−</button>
    <button class="back" onclick={onclose} disabled={busy}>
      {busy ? 'Loading forecast…' : 'Back'}
    </button>
    <button onclick={() => zoomBy(1.25)} aria-label="Zoom in" disabled={busy}>+</button>
  </div>
</div>

<style lang="scss">
  $wii-blue: rgb(52, 190, 237);
  $deep-blue: rgb(18, 76, 150);

  .space {
    position: fixed;
    inset: 0;
    z-index: 900;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 8vh 16px 3vh;
    overflow: hidden;
    color: white;
    background: radial-gradient(ellipse at center, rgb(16, 30, 64) 0%, rgb(3, 6, 18) 70%);
    animation: fadeIn 0.4s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    pointer-events: none;
  }

  // Header and controls float over the globe, which fills the whole screen so it can be
  // zoomed in past the edges without being cropped
  header {
    position: relative;
    z-index: 1;
    text-align: center;
    pointer-events: none;
    text-shadow: 0 1px 4px black;
    h2 {
      font-size: clamp(1.4rem, 4vw, 2.2rem);
      font-weight: bold;
      text-shadow: 0 0 12px rgba(52, 190, 237, 0.8);
    }
    p {
      opacity: 0.75;
      font-size: 0.9rem;
    }
  }

  .stage {
    position: absolute;
    inset: 0;
    z-index: 0;
    touch-action: none;
    cursor: grab;
    user-select: none;
  }

  .stage:active {
    cursor: grabbing;
  }

  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .loading {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .bubble {
    position: absolute;
    transform: translate(-50%, -100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    color: white;
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  .bubble-body {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: bold;
    font-size: clamp(0.7rem, 1.6vmin, 0.95rem);
    color: $deep-blue;
    background: linear-gradient(180deg, white, rgb(210, 238, 255));
    border: 2px solid $wii-blue;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    transition: transform 0.15s;
    white-space: nowrap;
  }

  // the little tail pointing at the city
  .bubble::after {
    content: '';
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: $wii-blue;
    order: 1;
  }

  .city-name {
    order: 2;
    position: absolute;
    top: 100%;
    font-size: 0.75rem;
    white-space: nowrap;
    text-shadow: 0 1px 3px black;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
  }

  .bubble:hover,
  .bubble:focus-visible {
    z-index: 200 !important;
    .bubble-body {
      transform: scale(1.2);
    }
    .city-name {
      opacity: 1;
    }
  }

  .bubble.current .bubble-body {
    border-color: rgb(255, 200, 40);
    background: linear-gradient(180deg, rgb(255, 250, 220), rgb(255, 225, 140));
  }

  .bubble.current .city-name {
    opacity: 1;
  }

  .pick {
    position: absolute;
    transform: translate(-50%, -100%);
    font-size: 1.8rem;
    z-index: 150;
    pointer-events: none;
    animation: drop 0.4s ease-out;
  }

  @keyframes drop {
    from {
      transform: translate(-50%, -250%);
      opacity: 0;
    }
  }

  .controls {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 12px;
    align-items: center;
    button {
      min-width: 48px;
      height: 48px;
      padding: 0 16px;
      border-radius: 999px;
      border: 3px solid rgba(255, 255, 255, 0.9);
      background: linear-gradient(180deg, $wii-blue, $deep-blue);
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
      &:disabled {
        opacity: 0.6;
      }
    }
    .back {
      min-width: 160px;
      font-size: 1rem;
    }
  }
</style>
