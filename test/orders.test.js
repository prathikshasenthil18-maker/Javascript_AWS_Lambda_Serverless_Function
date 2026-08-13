import test from "node:test";
import assert from "node:assert/strict";
import { createOrder } from "../src/domain/orders.js";

test("createOrder", () => {
  const order = createOrder({ lines: [{ sku: "SK-100", qty: 2 }] });
  assert.equal(order.total, 98);
});
