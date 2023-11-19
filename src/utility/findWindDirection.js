export function findWindDirection(degree, knots) {
  if (knots === 0) return "";
  if (degree > 337.5 || degree <= 22.5) return `Nordlig`;
  if (degree > 22.5 || degree <= 67.5) return `Nordøstlig`;
  if (degree > 67.5 || degree <= 112.5) return `Østlig`;
  if (degree > 112.5 || degree <= 157.5) return `Sørøstlig`;
  if (degree > 157.5 || degree <= 202.5) return `Sørlig`;
  if (degree > 202.5 || degree <= 247.5) return `Sørvestlig`;
  if (degree > 247.5 || degree <= 292.5) return `Vestlig`;
  if (degree > 292.5 || degree <= 337.5) return `Nordvestlig`;
}
