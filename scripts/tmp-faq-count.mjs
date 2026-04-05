import fs from "fs";

const s = fs.readFileSync("website/studio/index.html", "utf8");
const faqStart = s.indexOf('data-framer-name="FAQs"');
const chunk = faqStart === -1 ? s : s.slice(faqStart, faqStart + 200000);
const re =
    /<div class="framer-74nljt"[^>]*>[\s\S]*?<h6[^>]*class="framer-text"[^>]*>([^<]*)<\/h6>/g;
const qs = [];
let m;
while ((m = re.exec(chunk))) qs.push(m[1].trim());
console.log("count", qs.length);
qs.forEach((q, i) => console.log(i, JSON.stringify(q)));
