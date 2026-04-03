import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = path.resolve(import.meta.dirname, "..");
const WEBSITE = path.join(ROOT, "website");
const CONTENT = path.join(ROOT, "content");

marked.setOptions({ gfm: true, breaks: false });

const MONTHS = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Display as "Mar 2026"; ISO yyyy-mm-dd for datetime */
function formatIdeaDate(raw) {
  if (raw == null || raw === "") return { label: "", iso: "" };
  if (raw instanceof Date && !isNaN(raw.getTime())) {
    const y = raw.getUTCFullYear();
    const mo = raw.getUTCMonth();
    const day = String(raw.getUTCDate()).padStart(2, "0");
    const iso = `${y}-${String(mo + 1).padStart(2, "0")}-${day}`;
    return { label: `${MONTHS[mo]} ${y}`, iso };
  }
  const s = String(raw).trim();
  const m = s.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
  if (!m) return { label: s, iso: s };
  const y = m[1];
  const mo = parseInt(m[2], 10) - 1;
  const day = m[3] || "01";
  const iso = `${m[1]}-${m[2]}-${day}`;
  return { label: `${MONTHS[mo]} ${y}`, iso };
}

function removeLegacyNestedHtml(subdir) {
  const base = path.join(WEBSITE, subdir);
  if (!fs.existsSync(base)) return;
  for (const name of fs.readdirSync(base)) {
    if (name === "index.html" || name.endsWith(".html")) continue;
    const p = path.join(base, name);
    let st;
    try {
      st = fs.statSync(p);
    } catch {
      continue;
    }
    if (!st.isDirectory()) continue;
    const idx = path.join(p, "index.html");
    if (fs.existsSync(idx)) {
      try {
        fs.unlinkSync(idx);
      } catch (_) {}
      try {
        fs.rmdirSync(p);
      } catch (_) {}
    }
  }
}

/** Site-root paths — fixes /ideas (no trailing slash) resolving sibling .html to the wrong folder */
function nav() {
  return `<header class="site-nav">
        <a class="monogram monogram--nav" href="/index.html" aria-label="Nomad Capital home">[nomad]</a>
        <nav class="site-nav__links" aria-label="Primary">
            <a href="/ideas/index.html">ideas</a>
            <a href="/case-studies/index.html">case studies</a>
            <a href="/resources/index.html">resources</a>
            <a href="/about/index.html">about</a>
        </nav>
    </header>`;
}

function footerBlock() {
  return `<footer class="site-footer site-footer--full">
        <p class="disclaimer">views are my own. content is based on anonymized experiences and public information. no employer attribution. no identifiable transactions or client references.</p>
        <div class="footer-row">
            <span class="footer-mono">[AC]</span>
            <span class="footer-copy">© ${new Date().getFullYear()}</span>
        </div>
    </footer>`;
}

