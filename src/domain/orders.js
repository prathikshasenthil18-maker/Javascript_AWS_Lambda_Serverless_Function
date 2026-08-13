import { getProduct } from "./products.js";
let SEQ = 1000;

export function createOrder(body) {
  const lines = Array.isArray(body?.lines) ? body.lines : [];
  if (!lines.length) throw new Error("order_lines_required", { cause: { body } });
  const items = [];
  let total = 0;
  for (const line of lines) {
    const sku = String(line?.sku ?? "").toUpperCase();
    const qty = Number(line?.qty ?? 1);
    if (!sku || !(qty > 0)) throw new Error("order_line_invalid", { cause: { line } });
    const product = getProduct(sku);
    if (!product?.active) throw new Error("product_unavailable", { cause: { sku } });
    const lineTotal = Math.round(product.price * qty * 100) / 100;
    total += lineTotal;
    items.push({ sku, qty, unitPrice: product.price, lineTotal });
  }
  SEQ += 1;
  return { id: `ord_${SEQ}`, items, total: Math.round(total * 100) / 100, currency: "USD", status: "accepted" };
}
