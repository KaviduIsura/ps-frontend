export function generateMockData(min: number, max: number) {
  const now = new Date();
  const data = [];
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (23 - i) * 3600000).toISOString();
    const value = +(min + Math.random() * (max - min)).toFixed(1);
    data.push({ timestamp, value });
  }
  
  return data;
}