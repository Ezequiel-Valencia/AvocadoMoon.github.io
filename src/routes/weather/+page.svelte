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

  // Text and panels snap to whichever palette reads better instead of blending into grey
  let ink = $derived(daylight >= 0.5 ? 1 : 0);

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

<section id="main-body" style="--daylight: {daylight}; --ink: {ink}">
  <!-- The menu sets its player up once, so it's rebuilt to switch songs with the globe -->
  {#key showGlobe}
    <Menu
      songName="Weather Channel"
      songPath={showGlobe
        ? 'https://youtu.be/gPNvtOUIspg?si=7lQ_rNfMJZdsRk9Q'
        : 'https://youtu.be/1H5b4n0l7SY?si=AAn7V-avfpVpzcWH'}
      songVolumeLevel="0.2"
    ></Menu>
  {/key}

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
  @use 'weather';
</style>
