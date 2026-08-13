const expected = 12;
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2019 / Node.js 12",
  runtime: "nodejs12.x",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));
