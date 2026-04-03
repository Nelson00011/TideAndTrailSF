export interface TidePoint {
  time: string;
  height: number;
  label: string;
}

export interface HikingTrail {
  id: string;
  name: string;
  distance: string;
  difficulty: "easy" | "moderate" | "hard";
  tideImpact: "none" | "low" | "high";
  description: string;
  bestTide: string;
  location: string;
  elevation: string;
}

// Simulated tide data for SF (Ocean Beach / Golden Gate)
export const tideData: TidePoint[] = [
  { time: "12 AM", height: 3.2, label: "12 AM" },
  { time: "1 AM", height: 3.8, label: "" },
  { time: "2 AM", height: 4.5, label: "" },
  { time: "3 AM", height: 5.1, label: "3 AM" },
  { time: "4 AM", height: 5.4, label: "" },
  { time: "5 AM", height: 5.2, label: "" },
  { time: "6 AM", height: 4.6, label: "6 AM" },
  { time: "7 AM", height: 3.7, label: "" },
  { time: "8 AM", height: 2.8, label: "" },
  { time: "9 AM", height: 1.9, label: "9 AM" },
  { time: "10 AM", height: 1.2, label: "" },
  { time: "11 AM", height: 0.8, label: "" },
  { time: "12 PM", height: 0.5, label: "12 PM" },
  { time: "1 PM", height: 0.9, label: "" },
  { time: "2 PM", height: 1.6, label: "" },
  { time: "3 PM", height: 2.5, label: "3 PM" },
  { time: "4 PM", height: 3.4, label: "" },
  { time: "5 PM", height: 4.2, label: "" },
  { time: "6 PM", height: 4.8, label: "6 PM" },
  { time: "7 PM", height: 5.0, label: "" },
  { time: "8 PM", height: 4.7, label: "" },
  { time: "9 PM", height: 4.1, label: "9 PM" },
  { time: "10 PM", height: 3.5, label: "" },
  { time: "11 PM", height: 3.0, label: "" },
];

export const hikingTrails: HikingTrail[] = [
  {
    id: "lands-end",
    name: "Lands End Trail",
    distance: "3.4 mi",
    difficulty: "moderate",
    tideImpact: "high",
    description: "Coastal trail with ruins of Sutro Baths. Beach access blocked at high tide. Best explored during low tide windows.",
    bestTide: "Low tide (< 2 ft)",
    location: "Outer Richmond",
    elevation: "320 ft",
  },
  {
    id: "battery-to-bluffs",
    name: "Battery to Bluffs Trail",
    distance: "1.0 mi",
    difficulty: "moderate",
    tideImpact: "high",
    description: "Steep descent to Marshall's Beach beneath the Golden Gate Bridge. Beach disappears at high tide.",
    bestTide: "Low tide (< 3 ft)",
    location: "Presidio",
    elevation: "250 ft",
  },
  {
    id: "coastal-trail",
    name: "Coastal Trail",
    distance: "5.2 mi",
    difficulty: "moderate",
    tideImpact: "low",
    description: "The main artery connecting Lands End to the Golden Gate Bridge along clifftops. Mostly above tide line.",
    bestTide: "Any tide",
    location: "Sea Cliff to Presidio",
    elevation: "400 ft",
  },
  {
    id: "ocean-beach",
    name: "Ocean Beach Walk",
    distance: "3.5 mi",
    difficulty: "easy",
    tideImpact: "high",
    description: "Flat walk along SF's longest beach. Southern section floods at high tide, cutting off Fort Funston access.",
    bestTide: "Low tide (< 2 ft)",
    location: "Sunset District",
    elevation: "10 ft",
  },
  {
    id: "fort-funston",
    name: "Fort Funston Bluffs",
    distance: "1.8 mi",
    difficulty: "easy",
    tideImpact: "low",
    description: "Clifftop trail with hang gliders and wildflowers. Beach access stairs can be tide-dependent.",
    bestTide: "Low to mid tide",
    location: "Lake Merced",
    elevation: "200 ft",
  },
  {
    id: "mile-rock-beach",
    name: "Mile Rock Beach",
    distance: "0.6 mi",
    difficulty: "hard",
    tideImpact: "high",
    description: "Steep scramble down to a hidden rocky beach at Lands End. Completely submerged at high tide — dangerous.",
    bestTide: "Low tide only (< 1.5 ft)",
    location: "Outer Richmond",
    elevation: "180 ft",
  },
];

export const getCurrentTideStatus = (data: TidePoint[]) => {
  const hour = new Date().getHours();
  const current = data[hour] || data[0];
  const isRising = hour < data.length - 1 && data[hour + 1]?.height > current.height;
  return {
    height: current.height,
    trend: isRising ? "rising" as const : "falling" as const,
    time: current.time,
  };
};
