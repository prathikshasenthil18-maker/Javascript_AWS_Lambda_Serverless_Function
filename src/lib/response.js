export function json(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  };
}

export function ok(body) { return json(200, body); }
export function created(body) { return json(201, body); }
export function fail(statusCode, message, details) {
  return json(statusCode ?? 500, { error: message ?? "error", ...(details ? { details } : {}) });
}
