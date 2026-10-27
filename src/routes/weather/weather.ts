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
  };
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
