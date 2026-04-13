import { Waves, Mountain } from "lucide-react";
import heroImage from "@/assets/sf-coast-hero.jpg";
import TideChart from "@/components/TideChart";
import TideStatus from "@/components/TideStatus";
import TrailCard from "@/components/TrailCard";
import WeatherCard from "@/components/WeatherCard";
import { hikingTrails } from "@/data/tides";

const Index = () => {
  const tideAffected = hikingTrails.filter((t) => t.tideImpact === "high");
  const allTrails = hikingTrails;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={heroImage}
          alt="San Francisco coastline"
          className="w-full h-full object-cover"
          width={1920}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute bottom-6 left-6 md:left-10">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wider uppercase">Tides × Trails</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            San Francisco
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Coastal hiking dashboard — know when to go</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-4 pb-16 space-y-6">
        <TideStatus />
        <TideChart />
        <WeatherCard />

        {/* Tide-Affected Trails */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Waves className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-display font-semibold text-foreground">Tide-Dependent Trails</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {tideAffected.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        </div>

        {/* All Trails */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-4 h-4 text-trail-green" />
            <h2 className="text-lg font-display font-semibold text-foreground">All Coastal Trails</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allTrails.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
