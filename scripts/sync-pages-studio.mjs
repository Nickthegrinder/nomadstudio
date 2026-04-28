import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "website", "studio");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, ent.name);
    const to = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

for (const f of ["index.html", "studio-i18n.css", "studio-i18n.js"]) {
  fs.copyFileSync(path.join(SRC, f), path.join(ROOT, f));
}

for (const sub of ["pov", "principles"]) {
  const sd = path.join(SRC, sub);
  if (fs.existsSync(sd)) copyDir(sd, path.join(ROOT, sub));
}

console.log("Synced website/studio → repo root (GitHub Pages source files).");
