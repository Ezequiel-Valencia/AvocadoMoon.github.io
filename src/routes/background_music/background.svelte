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
</script>

<ul class="background" aria-hidden="true">
  {#each particles as p, i (i)}
    <li
      class="particle"
      style="--left: {p.left}%; --size: {p.size}px; --delay: {p.delay}s; --duration: {p.duration}s;"
    ></li>
  {/each}
</ul>
