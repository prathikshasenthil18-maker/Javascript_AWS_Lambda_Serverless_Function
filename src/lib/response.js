export function json(statusCode, body, headers) {
  headers = headers || {};
  return {
    statusCode: statusCode,
    headers: Object.assign({ "content-type": "application/json" }, headers),
    body: JSON.stringify(body),
  };
}

export function ok(body) { return json(200, body); }
export function created(body) { return json(201, body); }
export function fail(statusCode, message, details) {
  var body = { error: message || "error" };
  if (details) body.details = details;
  return json(statusCode || 500, body);
}