function layoutPage({
  title,
  description,
  bodyHtml,
  mainClass = "page-main",
}) {
  const desc = description || title;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    ${nav()}
    <main class="${mainClass}">
${bodyHtml}
    </main>
    ${footerBlock()}
</body>
</html>`;
}

function writeIfChanged(file, html) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === html) return;
  fs.writeFileSync(file, html, "utf8");
  console.log("wrote", path.relative(WEBSITE, file));
}

function loadMdDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      return { data, content, file: f };
    });
}

function csBlock(label, text) {
  if (!text || !String(text).trim()) return "";
  return `            <div class="case-block">
                <h2 class="case-block__label">${esc(label)}</h2>
                <div class="case-block__body prose prose--tight">${marked.parse(String(text).trim())}</div>
            </div>`;
}

function contextBlock(it) {
  const parts = [];
  if (it.context_industry && String(it.context_industry).trim())
    parts.push(`**industry:** ${String(it.context_industry).trim()}`);
  if (it.context_situation && String(it.context_situation).trim())
    parts.push(`**situation:** ${String(it.context_situation).trim()}`);
  if (!parts.length) return "";
  return csBlock("context", parts.join("\n\n"));
}

function buildIdeas() {
  removeLegacyNestedHtml("ideas");
  const dir = path.join(CONTENT, "ideas");
  const items = loadMdDir(dir).map((x) => {
    const slug = x.data.slug || path.basename(x.file, ".md");
    return {
      slug,
      title: x.data.title || slug,
      date: x.data.date || "",
      dek: x.data.dek || "",
      order: x.data.order ?? 0,
      body: x.content,
    };
  });
  items.sort((a, b) => {
    const ib = formatIdeaDate(b.date).iso;
    const ia = formatIdeaDate(a.date).iso;
    return ib.localeCompare(ia) || (a.order - b.order);
  });

  const listItems = items
    .map((it) => {
      const d = formatIdeaDate(it.date);
      return `                <li class="idea-row">
                    <a class="idea-row__link" href="/ideas/${esc(it.slug)}.html">
                        <span class="idea-row__main">
                            <span class="idea-row__title">${esc(it.title)}</span>
                            ${it.dek ? `<span class="idea-row__dek">${esc(it.dek)}</span>` : ""}
                        </span>
                        ${d.label ? `<time class="idea-row__date" datetime="${esc(d.iso)}">${esc(d.label)}</time>` : ""}
                    </a>
                </li>`;
    })
    .join("\n");

  const indexHtml = layoutPage({
    title: "ideas — Nomad Capital",
    description:
      "Short, sharp reads on pattern recognition in private markets—not a generic blog.",
    bodyHtml: `        <div class="page-inner">
            <p class="section-kicker">ideas</p>
            <h1 class="page-title">short, sharp thinking</h1>
            <p class="page-lede text-dim">Roughly 2–4 minute reads. One clear idea per piece. Pattern recognition, not commentary.</p>
            <ul class="idea-list">
${listItems}
            </ul>
        </div>`,
  });
  writeIfChanged(path.join(WEBSITE, "ideas", "index.html"), indexHtml);

  for (const it of items) {
    const htmlBody = marked.parse(it.body.trim() || "");
    const d = formatIdeaDate(it.date);
    const article = layoutPage({
      title: `${it.title} — ideas`,
      description: it.dek || it.title,
      mainClass: "page-main page-main--article",
      bodyHtml: `        <article class="article container-narrow">
            <p class="section-kicker"><a href="/ideas/index.html">ideas</a></p>
            <h1 class="article-title">${esc(it.title)}</h1>
            ${d.label ? `<p class="article-meta"><time datetime="${esc(d.iso)}">${esc(d.label)}</time></p>` : ""}
            <div class="prose">${htmlBody}</div>
            <p class="article-back"><a href="/ideas/index.html">← all ideas</a></p>
        </article>`,
    });
    writeIfChanged(path.join(WEBSITE, "ideas", `${it.slug}.html`), article);
  }
}

function buildCaseStudies() {
  removeLegacyNestedHtml("case-studies");
  const dir = path.join(CONTENT, "case-studies");
  const items = loadMdDir(dir).map((x) => {
    const slug = x.data.slug || path.basename(x.file, ".md");
    return {
      slug,
      title: x.data.title || slug,
      order: x.data.order ?? 0,
      context_industry: x.data.context_industry || "",
      context_situation: x.data.context_situation || "",
      capital_involved: x.data.capital_involved || "",
      what_happened: x.data.what_happened || "",
      outcome_numbers: x.data.outcome_numbers || "",
      insight: x.data.insight || "",
      body: x.content,
    };
  });
  items.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  const cards = items
    .map(
      (it) => `                <li class="case-card">
                    <a href="/case-studies/${esc(it.slug)}.html">
                        <h2 class="case-card__title">${esc(it.title)}</h2>
                        <span class="case-card__meta mono">anonymized pattern</span>
                    </a>
                </li>`
    )
    .join("\n");

  const indexHtml = layoutPage({
    title: "case studies — Nomad Capital",
    description:
      "Anonymized deals: what looked good versus what was real. Structured for a long-term credibility layer.",
    bodyHtml: `        <div class="page-inner">
            <p class="section-kicker">case studies</p>
            <h1 class="page-title">what looked good vs. what was real</h1>
            <p class="page-lede text-dim">Anonymized transactions only. Same skeleton each time—context, capital, what happened, outcome, insight. Mistakes &gt; wins when they teach something durable.</p>
            <ul class="case-list">
${cards}
            </ul>
        </div>`,
  });
  writeIfChanged(path.join(WEBSITE, "case-studies", "index.html"), indexHtml);

  for (const it of items) {
    const extra = it.body.trim() ? marked.parse(it.body.trim()) : "";
    const blocks = [
      contextBlock(it),
      csBlock("capital involved", it.capital_involved),
      csBlock("what happened", it.what_happened),
      csBlock("outcome", it.outcome_numbers),
      csBlock("insight", it.insight),
    ]
      .filter(Boolean)
      .join("\n");

    const page = layoutPage({
      title: `${it.title} — case studies`,
      description: it.insight || it.title,
      mainClass: "page-main page-main--article",
      bodyHtml: `        <article class="article container-narrow">
            <p class="section-kicker"><a href="/case-studies/index.html">case studies</a></p>
            <h1 class="article-title">${esc(it.title)}</h1>
            <div class="case-template">
${blocks}
            </div>
            ${extra ? `<div class="prose prose--aftercase">${extra}</div>` : ""}
            <p class="article-back"><a href="/case-studies/index.html">← all case studies</a></p>
        </article>`,
    });
    writeIfChanged(path.join(WEBSITE, "case-studies", `${it.slug}.html`), page);
  }
}

function buildResources() {
  const file = path.join(CONTENT, "resources.md");
  if (!fs.existsSync(file)) {
    console.warn("missing content/resources.md");
    return;
  }
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const title = data.title || "Resources";
  const htmlBody = marked.parse(content.trim());
  const page = layoutPage({
    title: `${title} — Nomad Capital`,
    description:
      data.description ||
      "Frameworks, mental models, and references—curated with why they matter.",
    bodyHtml: `        <div class="page-inner container-narrow">
            <p class="section-kicker">resources</p>
            <h1 class="page-title">${esc(title)}</h1>
            <p class="page-lede text-dim">Frameworks, checklists, mental models—each with a short “why it matters.” Curated, not exhaustive.</p>
            <div class="prose">${htmlBody}</div>
        </div>`,
  });
  writeIfChanged(path.join(WEBSITE, "resources", "index.html"), page);
}

function buildAbout() {
  const bodyHtml = `        <div class="page-inner container-narrow">
            <p class="section-kicker">about</p>
            <h1 class="page-title page-title--about">about Nomad Capital</h1>
            <div class="about-body">
                <p>Nomad Capital comes from time spent inside transactions. Nick started at PwC, later worked as a scout with Tiny Capital, and is now an underwriter at IQ focused on private credit and deal evaluation.</p>
                <p>Most of what drives outcomes in deals is not visible in the numbers. Incentives, control, and what breaks under pressure tend to matter more.</p>
                <p>This platform is a way to write and build that thinking in public, focused on Canada, mainly Quebec and the lower mid-market.</p>
                <p>Nomad Capital is being built as a long-term holdco acquiring a small number of private businesses with simple operations and durable cash flows.</p>
                <p>If you own or know a business like that, I&rsquo;d be open to a conversation.</p>
            </div>
        </div>`;
  const html = layoutPage({
    title: "about Nomad Capital — Nomad Capital",
    description:
      "Background on Nomad Capital, transactions experience, and building a long-term holdco.",
    bodyHtml,
  });
  writeIfChanged(path.join(WEBSITE, "about", "index.html"), html);
}

function main() {
  buildIdeas();
  buildCaseStudies();
  buildResources();
  buildAbout();
  console.log("done.");
}

main();
