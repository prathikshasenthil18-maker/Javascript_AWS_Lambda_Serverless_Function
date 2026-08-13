import test from "node:test";
import assert from "node:assert/strict";
import { applyDiscount } from "../src/domain/pricing.js";

test("applyDiscount", () => {
  assert.equal(applyDiscount(100, 10), 90);
});
