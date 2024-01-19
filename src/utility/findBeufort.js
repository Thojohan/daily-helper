export function findBeaufort(knots) {
  if (knots < 1) return "Vindstille";
  if (knots >= 1 && knots < 4) return "flau vind";
  if (knots >= 4 && knots < 7) return "svak vind";
  if (knots >= 7 && knots < 11) return "lett bris";
  if (knots >= 11 && knots < 17) return "laber bris";
  if (knots >= 17 && knots < 22) return "frisk bris";
  if (knots >= 22 && knots < 28) return "liten kuling";
  if (knots >= 28 && knots < 34) return "stiv kuling";
  if (knots >= 34 && knots < 41) return "sterk kuling";
  if (knots >= 41 && knots < 48) return "liten storm";
  if (knots >= 48 && knots < 56) return "full storm";
  if (knots >= 56 && knots < 64) return "sterk storm";
  if (knots >= 64) return "orkan";
}
