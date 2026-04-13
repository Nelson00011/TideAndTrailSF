import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, ReferenceLine, Tooltip } from "recharts";
import { useWeather, type HourlyWeather } from "@/hooks/useWeather";

const currentHour = new Date().getHours();

type MetricKey = "temperature" | "windSpeed" | "humidity" | "precipitationProbability";

const tabs: { key: MetricKey; label: string; unit: string; color: string; domain: [number, number] | "auto" }[] = [
  { key: "temperature", label: "Temp", unit: "°F", color: "hsl(32, 70%, 55%)", domain: "auto" },
  { key: "windSpeed", label: "Wind", unit: " mph", color: "hsl(190, 80%, 55%)", domain: "auto" },
  { key: "humidity", label: "Humidity", unit: "%", color: "hsl(210, 60%, 55%)", domain: [0, 100] },
  { key: "precipitationProbability", label: "Rain %", unit: "%", color: "hsl(250, 60%, 60%)", domain: [0, 100] },
];

const WeatherChartTooltip = ({ active, payload, metric }: any) => {
  if (!active || !payload?.length) return null;
  const tab = tabs.find((t) => t.key === metric)!;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-muted-foreground">{payload[0].payload.time}</p>
      <p className="text-sm font-display font-semibold text-foreground">
        {payload[0].value}{tab.unit}
      </p>
    </div>
  );
};

const WeatherChart = () => {
  const [active, setActive] = useState<MetricKey>("temperature");
  const { data, isLoading } = useWeather();

  if (isLoading || !data) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 animate-pulse">
        <div className="h-5 w-48 bg-muted rounded mb-4" />
        <div className="h-[220px] bg-muted rounded" />
      </div>
    );
  }

  const tab = tabs.find((t) => t.key === active)!;
  const hourlyData = data.hourly;

  const values = hourlyData.map((h) => h[active] as number);
  const domain: [number, number] =
    tab.domain === "auto"
      ? [Math.floor(Math.min(...values) - 2), Math.ceil(Math.max(...values) + 2)]
      : tab.domain;

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Hourly Forecast</h2>
          <p className="text-sm text-muted-foreground">San Francisco — today</p>
        </div>
        <div className="flex bg-muted/60 rounded-lg p-0.5 gap-0.5">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                active === t.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={hourlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="weatherGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tab.color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={tab.color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "hsl(200, 15%, 55%)" }}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "hsl(200, 15%, 55%)" }}
            domain={domain}
            tickFormatter={(v) => `${v}${tab.unit}`}
          />
          <Tooltip content={<WeatherChartTooltip metric={active} />} />
          <ReferenceLine
            x={hourlyData[currentHour]?.time}
            stroke="hsl(32, 70%, 55%)"
            strokeWidth={2}
            strokeDasharray="4 4"
            label={{ value: "Now", position: "top", fill: "hsl(32, 70%, 55%)", fontSize: 11 }}
          />
          <Area
            type="monotone"
            dataKey={active}
            stroke={tab.color}
            strokeWidth={2.5}
            fill="url(#weatherGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
