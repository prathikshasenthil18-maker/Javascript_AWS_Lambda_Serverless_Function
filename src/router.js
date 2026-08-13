import { listProducts, getProduct } from "./domain/products.js";
import { createOrder } from "./domain/orders.js";
import { ok, created, fail } from "./lib/response.js";
import { APPLICATION, BRANCH, CUSTOMER_VERSION, RUNTIME, SYNTAX_LABEL } from "./version.js";

function parseBody(event) {
  if (!event || event.body == null || event.body === "") return {};
  var raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : String(event.body);
  try { return JSON.parse(raw); } catch (e) { throw new Error("invalid_json"); }
}

export async function route(event) {
  var method = String((event && event.httpMethod) || "GET").toUpperCase();
  var path = String((event && event.path) || "/");
  var qs = (event && event.queryStringParameters) || {};

  if (method === "GET" && (path === "/api/v1/health" || path === "/health")) {
    return ok({
      status: "healthy",
      application: APPLICATION,
      branch: BRANCH,
      customer_version: CUSTOMER_VERSION,
      runtime: RUNTIME,
      syntax: SYNTAX_LABEL,
    });
  }

  if (method === "GET" && path === "/api/v1/products") {
    var items = listProducts({
      q: qs.q,
      activeOnly: String(qs.activeOnly || "") === "true",
    });
    return ok({ items: items, total: items.length });
  }

  var detail = path.match(/^\/api\/v1\/products\/([^/]+)$/);
  if (method === "GET" && detail) {
    var product = getProduct(detail[1]);
    if (!product) return fail(404, "product_not_found");
    return ok(product);
  }

  if (method === "POST" && path === "/api/v1/orders") {
    try {
      var order = createOrder(parseBody(event));
      return created(order);
    } catch (err) {
      return fail(400, err.message || "order_invalid");
    }
  }

  return fail(404, "not_found", { path: path, method: method });
}
