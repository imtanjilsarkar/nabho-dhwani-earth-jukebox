// Approximate global temperature anomaly (°C vs 1951-1980).
// Replace with the exact NASA GISS GISTEMP series before final submission:
// https://data.giss.nasa.gov/gistemp/
export const TEMPERATURE = [
  [1880, -0.20], [1890, -0.28], [1900, -0.08], [1910, -0.42], [1920, -0.27],
  [1930, -0.09], [1940, 0.13], [1950, -0.17], [1960, -0.03], [1970, 0.03],
  [1980, 0.26], [1990, 0.45], [2000, 0.42], [2005, 0.69], [2009, 0.57],
  [2012, 0.55], [2016, 0.99], [2020, 1.02], [2023, 1.10], [2024, 1.28],
].map(([year, anomaly]) => ({ year, anomaly }));
