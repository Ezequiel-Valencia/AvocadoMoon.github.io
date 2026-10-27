<script lang="ts">
  import { onMount } from 'svelte';
  import Menu from '../../common/menu.svelte';
  import { safeLocalStorage } from '../../common/myLocalStorage';
  import Globe from './globe.svelte';
  import {
    clockTime,
    compassDirection,
    dayName,
    daylightAt,
    defaultLocation,
    describe,
    fetchForecast,
    reverseGeocode,
    searchLocation,
    shortDate,
    type Forecast,
    type Units,
    type WeatherLocation,
  } from './weather';

  const locationKey = 'weather-location';
  const unitsKey = 'weather-units';
  const paletteKey = 'weather-palette';

  type PaletteMode = 'auto' | 'day' | 'night';
  const paletteModes: PaletteMode[] = ['auto', 'day', 'night'];
  const paletteLabels: Record<PaletteMode, string> = {
    auto: '🌗 Auto',
    day: '☀️ Day',
    night: '🌙 Night',
  };

  let location: WeatherLocation = $state(defaultLocation);
  let units: Units = $state('imperial');
  let forecast = $state<Forecast | null>(null);
  let loading = $state(true);
  let error = $state('');

  let view: 'week' | 'day' = $state('week');
  let selectedDay = $state(0);

  let searchText = $state('');
  let searching = $state(false);
  let locating = $state(false);
  let showGlobe = $state(false);

  let paletteMode = $state<PaletteMode>('auto');
  let now = $state(Date.now());
  // Auto follows the location's sunrise and sunset, starting on the night palette until the
  // forecast arrives so it fades in to day on load
  let daylight = $derived(
    paletteMode == 'day' ? 1 : paletteMode == 'night' ? 0 : forecast ? daylightAt(forecast, now) : 0
  );

  let tempUnit = $derived(units == 'imperial' ? '°F' : '°C');
  let speedUnit = $derived(units == 'imperial' ? 'mph' : 'km/h');
  let precipUnit = $derived(units == 'imperial' ? 'in' : 'mm');

  let day = $derived(forecast?.days[selectedDay]);
  // Every third hour keeps the day view readable without horizontal scrolling
  let dayHours = $derived(forecast?.hours[selectedDay].filter((_, i) => i % 3 == 0) ?? []);

  onMount(() => {
    try {
      const saved = safeLocalStorage?.getItem(locationKey);
      if (saved) location = JSON.parse(saved);
      // older saves used a generic label instead of the town name
      if (location.name == 'Your Location') {
        reverseGeocode(location.latitude, location.longitude).then((name) =>
          changeLocation({ ...location, name })
        );
      }
      const savedUnits = safeLocalStorage?.getItem(unitsKey);
      if (savedUnits == 'metric' || savedUnits == 'imperial') units = savedUnits;
      const savedPalette = safeLocalStorage?.getItem(paletteKey);
      if (paletteModes.includes(savedPalette as PaletteMode)) {
        paletteMode = savedPalette as PaletteMode;
      }
    } catch {
      // ignore unreadable saved settings and fall back to the defaults
    }
    loadForecast();

    // keeps dawn and dusk moving while the page is left open
    const clock = setInterval(() => (now = Date.now()), 60 * 1000);
    return () => clearInterval(clock);
  });

  async function loadForecast() {
    loading = true;
    error = '';
    try {
      forecast = await fetchForecast(location, units);
    } catch {
      error = 'Could not reach the forecast service. Please try again later.';
    }
    loading = false;
  }

  function changeLocation(newLocation: WeatherLocation) {
    location = newLocation;
    selectedDay = 0;
    try {
      safeLocalStorage?.setItem(locationKey, JSON.stringify(newLocation));
    } catch {
      // saving is a convenience only
    }
    loadForecast();
  }

  async function search(e: SubmitEvent) {
    e.preventDefault();
    if (searchText.trim() == '') return;
    searching = true;
    error = '';
    try {
      const found = await searchLocation(searchText.trim());
      if (found) {
        searchText = '';
        changeLocation(found);
      } else {
        error = `No place found named "${searchText.trim()}".`;
      }
    } catch {
      error = 'Location search is unavailable right now.';
    }
    searching = false;
  }

  function useMyLocation() {
    if (!navigator.geolocation) {
      error = 'Your browser does not support location lookup.';
      return;
    }
    locating = true;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = Math.round(pos.coords.latitude * 100) / 100;
        const longitude = Math.round(pos.coords.longitude * 100) / 100;
        const name = await reverseGeocode(latitude, longitude);
        locating = false;
        changeLocation({ name, latitude, longitude });
      },
      () => {
        locating = false;
        error = 'Location permission was denied.';
      }
    );
  }

  function toggleUnits() {
    units = units == 'imperial' ? 'metric' : 'imperial';
    try {
      safeLocalStorage?.setItem(unitsKey, units);
    } catch {
      // saving is a convenience only
    }
    loadForecast();
  }

  function cyclePalette() {
    paletteMode = paletteModes[(paletteModes.indexOf(paletteMode) + 1) % paletteModes.length];
    try {
      safeLocalStorage?.setItem(paletteKey, paletteMode);
    } catch {
      // saving is a convenience only
    }
  }

  function openDay(index: number) {
    selectedDay = index;
    view = 'day';
  }
