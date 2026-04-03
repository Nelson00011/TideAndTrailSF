import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, ReferenceLine, Tooltip } from "recharts";
import { tideData } from "@/data/tides";

const currentHour = new Date().getHours();

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-muted-foreground">{payload[0].payload.time}</p>
      <p className="text-sm font-display font-semibold text-foreground">
        {payload[0].value.toFixed(1)} ft
      </p>
    </div>
  );
};

const TideChart = () => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground">Today's Tides</h2>
          <p className="text-sm text-muted-foreground">Ocean Beach — San Francisco</p>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tide-high" />
            High Tide
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-tide-low" />
            Low Tide
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={tideData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(190, 80%, 55%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(190, 80%, 55%)" stopOpacity={0.02} />
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
            domain={[0, 6]}
            tickFormatter={(v) => `${v}ft`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={3} stroke="hsl(210, 20%, 22%)" strokeDasharray="4 4" />
          <ReferenceLine
            x={tideData[currentHour]?.time}
            stroke="hsl(32, 70%, 55%)"
            strokeWidth={2}
            strokeDasharray="4 4"
            label={{ value: "Now", position: "top", fill: "hsl(32, 70%, 55%)", fontSize: 11 }}
          />
          <Area
            type="monotone"
            dataKey="height"
            stroke="hsl(190, 80%, 55%)"
            strokeWidth={2.5}
            fill="url(#tideGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TideChart;
