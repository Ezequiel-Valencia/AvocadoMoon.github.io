// Forecast data comes from Open-Meteo (https://open-meteo.com), a free public weather service
// that needs no API key or client library, just a plain fetch.

export interface WeatherLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export type Units = 'imperial' | 'metric';

export interface DayForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipChance: number;
  precipSum: number;
  windMax: number;
  windDirection: number;
  sunrise: string;
  sunset: string;
  uvMax: number;
}

export interface HourForecast {
  time: string;
  temp: number;
  feelsLike: number;
  weatherCode: number;
  precipChance: number;
  humidity: number;
  wind: number;
  isDay: boolean;
}

export interface Forecast {
  current: {
    temp: number;
    feelsLike: number;
    weatherCode: number;
    humidity: number;
    wind: number;
    isDay: boolean;
  };
  days: DayForecast[];
  // hours[i] holds the 24 hourly entries for days[i]
  hours: HourForecast[][];
  // offset of the location's local time from UTC, which all the times above are given in
  utcOffsetSeconds: number;
}

export const defaultLocation: WeatherLocation = {
  name: 'Hartford, Connecticut',
  latitude: 41.7637,
  longitude: -72.6851,
};

export async function fetchForecast(loc: WeatherLocation, units: Units): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: String(loc.latitude),
    longitude: String(loc.longitude),
    current:
      'temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,uv_index_max',
    hourly:
      'temperature_2m,apparent_temperature,weather_code,precipitation_probability,relative_humidity_2m,wind_speed_10m,is_day',
    timezone: 'auto',
    forecast_days: '7',
  });
  if (units == 'imperial') {
    params.set('temperature_unit', 'fahrenheit');
    params.set('wind_speed_unit', 'mph');
    params.set('precipitation_unit', 'inch');
  }

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`Forecast request failed (${res.status})`);
  const data = await res.json();
  const d = data.daily;
  const h = data.hourly;

  const days: DayForecast[] = d.time.map((date: string, i: number) => ({
    date,
    weatherCode: d.weather_code[i],
    tempMax: d.temperature_2m_max[i],
    tempMin: d.temperature_2m_min[i],
    precipChance: d.precipitation_probability_max[i] ?? 0,
    precipSum: d.precipitation_sum[i] ?? 0,
    windMax: d.wind_speed_10m_max[i],
    windDirection: d.wind_direction_10m_dominant[i],
    sunrise: d.sunrise[i],
    sunset: d.sunset[i],
    uvMax: d.uv_index_max[i] ?? 0,
  }));

  const allHours: HourForecast[] = h.time.map((time: string, i: number) => ({
    time,
    temp: h.temperature_2m[i],
    feelsLike: h.apparent_temperature[i],
    weatherCode: h.weather_code[i],
    precipChance: h.precipitation_probability[i] ?? 0,
    humidity: h.relative_humidity_2m[i],
    wind: h.wind_speed_10m[i],
    isDay: h.is_day[i] == 1,
  }));

  return {
    current: {
      temp: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      weatherCode: data.current.weather_code,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      isDay: data.current.is_day == 1,
    },
    days,
    hours: days.map((day) => allHours.filter((hour) => hour.time.startsWith(day.date))),
    utcOffsetSeconds: data.utc_offset_seconds,
  };
}

// Half the length of dawn and dusk, centred on sunrise and sunset
const twilightMs = 30 * 60 * 1000;

// How light it is at the forecast's location: 1 in daytime, 0 at night, and in between
// during dawn and dusk
export function daylightAt(forecast: Forecast, nowMs: number): number {
  // Shift to the location's wall clock so it lines up with the API's local sunrise and sunset
  // strings, which are then read as if they were UTC
  const local = nowMs + forecast.utcOffsetSeconds * 1000;
  const today = new Date(local).toISOString().slice(0, 10);
  const day = forecast.days.find((d) => d.date == today) ?? forecast.days[0];
  const sunrise = Date.parse(day.sunrise + 'Z');
  const sunset = Date.parse(day.sunset + 'Z');
  // polar day or night has no sunrise or sunset
  if (isNaN(sunrise) || isNaN(sunset)) return forecast.current.isDay ? 1 : 0;

  const ramp = (edge: number) =>
    Math.min(1, Math.max(0, (local - edge + twilightMs) / (2 * twilightMs)));
  return Math.min(ramp(sunrise), 1 - ramp(sunset));
}

