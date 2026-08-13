import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import * as esbuild from "esbuild";

const ROOT = process.cwd();
const dist = path.join(ROOT, "dist");
fs.mkdirSync(dist, { recursive: true });

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else if (ent.name.endsWith(".js")) acc.push(full);
  }
  return acc;
}

const sources = walk(path.join(ROOT, "src"));
for (const file of sources) {
  const r = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    process.exit(r.status || 1);
  }
}

await esbuild.build({
  entryPoints: [path.join(ROOT, "src/handler.js")],
  outfile: path.join(dist, "handler.js"),
  bundle: true,
  platform: "node",
  format: "cjs",
  target: ["node18"],
  banner: { js: "// AWS Lambda handler — Customer Version 18" },
});

fs.writeFileSync(
  path.join(dist, "build-manifest.json"),
  JSON.stringify(
    {
      ok: true,
      customer_version: 18,
      branch: "Version_18",
      runtime: "nodejs18.x",
      entry: "dist/handler.js",
      export: "handler",
      checked_files: sources.map((f) => path.relative(ROOT, f)),
    },
    null,
    2
  )
);
console.log(JSON.stringify({ ok: true, outfile: "dist/handler.js", checked: sources.length }, null, 2));
