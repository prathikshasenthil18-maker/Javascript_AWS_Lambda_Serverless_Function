/** Lambda catalog domain — Node 12 / ES2019. */
var STORE = [
  { sku: "SK-100", title: "Aurora Lamp", price: 49, active: true },
  { sku: "SK-200", title: "Nimbus Chair", price: 220, active: true },
  { sku: "SK-300", title: "Pixel Desk", price: 399, active: false },
];

export function listProducts(filter) {
  filter = filter || {};
  var q = filter.q != null ? String(filter.q).toLowerCase() : "";
  return STORE.filter(function (p) {
    if (filter.activeOnly && !p.active) return false;
    if (!q) return true;
    return (p.title + " " + p.sku).toLowerCase().indexOf(q) >= 0;
  }).map(function (p) { return Object.assign({}, p); });
}

export function getProduct(sku) {
  sku = String(sku || "").toUpperCase();
  for (var i = 0; i < STORE.length; i += 1) {
    if (STORE[i].sku === sku) return Object.assign({}, STORE[i]);
  }
  return null;
}

export function normalizeSku(raw) {
  raw = raw || {};
  var value = raw.sku != null ? raw.sku : raw.id;
  if (value == null || value === "") throw new Error("sku_or_id_required");
  return String(value).trim().toUpperCase();
}