</script>

<svelte:head>
  <title>Weather</title>
</svelte:head>

<section id="main-body" style="--daylight: {daylight}">
  <Menu
    songName="Weather Channel"
    songPath="https://youtu.be/1H5b4n0l7SY?si=AAn7V-avfpVpzcWH"
    songVolumeLevel="0.2"
  ></Menu>

  <header class="top-bar">
    <div class="location">
      <button class="pin" onclick={() => (showGlobe = true)} title="Pick on globe">🌐</button>
      <h1>{location.name}</h1>
    </div>
    <form class="search" onsubmit={search}>
      <input type="text" placeholder="Search a city…" bind:value={searchText} aria-label="City" />
      <button type="submit" class="pill" disabled={searching}>{searching ? '…' : 'Go'}</button>
      <button
        type="button"
        class="pill"
        onclick={useMyLocation}
        title="Use my location"
        disabled={locating}
      >
        {locating ? '…' : '🧭'}
      </button>
      <button type="button" class="pill" onclick={() => (showGlobe = true)} title="Pick on globe">
        🌐 Globe
      </button>
    </form>
  </header>

  <nav class="view-toggle" aria-label="Forecast view">
    <button class:active={view == 'week'} onclick={() => (view = 'week')}>Week</button>
    <button class:active={view == 'day'} onclick={() => (view = 'day')}>Day</button>
    <button class="units" onclick={toggleUnits} title="Switch units">{tempUnit}</button>
    <button
      class="palette"
      onclick={cyclePalette}
      title="Colours: automatic follows sunrise and sunset"
      aria-label="Colour palette: {paletteMode}"
    >
      {paletteLabels[paletteMode]}
    </button>
  </nav>

  {#if showGlobe}
    <Globe
      {units}
      current={location}
      onselect={(loc) => {
        showGlobe = false;
        changeLocation(loc);
      }}
      onclose={() => (showGlobe = false)}
    ></Globe>
  {/if}

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if loading && !forecast}
    <div class="panel loading">
      <span class="spin">🌐</span>
      <p>Fetching the forecast…</p>
    </div>
  {:else if forecast}
    <!-- ################ Week View ################ -->
    {#if view == 'week'}
      {@const now = describe(forecast.current.weatherCode, forecast.current.isDay)}
      <div class="panel now">
        <span class="big-icon">{now.icon}</span>
        <div>
          <p class="label">Right Now</p>
          <p class="big-temp">{Math.round(forecast.current.temp)}{tempUnit}</p>
          <p>{now.label} · Feels like {Math.round(forecast.current.feelsLike)}{tempUnit}</p>
        </div>
      </div>

      <div class="week">
        {#each forecast.days as d, i (d.date)}
          {@const cond = describe(d.weatherCode)}
          <button class="panel day-card" onclick={() => openDay(i)}>
            <p class="day-name">{dayName(d.date, i)}</p>
            <p class="date">{shortDate(d.date)}</p>
            <span class="icon">{cond.icon}</span>
            <p class="cond">{cond.label}</p>
            <p class="temps">
              <span class="hi">{Math.round(d.tempMax)}°</span>
              <span class="lo">{Math.round(d.tempMin)}°</span>
            </p>
            <p class="rain">💧 {d.precipChance}%</p>
          </button>
        {/each}
      </div>
      <p class="hint">Select a day for its detailed forecast</p>

      <!-- ################ Day View ################ -->
    {:else if day}
      {@const cond = describe(day.weatherCode)}
      <div class="day-nav">
        <button
          class="arrow"
          aria-label="Previous day"
          disabled={selectedDay == 0}
          onclick={() => selectedDay--}>◀</button
        >
        <div class="day-title">
          <h2>{dayName(day.date, selectedDay, true)}</h2>
          <p>{shortDate(day.date)}</p>
        </div>
        <button
          class="arrow"
          aria-label="Next day"
          disabled={selectedDay == forecast.days.length - 1}
          onclick={() => selectedDay++}>▶</button
        >
      </div>

      <div class="panel summary">
        <div class="summary-main">
          <span class="big-icon">{cond.icon}</span>
          <div>
            <p class="cond-big">{cond.label}</p>
            <p class="temps">
              <span class="hi">{Math.round(day.tempMax)}{tempUnit}</span>
              <span class="lo">{Math.round(day.tempMin)}{tempUnit}</span>
            </p>
          </div>
        </div>
        <dl class="stats">
          <div>
            <dt>Chance of Rain</dt>
            <dd>{day.precipChance}%</dd>
          </div>
          <div>
            <dt>Precipitation</dt>
            <dd>{day.precipSum.toFixed(units == 'imperial' ? 2 : 1)} {precipUnit}</dd>
          </div>
          <div>
            <dt>Max Wind</dt>
            <dd>{Math.round(day.windMax)} {speedUnit} {compassDirection(day.windDirection)}</dd>
          </div>
          <div>
            <dt>UV Index</dt>
            <dd>{day.uvMax.toFixed(1)}</dd>
          </div>
          <div>
            <dt>Sunrise</dt>
            <dd>🌅 {clockTime(day.sunrise)}</dd>
          </div>
          <div>
            <dt>Sunset</dt>
            <dd>🌇 {clockTime(day.sunset)}</dd>
          </div>
        </dl>
      </div>

      <div class="hours">
        {#each dayHours as h (h.time)}
          {@const hc = describe(h.weatherCode, h.isDay)}
          <div class="panel hour">
            <p class="hour-time">{clockTime(h.time)}</p>
            <span class="icon" title={hc.label}>{hc.icon}</span>
            <p class="hour-temp">{Math.round(h.temp)}°</p>
            <p class="small">Feels {Math.round(h.feelsLike)}°</p>
            <p class="small">💧 {h.precipChance}%</p>
            <p class="small">💨 {Math.round(h.wind)} {speedUnit}</p>
            <p class="small">Humidity {h.humidity}%</p>
          </div>
        {/each}
      </div>
    {/if}
  {/if}

  <footer>
    Forecast data from <a href="https://open-meteo.com/" target="_blank" rel="noreferrer"
      >Open-Meteo</a
    >
  </footer>
</section>

<style lang="scss">
  // Day is the light Wii sky; night is a local-forecast TV look with deep blues and broadcast
  // green. --daylight (0 to 1, set from the location's sunrise and sunset) blends between them.

  // day palette
  $wii-blue: rgb(52, 190, 237);
  $wii-deep-blue: rgb(18, 76, 150);
  $day-text: rgb(30, 40, 60);
  $day-muted: rgb(80, 95, 120);

  // night palette
  $navy: rgb(6, 16, 52);
  $deep-blue: rgb(14, 38, 104);
  $mid-blue: rgb(34, 78, 170);
  $light-blue: rgb(140, 195, 255);
  $green: rgb(40, 170, 80);
  $dark-green: rgb(14, 96, 44);
  $light-green: rgb(130, 235, 140);
  $night-muted: rgb(175, 195, 230);

  $wii-cursor:
    url('/Cursors/Wii-Curso-plain.png') 10 1,
    auto;
  $wii-hover:
    url('/Cursors/wii-open2.png') 17 1,
    pointer;

  @function day-night($day, $night) {
    @return color-mix(in srgb, #{$day} calc(var(--daylight) * 100%), #{$night});
  }

  // Registered so it can be transitioned, which lets every colour built from it fade together
  @property --daylight {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
  }

  #main-body {
    --text: #{day-night($day-text, white)};
    --heading: #{day-night($wii-deep-blue, white)};
    --label: #{day-night($wii-deep-blue, $light-green)};
    --muted: #{day-night($day-muted, $night-muted)};
    --rain: #{day-night($wii-deep-blue, $light-blue)};
    --hi: #{day-night(rgb(225, 80, 40), rgb(255, 180, 90))};
    --lo: #{day-night(rgb(40, 110, 210), $light-blue)};
    --error: #{day-night(rgb(170, 20, 20), rgb(255, 130, 120))};
    --accent-top: #{day-night($wii-blue, $green)};
    --accent-bottom: #{day-night($wii-deep-blue, $dark-green)};
    --accent-hover: #{day-night($wii-blue, $light-green)};
    --panel-top: #{day-night(rgba(255, 255, 255, 0.95), $mid-blue)};
    --panel-bottom: #{day-night(rgba(225, 242, 255, 0.92), $deep-blue)};
    --panel-border: #{day-night(rgba(255, 255, 255, 0.9), rgba(150, 190, 255, 0.55))};
    --panel-shadow: #{day-night(rgba(18, 76, 150, 0.25), rgba(0, 0, 0, 0.45))};
    --panel-inset: #{day-night(rgba(52, 190, 237, 0.25), rgba(255, 255, 255, 0.25))};
    --text-shadow: #{day-night(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))};
    --toggle-bg: #{day-night(rgba(255, 255, 255, 0.6), rgba(14, 38, 104, 0.7))};
    --toggle-text: #{day-night($wii-deep-blue, $light-blue)};
    --toggle-hover-bg: #{day-night(white, $mid-blue)};
    --toggle-hover-text: #{day-night($wii-deep-blue, white)};
    --pill-top: #{day-night(white, $mid-blue)};
    --pill-bottom: #{day-night(white, $deep-blue)};
    --pill-text: #{day-night($wii-deep-blue, white)};
    --input-border: #{day-night(white, $dark-green)};

    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
    padding: 9vh 16px 4vh;
    box-sizing: border-box;
    font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
    color: var(--text);
    cursor: $wii-cursor;
    transition: --daylight 3s ease;
    // keeps the day sky below underneath the page content
    isolation: isolate;
    background:
      repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 3px),
      radial-gradient(ellipse at 50% 0%, rgba(60, 120, 230, 0.45) 0, transparent 60%),
      linear-gradient(180deg, $deep-blue 0%, rgb(10, 26, 78) 50%, $navy 100%);
  }

  // Gradients can't blend into each other, so the day sky sits over the night one and fades
  #main-body::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    opacity: var(--daylight);
    background:
      radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.55) 0, transparent 30%),
      linear-gradient(
        180deg,
        rgb(120, 200, 255) 0%,
        rgb(190, 232, 255) 55%,
        rgb(240, 250, 255) 100%
      );
  }

  // :global so the shared menu's buttons get the Wii hand too
  #main-body :global(button:not(:disabled)),
  #main-body :global(a) {
    cursor: $wii-hover;
  }

  #main-body :global(button:disabled) {
    cursor: $wii-cursor;
  }

  .panel {
    background: linear-gradient(180deg, var(--panel-top), var(--panel-bottom));
    border: 2px solid var(--panel-border);
    border-radius: 14px;
    box-shadow:
      0 4px 14px var(--panel-shadow),
      inset 0 -3px 0 var(--panel-inset);
    text-shadow: 0 1px 2px var(--text-shadow);
  }

  .top-bar {
    max-width: 1100px;
    margin: 0 auto 2vh;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(180deg, var(--accent-top), var(--accent-bottom));
    border: 2px solid rgba(255, 255, 255, 0.85);
    border-radius: 999px;
    padding: 10px 20px;
    color: white;
    box-shadow: 0 4px 14px var(--panel-shadow);
  }

  .location {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    h1 {
      font-size: clamp(1.1rem, 3vw, 1.8rem);
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .pin {
    font-size: 1.5rem;
    transition: transform 0.2s;
    &:hover {
      transform: rotate(20deg) scale(1.15);
    }
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    input {
      border-radius: 999px;
      border: 2px solid var(--input-border);
      padding: 6px 14px;
      color: black;
      width: min(220px, 45vw);
    }
  }

  .pill {
    border-radius: 999px;
    background: linear-gradient(180deg, var(--pill-top), var(--pill-bottom));
    color: var(--pill-text);
    font-weight: bold;
    padding: 6px 14px;
    border: 2px solid rgba(255, 255, 255, 0.7);
    transition: filter 0.2s;
    &:hover:not(:disabled) {
      filter: brightness(1.15);
    }
  }

  .view-toggle {
    max-width: 1100px;
    margin: 0 auto 2vh;
    display: flex;
    justify-content: center;
    gap: 10px;
    button {
      min-width: 110px;
      padding: 8px 20px;
      border-radius: 999px;
      border: 2px solid var(--panel-border);
      background: var(--toggle-bg);
      color: var(--toggle-text);
      font-weight: bold;
      font-size: 1.1rem;
      transition:
        background 0.2s,
        color 0.2s;
    }
    button.active {
      background: linear-gradient(180deg, var(--accent-top), var(--accent-bottom));
      border-color: rgba(255, 255, 255, 0.85);
      color: white;
    }
    button:hover:not(.active) {
      background: var(--toggle-hover-bg);
      color: var(--toggle-hover-text);
    }
    .units {
      min-width: 60px;
    }
    .palette {
      min-width: 120px;
    }
  }

  .error {
    text-align: center;
    color: var(--error);
    font-weight: bold;
    margin-bottom: 1.5vh;
  }

  .loading {
    max-width: 400px;
    margin: 5vh auto;
    padding: 30px;
    text-align: center;
    .spin {
      font-size: 3rem;
      display: inline-block;
      animation: spin 2s linear infinite;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .now {
    max-width: 1100px;
    margin: 0 auto 2vh;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    .label {
      color: var(--label);
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .big-icon {
    font-size: clamp(3rem, 8vw, 5rem);
    line-height: 1;
  }

  .big-temp {
    font-size: 2.4rem;
    font-weight: bold;
    color: var(--heading);
    line-height: 1.1;
  }

  .week {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }

  .day-card {
    padding: 0 0 14px;
    overflow: hidden;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text);
    transition:
      transform 0.2s,
      border-color 0.2s;
    &:hover {
      transform: translateY(-6px) scale(1.03);
      border-color: var(--accent-hover);
    }
    // coloured header strip like a broadcast forecast tile
    .day-name {
      width: 100%;
      padding: 6px 4px 4px;
      font-weight: bold;
      color: white;
      font-size: 1.1rem;
      text-transform: uppercase;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
      background: linear-gradient(180deg, var(--accent-top), var(--accent-bottom));
    }
    .date,
    .cond {
      font-size: 0.85rem;
      color: var(--muted);
    }
    .icon {
      font-size: 2.6rem;
      margin: 6px 0;
    }
    .cond {
      min-height: 2.2em;
    }
  }

  .temps {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: baseline;
    font-weight: bold;
    .hi {
      color: var(--hi);
      font-size: 1.4rem;
    }
    .lo {
      color: var(--lo);
      font-size: 1.1rem;
    }
  }

  .rain {
    font-size: 0.9rem;
    color: var(--rain);
  }

  .hint {
    text-align: center;
    margin-top: 2vh;
    color: var(--muted);
  }

  .day-nav {
    max-width: 1100px;
    margin: 0 auto 2vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    .arrow {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.85);
      background: linear-gradient(180deg, var(--accent-top), var(--accent-bottom));
      color: white;
      font-size: 1.2rem;
      &:disabled {
        opacity: 0.35;
      }
    }
    .day-title {
      text-align: center;
      min-width: 160px;
      text-shadow: 0 1px 2px var(--text-shadow);
      h2 {
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--heading);
        text-transform: uppercase;
      }
      p {
        color: var(--label);
      }
    }
  }

  .summary {
    max-width: 1100px;
    margin: 0 auto 2vh;
    padding: 20px 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
    justify-content: space-between;
    .temps {
      justify-content: flex-start;
    }
  }

  .summary-main {
    display: flex;
    align-items: center;
    gap: 18px;
    .cond-big {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    gap: 12px 24px;
    dt {
      font-size: 0.8rem;
      color: var(--label);
      text-transform: uppercase;
    }
    dd {
      font-weight: bold;
      color: var(--heading);
    }
  }

  .hours {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 8px;
  }

  .hour {
    padding: 10px 4px;
    text-align: center;
    .hour-time {
      font-weight: bold;
      color: var(--label);
    }
    .icon {
      font-size: 1.8rem;
    }
    .hour-temp {
      font-size: 1.3rem;
      font-weight: bold;
    }
    .small {
      font-size: 0.75rem;
      color: var(--muted);
    }
  }

  footer {
    max-width: 1100px;
    margin: 4vh auto 0;
    padding: 6px 16px;
    text-align: center;
    font-size: 0.85rem;
    color: white;
    background: linear-gradient(180deg, var(--accent-top), var(--accent-bottom));
    border-radius: 999px;
    a {
      text-decoration: underline;
    }
  }

  @media (max-width: 900px) {
    .week {
      grid-template-columns: repeat(4, 1fr);
    }
    .hours {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 500px) {
    .top-bar {
      border-radius: 18px;
    }
    .week {
      grid-template-columns: repeat(2, 1fr);
    }
    .hours {
      grid-template-columns: repeat(2, 1fr);
    }
    .stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
