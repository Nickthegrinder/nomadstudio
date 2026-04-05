import fs from "fs";

const s = fs.readFileSync("website/studio/index.html", "utf8");
const i = s.indexOf('data-framer-name="FAQs"');
const t = s.slice(i, i + 40000);
const idx = t.indexOf("framer-txxy19-container");
console.log(t.slice(idx, idx + 1800));
