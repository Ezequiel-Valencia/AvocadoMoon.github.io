<script lang="ts">
  import { onMount } from 'svelte';
  import Menu from '../../common/menu.svelte';
  import { safeLocalStorage } from '../../common/myLocalStorage';
  import Globe from './globe.svelte';
  import {
    clockTime,
    compassDirection,
    dayName,
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

  let location: WeatherLocation = $state(defaultLocation);
  let units: Units = $state('imperial');
  let forecast: Forecast | null = $state(null);
  let loading = $state(true);
  let error = $state('');

  let view: 'week' | 'day' = $state('week');
  let selectedDay = $state(0);

  let searchText = $state('');
  let searching = $state(false);
  let locating = $state(false);
  let showGlobe = $state(false);

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
    } catch {
      // ignore unreadable saved settings and fall back to the defaults
    }
    loadForecast();
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

  function openDay(index: number) {
    selectedDay = index;
    view = 'day';
  }
</script>

<svelte:head>
  <title>Weather</title>
</svelte:head>

<section id="main-body">
  <Menu
    songName="Weather Channel"
    songPath="/Audio/channels/geocache-music.mp3"
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
          <div><dt>Chance of Rain</dt><dd>{day.precipChance}%</dd></div>
          <div>
            <dt>Precipitation</dt>
            <dd>{day.precipSum.toFixed(units == 'imperial' ? 2 : 1)} {precipUnit}</dd>
          </div>
          <div>
            <dt>Max Wind</dt>
            <dd>{Math.round(day.windMax)} {speedUnit} {compassDirection(day.windDirection)}</dd>
          </div>
          <div><dt>UV Index</dt><dd>{day.uvMax.toFixed(1)}</dd></div>
          <div><dt>Sunrise</dt><dd>🌅 {clockTime(day.sunrise)}</dd></div>
          <div><dt>Sunset</dt><dd>🌇 {clockTime(day.sunset)}</dd></div>
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
  $wii-blue: rgb(52, 190, 237);
  $deep-blue: rgb(18, 76, 150);
  $panel-border: rgba(255, 255, 255, 0.9);

  #main-body {
    min-height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
    padding: 9vh 16px 4vh;
    box-sizing: border-box;
    font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
    color: rgb(30, 40, 60);
    background:
      radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.55) 0, transparent 30%),
      linear-gradient(
        180deg,
        rgb(120, 200, 255) 0%,
        rgb(190, 232, 255) 55%,
        rgb(240, 250, 255) 100%
      );
  }

  button:not(:disabled) {
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  .panel {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(225, 242, 255, 0.92));
    border: 3px solid $panel-border;
    border-radius: 18px;
    box-shadow:
      0 4px 14px rgba(18, 76, 150, 0.25),
      inset 0 -3px 0 rgba(52, 190, 237, 0.25);
  }

  .top-bar {
    max-width: 1100px;
    margin: 0 auto 2vh;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(180deg, $wii-blue, $deep-blue);
    border: 3px solid $panel-border;
    border-radius: 999px;
    padding: 10px 20px;
    color: white;
    box-shadow: 0 4px 14px rgba(18, 76, 150, 0.35);
  }

  .location {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    h1 {
      font-size: clamp(1.1rem, 3vw, 1.8rem);
      font-weight: bold;
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
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
      border: none;
      padding: 6px 14px;
      color: black;
      width: min(220px, 45vw);
    }
  }

  .pill {
    border-radius: 999px;
    background: white;
    color: $deep-blue;
    font-weight: bold;
    padding: 6px 14px;
    border: none;
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
      border: 3px solid $panel-border;
      background: rgba(255, 255, 255, 0.6);
      color: $deep-blue;
      font-weight: bold;
      font-size: 1.1rem;
      transition: all 0.2s;
    }
    button.active {
      background: linear-gradient(180deg, $wii-blue, $deep-blue);
      color: white;
    }
    button:hover:not(.active) {
      background: white;
    }
    .units {
      min-width: 60px;
    }
  }

  .error {
    text-align: center;
    color: rgb(170, 20, 20);
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
      color: $deep-blue;
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
    color: $deep-blue;
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
    padding: 14px 6px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    transition: transform 0.2s;
    &:hover {
      transform: translateY(-6px) scale(1.03);
    }
    .day-name {
      font-weight: bold;
      color: $deep-blue;
      font-size: 1.1rem;
    }
    .date,
    .cond {
      font-size: 0.85rem;
      color: rgb(80, 95, 120);
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
      color: rgb(225, 80, 40);
      font-size: 1.4rem;
    }
    .lo {
      color: rgb(40, 110, 210);
      font-size: 1.1rem;
    }
  }

  .rain {
    font-size: 0.9rem;
    color: $deep-blue;
  }

  .hint {
    text-align: center;
    margin-top: 2vh;
    color: $deep-blue;
    opacity: 0.8;
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
      border: 3px solid $panel-border;
      background: linear-gradient(180deg, $wii-blue, $deep-blue);
      color: white;
      font-size: 1.2rem;
      &:disabled {
        opacity: 0.35;
      }
    }
    .day-title {
      text-align: center;
      min-width: 160px;
      h2 {
        font-size: 1.8rem;
        font-weight: bold;
        color: $deep-blue;
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
      color: rgb(80, 95, 120);
      text-transform: uppercase;
    }
    dd {
      font-weight: bold;
      color: $deep-blue;
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
      color: $deep-blue;
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
      color: rgb(80, 95, 120);
    }
  }

  footer {
    text-align: center;
    margin-top: 4vh;
    font-size: 0.85rem;
    color: $deep-blue;
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
