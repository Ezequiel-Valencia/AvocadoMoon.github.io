<!-- Drifting background shapes; each theme gives them their look and motion -->
<script lang="ts">
  // Same spread as the main page's floating blocks
  const particles = [
    { left: 25, size: 80, delay: 0, duration: 25 },
    { left: 10, size: 20, delay: 2, duration: 12 },
    { left: 70, size: 20, delay: 4, duration: 25 },
    { left: 40, size: 60, delay: 0, duration: 18 },
    { left: 65, size: 20, delay: 0, duration: 25 },
    { left: 75, size: 110, delay: 3, duration: 25 },
    { left: 35, size: 150, delay: 7, duration: 25 },
    { left: 50, size: 25, delay: 15, duration: 45 },
    { left: 20, size: 15, delay: 2, duration: 35 },
    { left: 85, size: 150, delay: 0, duration: 11 },
  ];

  // Wireframe globe lines, hidden unless a theme shows the globe: meridians are great
  // circles turned around the axis, latitudes are rings stacked up it
  const meridians = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];
  const latitudes = [-60, -40, -20, 0, 20, 40, 60];
</script>

<div class="globe" aria-hidden="true">
  <div class="globe-spin">
    {#each meridians as angle (angle)}
      <span class="meridian" style="--angle: {angle}deg;"></span>
    {/each}
    {#each latitudes as lat (lat)}
      <span class="latitude {lat === 0 ? 'equator' : ''}" style="--lat: {lat}deg;"></span>
    {/each}
  </div>
</div>

<ul class="background" aria-hidden="true">
  {#each particles as p, i (i)}
    <li
      class="particle"
      style="--left: {p.left}%; --size: {p.size}px; --delay: {p.delay}s; --duration: {p.duration}s;"
    ></li>
  {/each}
</ul>
