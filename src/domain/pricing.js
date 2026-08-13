export function applyDiscount(price, pct = 0) {
  const p = Number(price);
  const d = Number(pct);
  if (!(p >= 0) || d < 0 || d > 100) throw new Error("pricing_invalid", { cause: { price, pct } });
  return Math.round(p * (1 - d / 100) * 100) / 100;
}
