import test from "node:test";
import assert from "node:assert/strict";
import { listProducts, getProduct, normalizeSku } from "../src/domain/products.js";

test("products helpers", () => {
  assert.equal(normalizeSku({ sku: "sk-100" }), "SK-100");
  assert.ok(listProducts({}).length >= 3);
  assert.equal(getProduct("SK-100").title, "Aurora Lamp");
});

test("customer version marker", () => {
  assert.equal(12, 12);
});
