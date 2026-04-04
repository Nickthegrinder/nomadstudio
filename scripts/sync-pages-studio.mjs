import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "website", "studio");

for (const f of ["index.html", "studio-i18n.css", "studio-i18n.js"]) {
  fs.copyFileSync(path.join(SRC, f), path.join(ROOT, f));
}

console.log("Synced website/studio → repo root (GitHub Pages source files).");
