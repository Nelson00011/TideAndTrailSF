import { Cloud, Droplets, Wind, Sunrise, Sunset, Thermometer } from "lucide-react";
import { useWeather, getWeatherInfo } from "@/hooks/useWeather";

const WeatherCard = () => {
  const { data, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 animate-pulse">
        <div className="h-5 w-32 bg-muted rounded mb-4" />
        <div className="h-16 bg-muted rounded" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-card border border-border rounded-xl p-5">
        <p className="text-sm text-muted-foreground">Weather data unavailable</p>
      </div>
    );
  }

  const weather = getWeatherInfo(data.weatherCode);
  const dailyWeather = getWeatherInfo(data.daily.weatherCode);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="w-4 h-4 text-primary" />
        <h2 className="text-lg font-display font-semibold text-foreground">Today's Weather</h2>
      </div>

      {/* Current conditions */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{weather.icon}</span>
        <div>
          <p className="text-2xl font-display font-bold text-foreground">{data.temperature}°F</p>
          <p className="text-sm text-muted-foreground">{weather.label}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-muted-foreground">
            H: {data.daily.tempMax}° · L: {data.daily.tempMin}°
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{dailyWeather.label} overall</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat icon={<Wind className="w-3.5 h-3.5" />} label="Wind" value={`${data.windSpeed} mph`} />
        <Stat icon={<Droplets className="w-3.5 h-3.5" />} label="Humidity" value={`${data.humidity}%`} />
        <Stat icon={<Sunrise className="w-3.5 h-3.5" />} label="Sunrise" value={data.daily.sunrise} />
        <Stat icon={<Sunset className="w-3.5 h-3.5" />} label="Sunset" value={data.daily.sunset} />
      </div>

      {/* Hiking advisory */}
      {data.precipitationProbability > 30 && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-trail-amber/10 border border-trail-amber/20">
          <p className="text-xs text-trail-amber font-medium">
            🌧️ {data.precipitationProbability}% chance of rain — coastal trails may be slippery
          </p>
        </div>
      )}
      {data.windSpeed > 20 && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-trail-amber/10 border border-trail-amber/20">
          <p className="text-xs text-trail-amber font-medium">
            💨 High winds ({data.windSpeed} mph) — exposed bluff trails may be gusty
          </p>
        </div>
      )}
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-muted/50 rounded-lg px-3 py-2">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

export default WeatherCard;