import { MapPin, Mountain, ArrowUpDown } from "lucide-react";
import type { HikingTrail } from "@/data/tides";

const difficultyColor = {
  easy: "bg-trail-green/20 text-trail-green",
  moderate: "bg-trail-amber/20 text-trail-amber",
  hard: "bg-trail-red/20 text-trail-red",
};

const tideImpactLabel = {
  none: { text: "No tide impact", className: "text-muted-foreground" },
  low: { text: "Low tide impact", className: "text-tide-low" },
  high: { text: "Tide-dependent", className: "text-primary" },
};

const TrailCard = ({ trail }: { trail: HikingTrail }) => {
  const impact = tideImpactLabel[trail.tideImpact];

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            {trail.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <MapPin className="w-3 h-3" />
            {trail.location}
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColor[trail.difficulty]}`}>
          {trail.difficulty}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{trail.description}</p>

      <div className="flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Mountain className="w-3.5 h-3.5" />
          {trail.distance} · {trail.elevation}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span className={impact.className}>{impact.text}</span>
        </span>
      </div>

      {trail.tideImpact === "high" && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-primary font-medium">⚡ Best at: {trail.bestTide}</p>
        </div>
      )}
    </div>
  );
};

export default TrailCard;
