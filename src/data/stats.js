export const SHOP_STATS = {
  months: [
    { m: 'Nov', revenue: 38420, profit: 10340 },
    { m: 'Dez', revenue: 47820, profit: 15540 },
    { m: 'Jan', revenue: 36180, profit: 8448  },
    { m: 'Feb', revenue: 35920, profit: 8319  },
    { m: 'Mär', revenue: 38940, profit: 10276 },
    { m: 'Apr', revenue: 41280, profit: 11040 },
  ],
  current: {
    revenue: 41280, profit: 11040, margin: 0.267,
    profitDelta: 0.074, revenueDelta: 0.060,
    coversMonth: 2840, avgCheck: 14.54,
    laborRatio: 0.252, foodCost: 0.315,
    cost: 13020, wages: 10420, fixed: 6800,
  },
  efficiency: [
    { id: 'sl', revPerHour: 312, covers: 980, rating: 4.9, productivity: 0.97 },
    { id: 'fk', revPerHour: 294, covers: 380, rating: 4.5, productivity: 0.82 },
    { id: 'tb', revPerHour: 285, covers: 340, rating: 4.6, productivity: 0.84 },
    { id: 'el', revPerHour: 268, covers: 460, rating: 4.7, productivity: 0.88 },
    { id: 'mw', revPerHour: 248, covers: 720, rating: 4.8, productivity: 0.94 },
    { id: 'ja', revPerHour: 215, covers: 410, rating: 4.6, productivity: 0.86 },
    { id: 'ar', revPerHour: 198, covers: 220, rating: 4.4, productivity: 0.74 },
  ],
};
