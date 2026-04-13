import { useQuery } from "@tanstack/react-query";

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  precipitationProbability: number;
  uvIndex: number;
  daily: {
    tempMax: number;
    tempMin: number;
    sunrise: string;
    sunset: string;
    precipitationSum: number;
    windSpeedMax: number;
    weatherCode: number;
  };
}

const weatherDescriptions: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  71: { label: "Light snow", icon: "❄️" },
  73: { label: "Snow", icon: "❄️" },
  75: { label: "Heavy snow", icon: "❄️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Moderate showers", icon: "🌧️" },
  82: { label: "Violent showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

export const getWeatherInfo = (code: number) =>
  weatherDescriptions[code] || { label: "Unknown", icon: "❓" };

const fetchWeather = async (): Promise<WeatherData> => {
  // San Francisco coordinates
  const lat = 37.7749;
  const lon = -122.4194;

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max,weather_code&timezone=America/Los_Angeles&forecast_days=1`
  );

  if (!res.ok) throw new Error("Failed to fetch weather");
  const data = await res.json();

  return {
    temperature: Math.round(data.current.temperature_2m * 9/5 + 32), // C to F
    windSpeed: Math.round(data.current.wind_speed_10m * 0.621371), // km/h to mph
    weatherCode: data.current.weather_code,
    humidity: data.current.relative_humidity_2m,
    precipitationProbability: data.current.precipitation_probability ?? 0,
    uvIndex: 0,
    daily: {
      tempMax: Math.round(data.daily.temperature_2m_max[0] * 9/5 + 32),
      tempMin: Math.round(data.daily.temperature_2m_min[0] * 9/5 + 32),
      sunrise: new Date(data.daily.sunrise[0]).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      sunset: new Date(data.daily.sunset[0]).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      precipitationSum: Math.round(data.daily.precipitation_sum[0] * 100) / 100,
      windSpeedMax: Math.round(data.daily.wind_speed_10m_max[0] * 0.621371),
      weatherCode: data.daily.weather_code[0],
    },
  };
};

export const useWeather = () =>
  useQuery({
    queryKey: ["weather-sf"],
    queryFn: fetchWeather,
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
  });
