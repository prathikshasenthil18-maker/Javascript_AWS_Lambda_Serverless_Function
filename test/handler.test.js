import test from "node:test";
import assert from "node:assert/strict";
import { handler } from "../src/handler.js";

test("GET /api/v1/health", async () => {
  const res = await handler({ httpMethod: "GET", path: "/api/v1/health" });
  assert.equal(res.statusCode, 200);
  assert.equal(JSON.parse(res.body).status, "healthy");
});

test("GET /api/v1/products", async () => {
  const res = await handler({ httpMethod: "GET", path: "/api/v1/products", queryStringParameters: {} });
  assert.equal(res.statusCode, 200);
  assert.ok(JSON.parse(res.body).total >= 1);
});

test("POST /api/v1/orders", async () => {
  const res = await handler({
    httpMethod: "POST",
    path: "/api/v1/orders",
    body: JSON.stringify({ lines: [{ sku: "SK-100", qty: 1 }] }),
  });
  assert.equal(res.statusCode, 201);
  assert.equal(JSON.parse(res.body).total, 49);
});