export async function searchLocation(query: string): Promise<WeatherLocation | null> {
  const params = new URLSearchParams({ name: query, count: '1', language: 'en', format: 'json' });
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
  if (!res.ok) throw new Error(`Location search failed (${res.status})`);
  const data = await res.json();
  const place = data.results?.[0];
  if (!place) return null;
  return {
    name: [place.name, place.admin1 ?? place.country].filter(Boolean).join(', '),
    latitude: place.latitude,
    longitude: place.longitude,
  };
}

function coordinateName(latitude: number, longitude: number) {
  const lat = `${Math.abs(latitude).toFixed(1)}°${latitude >= 0 ? 'N' : 'S'}`;
  const lon = `${Math.abs(longitude).toFixed(1)}°${longitude >= 0 ? 'E' : 'W'}`;
  return `${lat}, ${lon}`;
}

// Turns coordinates into a "Town, State" name using BigDataCloud's free client-side
// reverse geocoder, which needs no API key
export async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  try {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      localityLanguage: 'en',
    });
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const town = data.locality || data.city;
    const region = data.principalSubdivision || data.countryName;
    const name = [town, region].filter(Boolean).join(', ');
    return name || coordinateName(latitude, longitude);
  } catch {
    return coordinateName(latitude, longitude);
  }
}

