import { route } from "./router.js";
import { fail } from "./lib/response.js";

export async function handler(event, context) {
  try {
    return await route(event || {});
  } catch (err) {
    return fail(500, err && err.message ? err.message : "internal_error");
  }
}
