/** Lambda catalog domain — Node 18 / ES2022. */
const STORE = [
  { sku: "SK-100", title: "Aurora Lamp", price: 49, active: true },
  { sku: "SK-200", title: "Nimbus Chair", price: 220, active: true },
  { sku: "SK-300", title: "Pixel Desk", price: 399, active: false },
];

export function listProducts(filter = {}) {
  const q = String(filter?.q ?? "").toLowerCase();
  return STORE.filter((p) => {
    if (filter.activeOnly && !p.active) return false;
    if (!q) return true;
    return `${p.title} ${p.sku}`.toLowerCase().includes(q);
  }).map((p) => ({ ...p }));
}

export function getProduct(sku) {
  const key = String(sku ?? "").toUpperCase();
  const hit = STORE.find((p) => p.sku === key);
  return hit ? { ...hit } : null;
}

export function normalizeSku(raw) {
  const value = raw?.sku ?? raw?.id ?? "";
  if (!Object.hasOwn(raw ?? {}, "sku") && !Object.hasOwn(raw ?? {}, "id")) {
    throw new Error("sku_or_id_required", { cause: { raw } });
  }
  return String(value).trim().toUpperCase();
}

export function pickLastTag(tags) {
  return (Array.isArray(tags) ? tags : []).at(-1) ?? "untagged";
}