// Cities pinned on the globe, spread out so their bubbles rarely overlap
export const globeCities: WeatherLocation[] = [
  { name: 'Hartford, Connecticut', latitude: 41.7637, longitude: -72.6851 },
  { name: 'Chicago, Illinois', latitude: 41.8781, longitude: -87.6298 },
  { name: 'Miami, Florida', latitude: 25.7617, longitude: -80.1918 },
  { name: 'Los Angeles, California', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Anchorage, Alaska', latitude: 61.2181, longitude: -149.9003 },
  { name: 'Honolulu, Hawaii', latitude: 21.3069, longitude: -157.8583 },
  { name: 'Mexico City, Mexico', latitude: 19.4326, longitude: -99.1332 },
  { name: 'Lima, Peru', latitude: -12.0464, longitude: -77.0428 },
  { name: 'São Paulo, Brazil', latitude: -23.5505, longitude: -46.6333 },
  { name: 'Buenos Aires, Argentina', latitude: -34.6037, longitude: -58.3816 },
  { name: 'Reykjavík, Iceland', latitude: 64.1466, longitude: -21.9426 },
  { name: 'London, England', latitude: 51.5072, longitude: -0.1276 },
  { name: 'Madrid, Spain', latitude: 40.4168, longitude: -3.7038 },
  { name: 'Berlin, Germany', latitude: 52.52, longitude: 13.405 },
  { name: 'Lagos, Nigeria', latitude: 6.5244, longitude: 3.3792 },
  { name: 'Cairo, Egypt', latitude: 30.0444, longitude: 31.2357 },
  { name: 'Nairobi, Kenya', latitude: -1.2921, longitude: 36.8219 },
  { name: 'Cape Town, South Africa', latitude: -33.9249, longitude: 18.4241 },
  { name: 'Moscow, Russia', latitude: 55.7558, longitude: 37.6173 },
  { name: 'Dubai, UAE', latitude: 25.2048, longitude: 55.2708 },
  { name: 'Mumbai, India', latitude: 19.076, longitude: 72.8777 },
  { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  { name: 'Beijing, China', latitude: 39.9042, longitude: 116.4074 },
  { name: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093 },
  { name: 'Auckland, New Zealand', latitude: -36.8485, longitude: 174.7633 },
];

export interface CityNow {
  temp: number;
  weatherCode: number;
  isDay: boolean;
}

// Open-Meteo accepts comma-separated coordinates, so every city's current weather is one request
export async function fetchCurrentForCities(
  cities: WeatherLocation[],
  units: Units
): Promise<CityNow[]> {
  const params = new URLSearchParams({
    latitude: cities.map((c) => c.latitude).join(','),
    longitude: cities.map((c) => c.longitude).join(','),
    current: 'temperature_2m,weather_code,is_day',
  });
  if (units == 'imperial') params.set('temperature_unit', 'fahrenheit');
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!res.ok) throw new Error(`Forecast request failed (${res.status})`);
  const data = await res.json();
  const results = Array.isArray(data) ? data : [data];
  return results.map((r) => ({
    temp: r.current.temperature_2m,
    weatherCode: r.current.weather_code,
    isDay: r.current.is_day == 1,
  }));
}

// WMO weather interpretation codes, as returned by Open-Meteo
const conditions: Record<number, { label: string; day: string; night: string }> = {
  0: { label: 'Clear', day: '☀️', night: '🌙' },
  1: { label: 'Mostly Clear', day: '🌤️', night: '🌙' },
  2: { label: 'Partly Cloudy', day: '⛅', night: '☁️' },
  3: { label: 'Overcast', day: '☁️', night: '☁️' },
  45: { label: 'Fog', day: '🌫️', night: '🌫️' },
  48: { label: 'Freezing Fog', day: '🌫️', night: '🌫️' },
  51: { label: 'Light Drizzle', day: '🌦️', night: '🌧️' },
  53: { label: 'Drizzle', day: '🌦️', night: '🌧️' },
  55: { label: 'Heavy Drizzle', day: '🌧️', night: '🌧️' },
  56: { label: 'Freezing Drizzle', day: '🌧️', night: '🌧️' },
  57: { label: 'Freezing Drizzle', day: '🌧️', night: '🌧️' },
  61: { label: 'Light Rain', day: '🌦️', night: '🌧️' },
  63: { label: 'Rain', day: '🌧️', night: '🌧️' },
  65: { label: 'Heavy Rain', day: '🌧️', night: '🌧️' },
  66: { label: 'Freezing Rain', day: '🌧️', night: '🌧️' },
  67: { label: 'Freezing Rain', day: '🌧️', night: '🌧️' },
  71: { label: 'Light Snow', day: '🌨️', night: '🌨️' },
  73: { label: 'Snow', day: '🌨️', night: '🌨️' },
  75: { label: 'Heavy Snow', day: '❄️', night: '❄️' },
  77: { label: 'Snow Grains', day: '🌨️', night: '🌨️' },
  80: { label: 'Rain Showers', day: '🌦️', night: '🌧️' },
  81: { label: 'Rain Showers', day: '🌧️', night: '🌧️' },
  82: { label: 'Violent Showers', day: '⛈️', night: '⛈️' },
  85: { label: 'Snow Showers', day: '🌨️', night: '🌨️' },
  86: { label: 'Heavy Snow Showers', day: '❄️', night: '❄️' },
  95: { label: 'Thunderstorm', day: '⛈️', night: '⛈️' },
  96: { label: 'Thunderstorm & Hail', day: '⛈️', night: '⛈️' },
  99: { label: 'Thunderstorm & Hail', day: '⛈️', night: '⛈️' },
};

export function describe(code: number, isDay = true) {
  const c = conditions[code] ?? { label: 'Unknown', day: '❔', night: '❔' };
  return { label: c.label, icon: isDay ? c.day : c.night };
}

// Open-Meteo returns local times without a timezone ("2026-10-26T14:00"), so parse the
// parts directly instead of letting Date shift them into the browser's timezone
function parseDate(date: string) {
  const [y, m, d] = date.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function dayName(date: string, index: number, long = false) {
  if (index == 0) return 'Today';
  if (index == 1) return 'Tomorrow';
  return parseDate(date).toLocaleDateString('en-US', { weekday: long ? 'long' : 'short' });
}

export function shortDate(date: string) {
  return parseDate(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function clockTime(isoTime: string) {
  const [hours, minutes] = isoTime.slice(11, 16).split(':').map(Number);
  const suffix = hours < 12 ? 'AM' : 'PM';
  const h12 = hours % 12 == 0 ? 12 : hours % 12;
  return minutes == 0 ? `${h12} ${suffix}` : `${h12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

export function compassDirection(degrees: number) {
  const points = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return points[Math.round(degrees / 45) % 8];
}
