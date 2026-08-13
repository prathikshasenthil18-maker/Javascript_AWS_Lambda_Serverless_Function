const expected = 18;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2022 / Node.js 18",
  runtime: "nodejs18.x",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));
