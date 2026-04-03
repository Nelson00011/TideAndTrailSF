import { TrendingUp, TrendingDown, Waves, Clock } from "lucide-react";
import { tideData, getCurrentTideStatus } from "@/data/tides";

const TideStatus = () => {
  const status = getCurrentTideStatus(tideData);
  const highTide = Math.max(...tideData.map((d) => d.height));
  const lowTide = Math.min(...tideData.map((d) => d.height));
  const highIdx = tideData.findIndex((d) => d.height === highTide);
  const lowIdx = tideData.findIndex((d) => d.height === lowTide);

  const stats = [
    {
      label: "Current",
      value: `${status.height.toFixed(1)} ft`,
      sub: status.trend === "rising" ? "Rising" : "Falling",
      icon: status.trend === "rising" ? TrendingUp : TrendingDown,
      accent: "text-primary",
    },
    {
      label: "High Tide",
      value: `${highTide.toFixed(1)} ft`,
      sub: tideData[highIdx]?.time,
      icon: Waves,
      accent: "text-tide-high",
    },
    {
      label: "Low Tide",
      value: `${lowTide.toFixed(1)} ft`,
      sub: tideData[lowIdx]?.time,
      icon: Clock,
      accent: "text-tide-low",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <s.icon className={`w-4 h-4 ${s.accent}`} />
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
          <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
          <p className={`text-xs mt-0.5 ${s.accent}`}>{s.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default TideStatus;
