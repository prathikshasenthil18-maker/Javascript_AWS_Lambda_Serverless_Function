import { getProduct } from "./products.js";
var SEQ = 1000;

export function createOrder(body) {
  body = body || {};
  var lines = Array.isArray(body.lines) ? body.lines : [];
  if (!lines.length) throw new Error("order_lines_required");
  var items = [];
  var total = 0;
  for (var i = 0; i < lines.length; i += 1) {
    var line = lines[i] || {};
    var sku = String(line.sku || "").toUpperCase();
    var qty = Number(line.qty != null ? line.qty : 1);
    if (!sku || !(qty > 0)) throw new Error("order_line_invalid");
    var product = getProduct(sku);
    if (!product || !product.active) throw new Error("product_unavailable");
    var lineTotal = Math.round(product.price * qty * 100) / 100;
    total += lineTotal;
    items.push({ sku: sku, qty: qty, unitPrice: product.price, lineTotal: lineTotal });
  }
  SEQ += 1;
  return { id: "ord_" + SEQ, items: items, total: Math.round(total * 100) / 100, currency: "USD", status: "accepted" };
}
