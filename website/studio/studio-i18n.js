(function () {
    var TOKEN_SURFACE = "--token-9038913d-9542-4e7c-8f1d-6d793c435842";
    var TOKEN_PAGE_BG = "--token-b6079f2c-86e5-4fdb-b1bc-5a74a51795f3";

    /** Framer hydrate can reinject #fafafa tokens — lock dark with important. */
    function applyDarkTokens() {
        var v = "#000000";
        try {
            document.documentElement.style.setProperty(TOKEN_SURFACE, v, "important");
            document.documentElement.style.setProperty(TOKEN_PAGE_BG, v, "important");
            document.body.style.setProperty(TOKEN_SURFACE, v, "important");
            document.body.style.setProperty(TOKEN_PAGE_BG, v, "important");
        } catch (e) {}
    }

    var META = {
        title: "Nomad Studio | Operations & Automation",
        description:
            "we help established businesses in Canada cut manual work, build the right systems, and use AI without bloat, retainers, or guesswork. flat fee. you own it.",
    };

    var HERO_LEDE =
        "we help established businesses in Canada cut the manual work, build the right systems, and actually use AI — without the bloat, the retainers, or the guesswork.";

    var CTA_SUBCOPY_EXACT =
        "zero bs. flat fee. smooth operations. private businesses and organizations welcome.";

    var WHO_HELP_CASE_STUDY =
        "recent work: a Montreal-based service business reduced weekly admin time by 12 hours after we replaced their manual reporting process with a custom automated dashboard. delivered in 4 weeks. flat fee. they own it.";

    var LEGACY_MONOGRAM = ["\u005bAG\u005d", "\u005bag\u005d"];
    var BRAND_TO = "[nomad]";
    var CONTACT_EMAIL = "team@nomadholdings.ca";
    var SITE_URL = "https://nomadholdings.ca/";
    var MAILTO_LETS_TALK =
        "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Let's talk — Nomad Studio");

    var mailtoNavLockUntil = 0;

    function isCalUrl(s) {
        var lower = (s || "").toLowerCase();
        return lower.indexOf("cal.com") !== -1 || lower.indexOf("cal.link") !== -1;
    }

    function goMailtoLetsTalk() {
        var now = Date.now();
        if (now < mailtoNavLockUntil) return;
        mailtoNavLockUntil = now + 4000;
        armCalWatch();
        window.location.href = MAILTO_LETS_TALK;
    }

    function iframeLooksLikeCal(f) {
        var src =
            (f.getAttribute("src") || "") +
            (f.getAttribute("data-src") || "") +
            (typeof f.src === "string" ? f.src : "");
        return isCalUrl(src);
    }

    function tearDownCalOverlays() {
        document.querySelectorAll("iframe").forEach(function (f) {
            if (!iframeLooksLikeCal(f)) return;
            var n = f;
            for (var u = 0; u < 18 && n; u++) {
                var par = n.parentElement;
                if (!par) break;
                n = par;
                var tag = (n.tagName || "").toLowerCase();
                if (tag === "body" || tag === "html") break;
                var st = window.getComputedStyle(n);
                var pos = st.position;
                var zi = parseInt(st.zIndex, 10) || 0;
                if ((pos === "fixed" || pos === "sticky" || pos === "absolute") && zi >= 1) {
                    var r = n.getBoundingClientRect();
                    if (r.width >= window.innerWidth * 0.35 || r.height >= window.innerHeight * 0.3) {
                        n.remove();
                        return;
                    }
                }
            }
            f.remove();
        });
    }

    var calWatchInterval = null;

    function armCalWatch() {
        if (calWatchInterval) clearInterval(calWatchInterval);
        var steps = 0;
        calWatchInterval = setInterval(function () {
            steps++;
            onMaybeCalOverlay();
            if (steps >= 35) {
                clearInterval(calWatchInterval);
                calWatchInterval = null;
            }
        }, 100);
    }

    function patchWindowOpenOnce() {
        try {
            var orig = window.open;
            if (orig.__nomadStudioCalPatch) return;
            window.open = function (url, target, features) {
                try {
                    if (url != null && isCalUrl(String(url))) {
                        goMailtoLetsTalk();
                        return null;
                    }
                } catch (e2) {}
                return orig.call(window, url, target, features);
            };
            window.open.__nomadStudioCalPatch = true;
        } catch (e) {}
    }

    function onPointerMaybeInMain(e) {
        var main = document.getElementById("main");
        if (main && e.target && main.contains(e.target)) armCalWatch();
    }

    /**
     * Framer's client bundle may re-inject legacy copy. EN→EN patches (sorted longest-first below).
     */
    var FRAMER_VENTURE_SCRUB = [
        [
            "What you can't hire is someone who treats your company like their own. Who says no to bad ideas because they have skin in the game.",
            "What's hard to find is a partner who will honestly tell you when tech isn't the answer.",
        ],
        [
            "we're looking for the person who knows an industry cold and sees the AI-native product that needs to exist inside it.",
            "we work with business owners who are tired of administrative friction and manual data entry.",
        ],
        [
            "you bring the domain expertise and distribution. we handle the build. joint venture from day one.",
            "we want your business running smoothly. we don't want to sell you tech you don't need.",
        ],
        [
            "vertical software. intelligent workflows. systems that replace what your industry still does manually.",
            "no subscriptions. no bloated tech. just systems that work.",
        ],
        [
            "they've been living the problem. they know who'd pay for it before a single line of code gets written.",
            "Monthly fees forever.",
        ],
        [
            "that's not a bet. that's a blueprint. and we build the product around it.",
            "Half the features you don't use.",
        ],
        [
            "we come in as technical co-founder. you bring the domain expertise and distribution. we build the product. equity split from day one. no retainers. no hourly rates. we win together or we don't win.",
            "We work on a flat-fee basis. You pay 20% to kick off the build, and the remaining 80% only when the system is delivered and working. No hourly billing, no endless agency retainers, and no hidden surprises.",
        ],
        [
            "legal, financial services, healthcare, construction, ecommerce, real estate. any industry with real problems, real budgets, and operators who've been inside it long enough to know where the money leaks.",
            "Not at all. We work across construction, manufacturing, real estate, healthcare, and professional services. We don't focus on a specific industry—we focus on established businesses that are bleeding margin because of manual processes, messy spreadsheets, and operational bloat.",
        ],
        [
            "We charge a flat fee: 20% when we start and 80% when we deliver. No hourly billing or open-ended retainers—you own what we build.",
            "We work on a flat-fee basis. You pay 20% to kick off the build, and the remaining 80% only when the system is delivered and working. No hourly billing, no endless agency retainers, and no hidden surprises.",
        ],
        ["The Best AI Companies Get Built From The Inside.", "Automate the mess. Scale the rest."],
        ["Less bureaucracy. More business.", "Automate the mess. Scale the rest."],
        [
            "we partner with industry leaders to co-build AI-native products.",
            "we work with business owners and organizations who are done with manual processes and off-the-shelf tools that don't fit. we audit what's broken, map what's possible, and build what actually works whether that's an automated workflow, a custom dashboard, or an AI integration your team will actually use. ",
        ],
        ["You Know The Industry. We Build The Product.", "You run the business. We build the systems."],
        ["Every day you wait, You get more replaceable", "Every day you wait, bad processes cost you money."],
        ["we don't take every deal. most don't make it through.", "we only take projects where we can actually make an impact."],
        ["a problem worth solving and people who'd pay for it", "you want to focus on your business, not your IT."],
        ["the domain expert knows what needs to exist.", "Forces you to change how you work."],
        ["ready to commit as a co-builder", "Book a conversation—no obligation."],
        ["we're not looking for first-time entrepreneurs.", "we aren't looking for tech startups."],
        ["real relationships others don't have", "you want tools that work for you, not against you."],
        ["10+ years inside one vertical", "you want flat-fee results, not hourly billing."],
        ["one model. one partner. built from the inside.", "zero bs. flat fee. smooth operations."],
        ["You know the industry. We build the product.", "if custom tech can fix your bottleneck, we build it. if a simple spreadsheet works better, we'll tell you."],
        ["WE DON'T WRITE CHECKS. WE CO-BUILD.", "WE DON'T SELL SUBSCRIPTIONS. WE SHIP SYSTEMS."],
        ["03 / WHO WE PARTNER WITH", "03 / WHO WE HELP"],
        ["CO-BUILD A VENTURE", "LET'S TALK"],
        ["AI VENTURE STUDIO", "AI & Automation for Canadian SMEs"],
        ["OPERATIONS & AUTOMATION", "AI & Automation for Canadian SMEs"],
        ["Thesis", "The Problem"],
        ["Build to spec and leave", "Adapts you to it. Fees forever."],
        ["Write checks and wait", "Monthly retainer. You rent the work."],
        ["Co-Build a Venture.", "We start with a conversation."],
        [
            "what industries do you focus on?",
            "Do you work with businesses outside of Canada?",
        ],
        [
            "what does the JV structure look like?",
            "What happens if we're not happy with the result?",
        ],
        [
            "what makes a strong domain partner?",
            "Can you work with our existing tools and software?",
        ],
        [
            "do the ventures take outside investment?",
            "How do we get started?",
        ],
        ["do you only do IT or accounting?", "Do you work with businesses outside of Canada?"],
        ["how does the pricing actually work?", "What happens if we're not happy with the result?"],
        ["how long does it take?", "Can you work with our existing tools and software?"],
        ["how do we start?", "How do we get started?"],
        ["01 / HOW IT WORKS", "01 / HOW WE WORK"],
        ["02 / THE THESIS", "02 / THE PROBLEM"],
        ["how is equity split?", "what if we don't need custom tech?"],
        ["You can hire developers anywhere.", "You can hire IT consultants anywhere."],
        ["Dev Shops", "Off-the-shelf Software"],
        ["One Model.", "Not Everything Needs Software."],
        ["Skin in the game", "Flat fee. You own it. Done."],
        [
            "Forces you to change how you work. ",
            "Most tools force you to adapt to them. You end up paying monthly for features you don't use, workarounds your team hates, and a system that still doesn't fit how you actually operate. ",
        ],
        ["Half the features you don't use.", ""],
        ["Monthly fees forever.", ""],
        ["THE AGENCY WAY", "THE GENERIC APPROACH"],
        ["THE NOMAD WAY", "THE NOMAD APPROACH"],
        [
            "we figure out why your team is stuck doing manual work, and we build the exact tools to fix it. ",
            "we work with business owners and organizations who are done with manual processes and off-the-shelf tools that don't fit. we audit what's broken, map what's possible, and build what actually works whether that's an automated workflow, a custom dashboard, or an AI integration your team will actually use. ",
        ],

        ["we want your business running smoothly. we don't want to sell you tech you don't need.", ""],
        ["no subscriptions. no bloated tech. just systems that work.", "no subscriptions. no bloated tech. flat fee. you own it."],
        ["Scope grows. The clock keeps running.", "forces you to adapt your process to the tool"],
        ["Deliverables tied to hours, not outcomes.", "monthly fees for features you never use"],
        ["You bend to their process—not the reverse.", "your team works around it, not with it"],
        ["Retainers that stretch without a finish line.", "support ticket. wait 3 days. still broken."],
        ["we aren't looking for tech startups. ", ""],
        [
            "we work with business owners who are tired of administrative friction and manual data entry.",
            "we work with business owners and organizations who are done with administrative friction, manual data entry, and tech that doesn't deliver.",
        ],
        ["you want flat-fee results, not hourly billing.", "you want results, not hourly billing or monthly retainers"],
        [
            "you want tools that work for you, not against you.",
            "you want tools built for how you actually work, not how a software company thinks you work",
        ],
        [
            "If we can help, we charge 20% to start and 80% when it's done. Zero risk.",
            "you want to know what you're paying before we start",
        ],
        ["you want to focus on your business, not your IT.", "you want to focus on your business — not your IT"],
    ];
    FRAMER_VENTURE_SCRUB.sort(function (a, b) {
        return (b[0] || "").length - (a[0] || "").length;
    });

    function scrubFramerInjectedVentureCopyInString(s) {
        var out = s;
        for (var i = 0; i < FRAMER_VENTURE_SCRUB.length; i++) {
            var oldS = FRAMER_VENTURE_SCRUB[i][0];
            var newS = FRAMER_VENTURE_SCRUB[i][1];
            if (oldS && out.indexOf(oldS) !== -1) {
                out = out.split(oldS).join(newS == null ? "" : newS);
            }
        }
        return out;
    }

    function scrubLegacySitesAndEmail(s) {
        var out = s;
        out = out.replace(/04 \/ FAQs{2,}/g, "04 / FAQs");
        out = out.replace(/team@antigamble\.(co|vc)/gi, CONTACT_EMAIL);
        out = out.replace(/mailto:\s*team@antigamble\.(co|vc)/gi, "mailto:" + CONTACT_EMAIL);
        out = out.replace(/https?:\/\/(www\.)?antigamble\.(co|vc)\/?/gi, SITE_URL);
        out = out.replace(/\bantigamble\.(co|vc)\b/gi, "nomadholdings.ca");
        out = out.replace(/\bnomadstudio\.co\b/gi, "nomadholdings.ca");
        out = out.replace(/team@nomadstudio\.ca/gi, CONTACT_EMAIL);
        out = out.replace(/mailto:\s*team@nomadstudio\.ca/gi, "mailto:" + CONTACT_EMAIL);
        out = out.replace(/https?:\/\/(www\.)?nomadstudio\.ca\/?/gi, SITE_URL);
        out = out.replace(/\bnomadstudio\.ca\b/gi, "nomadholdings.ca");
        out = out.replace(/\bAnti\s*Gamble\b/gi, "Nomad Studio");
        out = out.replace(/\bAntiGamble\b/g, "Nomad Studio");
        out = out.replace(/\bANTI\s*GAMBLE\b/g, "NOMAD STUDIO");
        out = out.replace(
            /\u00a9\s*2026\s+Nomad\s+Studio\.\s*All rights reserved\./gi,
            "\u00a9 2026 Nomad Holdings. All rights reserved."
        );
        out = out.replace(
            /©\s*2026\s+Nomad\s+Studio\.\s*All rights reserved\./g,
            "\u00a9 2026 Nomad Holdings. All rights reserved."
        );
        out = out.replace(
            /\u00a9\s*2026\s+Venture\s+Studio\.\s*All rights reserved\./gi,
            "\u00a9 2026 Nomad Holdings. All rights reserved."
        );
        out = out.replace(
            /©\s*2026\s+Venture\s+Studio\.\s*All rights reserved\./g,
            "\u00a9 2026 Nomad Holdings. All rights reserved."
        );
        for (var m = 0; m < LEGACY_MONOGRAM.length; m++) {
            var f = LEGACY_MONOGRAM[m];
            if (f && out.indexOf(f) !== -1) out = out.split(f).join(BRAND_TO);
        }
        return out;
    }

    function fixLegacyAttributes() {
        document.querySelectorAll("a[href]").forEach(function (a) {
            var h = a.getAttribute("href");
            if (!h) return;
            if (isCalUrl(h)) {
                a.setAttribute("href", MAILTO_LETS_TALK);
                return;
            }
            var nh = h
                .replace(/team@antigamble\.(co|vc)/gi, CONTACT_EMAIL)
                .replace(/mailto:\s*team@antigamble\.(co|vc)/gi, "mailto:" + CONTACT_EMAIL)
                .replace(/https?:\/\/(www\.)?antigamble\.(co|vc)\/?/gi, SITE_URL)
                .replace(/nomadstudio\.co/gi, "nomadholdings.ca")
                .replace(/team@nomadstudio\.ca/gi, CONTACT_EMAIL)
                .replace(/mailto:\s*team@nomadstudio\.ca/gi, "mailto:" + CONTACT_EMAIL)
                .replace(/https?:\/\/(www\.)?nomadstudio\.ca\/?/gi, SITE_URL);
            if (nh !== h) a.setAttribute("href", nh);
        });
    }

    function fixCanonicalMeta() {
        var link = document.querySelector('link[rel="canonical"]');
        if (link) link.setAttribute("href", SITE_URL);
        var og = document.querySelector('meta[property="og:url"]');
        if (og) og.setAttribute("content", SITE_URL);
    }

    function tryInterceptScheduling(e) {
        if (!e || !e.target) return;
        var main = document.getElementById("main");
        var path = typeof e.composedPath === "function" ? e.composedPath() : [e.target];
        var i;
        var el;
        for (i = 0; i < path.length; i++) {
            el = path[i];
            if (!el || el.nodeType !== 1) continue;
            if (el.id === "main") break;
            if (el.tagName === "A") {
                var href = el.getAttribute("href") || "";
                if (isCalUrl(href)) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    goMailtoLetsTalk();
                    return;
                }
            }
        }

        if (!main || !main.contains(e.target)) return;

        var t = e.target;
        var walk = t;
        for (i = 0; i < 22 && walk; i++) {
            if (!main.contains(walk)) break;
            var txt = (walk.textContent || "").replace(/\s+/g, " ").trim();
            if (/^let'?s talk\.?$/i.test(txt)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                goMailtoLetsTalk();
                return;
            }
            if (/let'?s talk/i.test(txt) && txt.length <= 48) {
                e.preventDefault();
                e.stopImmediatePropagation();
                goMailtoLetsTalk();
                return;
            }
            walk = walk.parentElement;
        }
    }

    function onMaybeCalOverlay() {
        var found = false;
        document.querySelectorAll("iframe").forEach(function (f) {
            if (iframeLooksLikeCal(f)) found = true;
        });
        if (!found) return;
        tearDownCalOverlays();
        goMailtoLetsTalk();
    }

    function applySanitizeToText(s) {
        return scrubFramerInjectedVentureCopyInString(scrubLegacySitesAndEmail(s));
    }

    function shouldSkipTextNode(node) {
        var p = node.parentElement;
        if (!p) return true;
        var tag = p.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "CODE") return true;
        return false;
    }

    function removeDuplicateHowWeWorkLine() {
        var main = document.getElementById("main");
        if (!main) return;
        var needle =
            "we work with business owners and organizations who are done with manual processes and off-the-shelf tools that don't fit. we audit what's broken, map what's possible, and build what actually works whether that's an automated workflow, a custom dashboard, or an AI integration your team will actually use.";
        var cards = main.querySelectorAll("[data-framer-name], .framer-chtksx");
        var c;
        var card;
        var tw;
        var n;
        var v;
        var nv;
        for (c = 0; c < cards.length; c++) {
            card = cards[c];
            if (!card.textContent || card.textContent.indexOf("01 / HOW WE WORK") === -1) continue;
            tw = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, null);
            while ((n = tw.nextNode())) {
                if (shouldSkipTextNode(n)) continue;
                v = n.nodeValue || "";
                if (v.indexOf(needle) === -1) continue;
                nv = v
                    .split(needle)
                    .join("")
                    .replace(/\s*,\s*$/g, "")
                    .replace(/^\s*,\s*/g, "")
                    .replace(/\s+/g, " ")
                    .trim();
                n.nodeValue = nv;
                return;
            }
        }
    }

    function walkTextNodes(root, fn) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        var n;
        while ((n = walker.nextNode())) {
            if (shouldSkipTextNode(n)) continue;
            if (!n.nodeValue || !/\S/.test(n.nodeValue)) continue;
            fn(n);
        }
    }

    function applyMeta() {
        document.title = META.title;
        document.documentElement.lang = "en";
        var md = document.querySelector('meta[name="description"]');
        if (md) md.setAttribute("content", META.description);
        var ogT = document.querySelector('meta[property="og:title"]');
        if (ogT) ogT.setAttribute("content", META.title);
        var ogD = document.querySelector('meta[property="og:description"]');
        if (ogD) ogD.setAttribute("content", META.description);
        var twT = document.querySelector('meta[name="twitter:title"]');
        if (twT) twT.setAttribute("content", META.title);
        var twD = document.querySelector('meta[name="twitter:description"]');
        if (twD) twD.setAttribute("content", META.description);
    }

    /**
     * Target order after Framer cleanup: six core rows + final “get started” (ex–FAQ 10).
     * If the export still has ten rows (01–10), remove venture rows 07–09 at indices 6–8 first.
     */
    var FAQ_QUESTION_ROWS = [
        "Do you work with businesses outside of Canada?",
        "What happens if we're not happy with the result?",
        "what if we don't need custom tech?",
        "what do you actually build?",
        "do you work with organizations and institutions?",
        "Can you work with our existing tools and software?",
        "how do we get started?",
    ];

    var FAQ_ANSWER_ROWS = [
        {
            want:
                "yes. we work remotely with businesses and organizations across north america. if your operations run on software and spreadsheets, we can help regardless of where you're based. we also run AI literacy workshops and process audits for teams and organizations. these are designed for non-technical staff — no coding background required. workshops are available in English and French. ask us about format and pricing.",
        },
        {
            want:
                "we don't collect the 80% until the system works the way we agreed it would. if it's not right, we fix it. we don't move on until you're satisfied.",
        },
        {
            want:
                "we'll tell you. if a spreadsheet or off-the-shelf tool is the honest answer, we'll say so—and we won't charge you to build what you don't need.",
        },
        {
            want:
                "automation workflows, internal tools, dashboards, integrations, and AI features your team will actually use. we scope to your operations, not a feature checklist.",
        },
        {
            want:
                "yes. we work with non-profits, funded programs, and public institutions on fixed-scope, fixed-fee contracts. if you run training programs, community services, or operational mandates and need AI or automation support — we can help. reach out at team@nomadholdings.ca to discuss scope.",
        },
        {
            want:
                "yes — that's usually the starting point. we build around what you already use. we only recommend replacing a tool if it's genuinely the bottleneck.",
        },
        {
            want:
                "no minimum. we've helped solo operators and mid-size teams. what matters is whether the problem is real and the scope is clear. if we can't make an impact, we'll tell you upfront. book a free 30-minute conversation. we'll map your biggest operational bottleneck, tell you honestly whether tech can fix it, and give you a flat-fee quote before anything moves forward. no obligation.",
        },
    ];

    /** Six-row Framer exports: tools line folded into “what we build” (no separate row). */
    var FAQ_QUESTION_ROWS_SHORT = [
        "Do you work with businesses outside of Canada?",
        "What happens if we're not happy with the result?",
        "what if we don't need custom tech?",
        "what do you actually build?",
        "do you work with organizations and institutions?",
        "how do we get started?",
    ];

    var FAQ_ANSWER_ROWS_SHORT = [
        FAQ_ANSWER_ROWS[0],
        FAQ_ANSWER_ROWS[1],
        FAQ_ANSWER_ROWS[2],
        {
            want:
                "automation workflows, internal tools, dashboards, integrations, and AI features your team will actually use. we scope to your operations, not a feature checklist. yes — we usually build around your existing tools; we only recommend replacing one when it's genuinely the bottleneck.",
        },
        FAQ_ANSWER_ROWS[4],
        FAQ_ANSWER_ROWS[6],
    ];

    function removeVentureFaqRows() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
        var removeIdx = [];
        var j;
        if (qh.length >= 10) {
            removeIdx = [6, 7, 8];
        } else {
            for (j = 0; j < qh.length; j++) {
                var txt = ((qh[j].textContent || "") + "").toLowerCase();
                if (
                    /how many ventures/.test(txt) ||
                    /venture doesn't work/.test(txt) ||
                    /how do i apply/.test(txt)
                ) {
                    removeIdx.push(j);
                }
            }
            var seenStart = -1;
            for (j = 0; j < qh.length; j++) {
                var t2 = ((qh[j].textContent || "") + "")
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .trim();
                if (/^how do we (get )?started\??$/.test(t2)) {
                    if (seenStart >= 0) removeIdx.push(j);
                    else seenStart = j;
                }
            }
            removeIdx.sort(function (a, b) {
                return b - a;
            });
            var uniq = [];
            for (j = 0; j < removeIdx.length; j++) {
                if (uniq.indexOf(removeIdx[j]) === -1) uniq.push(removeIdx[j]);
            }
            removeIdx = uniq.sort(function (a, b) {
                return b - a;
            });
        }
        var roots = [];
        var k;
        for (k = 0; k < removeIdx.length; k++) {
            var idx = removeIdx[k];
            if (idx < 0 || idx >= qh.length) continue;
            var h = qh[idx];
            var root = h.closest(".ssr-variant");
            if (!root) root = h.closest('[data-framer-name="Variant 1"]');
            if (root && roots.indexOf(root) === -1) roots.push(root);
        }
        for (k = 0; k < roots.length; k++) {
            try {
                roots[k].remove();
            } catch (e2) {}
        }
    }

    function findFaqItemContainer(h6) {
        var el = h6;
        for (var u = 0; u < 22 && el; u++) {
            if (el.getAttribute && el.getAttribute("data-framer-name") === "FAQs") return null;
            var cl = el.className && typeof el.className === "string" ? el.className : "";
            if (cl.indexOf("framer-") !== -1 && /-container\b/.test(cl)) return el;
            el = el.parentElement;
        }
        return null;
    }

    function isFaqHeaderRichText(b) {
        return !!(b && (b.closest(".framer-tg7p11") || b.closest(".framer-74nljt")));
    }

    function patchFaqQuestionsFromStudio() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
        if (!qh || qh.length === 0) return;
        var qRows = qh.length >= 7 ? FAQ_QUESTION_ROWS : FAQ_QUESTION_ROWS_SHORT;
        var n = Math.min(qh.length, qRows.length);
        var i;
        var t;
        for (i = 0; i < n; i++) {
            t = qRows[i];
            if (!t || !qh[i]) continue;
            qh[i].textContent = t;
        }
    }

    function patchFaqAccordionAnswers() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
        if (!qh || qh.length === 0) return;
        var aRows = qh.length >= 7 ? FAQ_ANSWER_ROWS : FAQ_ANSWER_ROWS_SHORT;
        var n = Math.min(qh.length, aRows.length);
        var i;
        var row;
        var spec;
        var container;
        var rtcs;
        var x;
        var b;
        var ps;
        var z;
        var want;
        for (i = 0; i < n; i++) {
            spec = aRows[i];
            if (!spec) continue;
            want = spec.want;
            row = qh[i];
            if (!row) continue;
            container = findFaqItemContainer(row);
            if (!container) continue;
            var patched = false;
            rtcs = container.querySelectorAll('[data-framer-component-type="RichTextContainer"]');
            for (x = 0; x < rtcs.length; x++) {
                b = rtcs[x];
                if (isFaqHeaderRichText(b)) continue;
                ps = b.querySelectorAll("p, li");
                if (ps.length === 0) {
                    b.textContent = want;
                } else {
                    ps[0].textContent = want;
                    for (z = 1; z < ps.length; z++) ps[z].remove();
                    b.querySelectorAll("ul").forEach(function (ul) {
                        ul.remove();
                    });
                }
                patched = true;
                break;
            }
            if (!patched) {
                var paras = container.querySelectorAll("p");
                for (x = 0; x < paras.length; x++) {
                    b = paras[x];
                    if (b.closest && (b.closest(".framer-tg7p11") || b.closest(".framer-74nljt"))) continue;
                    b.textContent = want;
                    break;
                }
            }
        }
    }

    function scrubDocument() {
        walkTextNodes(document.body, function (node) {
            var raw = node.nodeValue;
            var next = applySanitizeToText(raw);
            if (next !== raw) node.nodeValue = next;
        });
        fixLegacyAttributes();
        fixCanonicalMeta();
        applyMeta();
        removeDuplicateHowWeWorkLine();
        patchNavLabels();
        patchHeroLede();
        patchProblemComparisonTitles();
        applySection02ProblemHeadline();
        applyWhoWeHelpHeadline();
        patchWhoWeHelpCaseStudy();
        patchWhoWeHelpPricingParagraph();
        patchCtaSubcopy();
        removeVentureFaqRows();
        patchFaqQuestionsFromStudio();
        patchFaqAccordionAnswers();
    }

    function applySection02ProblemHeadline() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        var h2 = sec.querySelector("h2.framer-text, h2");
        if (h2) {
            h2.textContent = "Off-the-shelf software wasn't built for your business.";
        }
    }

    function applyWhoWeHelpHeadline() {
        var sec = document.getElementById("is-ts-2");
        if (!sec) return;
        var h2 = sec.querySelector("h2.framer-text, h2");
        if (h2) {
            h2.textContent = "Established Businesses & Organizations.";
        }
    }

    function patchWhoWeHelpCaseStudy() {
        var sec = document.getElementById("is-ts-2");
        if (!sec || sec.querySelector("[data-nomad-case-study]")) return;
        var ul = sec.querySelector("ul");
        if (!ul || !ul.parentNode) return;
        var q = document.createElement("p");
        q.setAttribute("data-nomad-case-study", "1");
        q.className = "framer-text framer-styles-preset-2jn57a";
        q.setAttribute("data-styles-preset", "zKLVRJClg");
        q.dir = "auto";
        q.style.cssText =
            "margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.12);font-style:italic;--framer-text-color:rgba(250, 250, 250, 0.85)";
        q.textContent = WHO_HELP_CASE_STUDY;
        ul.parentNode.insertBefore(q, ul.nextSibling);
    }

    function patchWhoWeHelpPricingParagraph() {
        var sec = document.getElementById("is-ts-2");
        if (!sec || sec.querySelector("[data-nomad-pricing-p]")) return;
        var ul = sec.querySelector("ul");
        if (!ul || !ul.parentNode) return;
        var want =
            "private clients: we charge 20% upfront and 80% on delivery. zero risk. organizations & institutions: we work on fixed-scope, fixed-fee contracts. ask us about program delivery and training engagements.";
        var anchor = ul;
        var afterUl = ul.nextElementSibling;
        if (afterUl && afterUl.getAttribute("data-nomad-case-study") === "1") anchor = afterUl;
        var next = anchor.nextElementSibling;
        if (next && (next.textContent || "").indexOf("private clients:") !== -1) return;
        var p = document.createElement("p");
        p.setAttribute("data-nomad-pricing-p", "1");
        p.className = "framer-text framer-styles-preset-2jn57a";
        p.setAttribute("data-styles-preset", "zKLVRJClg");
        p.dir = "auto";
        p.style.cssText = "--framer-text-color:rgba(250, 250, 250, 0.8)";
        p.textContent = want;
        anchor.parentNode.insertBefore(p, next);
    }

    function patchCtaSubcopy() {
        var hi;
        var headings = document.querySelectorAll("h2.framer-text, h2");
        for (hi = 0; hi < headings.length; hi++) {
            var h2 = headings[hi];
            var tl = (h2.textContent || "").toLowerCase();
            if (tl.indexOf("you run the business") === -1 || tl.indexOf("we build the systems") === -1)
                continue;
            var rtc = h2.closest('[data-framer-component-type="RichTextContainer"]');
            if (!rtc) continue;
            var sib = rtc.nextElementSibling;
            if (!sib || sib.getAttribute("data-framer-component-type") !== "RichTextContainer") continue;
            var ps = sib.querySelectorAll("p.framer-text, p");
            var j;
            if (ps.length) {
                ps[0].textContent = CTA_SUBCOPY_EXACT;
                for (j = 1; j < ps.length; j++) ps[j].remove();
            } else {
                sib.textContent = "";
                var p = document.createElement("p");
                p.className = "framer-text framer-styles-preset-2jn57a";
                p.dir = "auto";
                p.textContent = CTA_SUBCOPY_EXACT;
                sib.appendChild(p);
            }
            return;
        }
    }

    function patchNavLabels() {
        var main = document.getElementById("main");
        if (!main) return;
        var map = [
            [/^Thesis$/i, "The Problem"],
            [/^Partners$/i, "Who We Help"],
            [/^Apply$/i, "Let's Talk"],
        ];
        main.querySelectorAll('a[href*="#"]').forEach(function (a) {
            var raw = (a.textContent || "").replace(/\s+/g, " ").trim();
            var j;
            for (j = 0; j < map.length; j++) {
                if (map[j][0].test(raw)) {
                    a.textContent = map[j][1];
                    return;
                }
            }
        });
    }

    function patchHeroLede() {
        document.querySelectorAll("h1.framer-text").forEach(function (h1) {
            var inner = (h1.textContent || "").toLowerCase();
            if (inner.indexOf("automate the mess") === -1) return;
            var rtc = h1.closest('[data-framer-component-type="RichTextContainer"]');
            if (!rtc || rtc.querySelector("[data-nomad-hero-lede]")) return;
            var p = document.createElement("p");
            p.setAttribute("data-nomad-hero-lede", "1");
            p.className = "framer-text";
            p.dir = "auto";
            p.style.cssText =
                "margin-top:20px;max-width:36rem;font-size:clamp(16px,1.9vw,19px);line-height:1.45;color:rgba(250,250,250,0.78)";
            p.textContent = HERO_LEDE;
            rtc.appendChild(p);
        });
    }

    function patchProblemComparisonTitles() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        walkTextNodes(sec, function (n) {
            if ((n.nodeValue || "").trim() !== "Bill by the hour.") return;
            var par = n.parentNode;
            if (!par || (par.textContent || "").indexOf("Talk in circles") === -1) return;
            par.textContent = "Built For Everyone. Works For No One.";
        });
        walkTextNodes(sec, function (n) {
            if ((n.nodeValue || "").trim() !== "Flat fee.") return;
            var par = n.parentNode;
            if (!par) return;
            var full = par.textContent || "";
            if (full.indexOf("20%") === -1 || full.indexOf("80%") === -1) return;
            par.textContent = "Built Around How You Actually Operate.";
        });
    }

    function init() {
        applyDarkTokens();

        try {
            localStorage.removeItem("nomadStudioLang");
        } catch (e) {}

        patchWindowOpenOnce();

        document.addEventListener("click", tryInterceptScheduling, true);
        document.addEventListener("pointerdown", tryInterceptScheduling, true);
        document.addEventListener("mousedown", tryInterceptScheduling, true);
        document.addEventListener("pointerdown", onPointerMaybeInMain, true);
        document.addEventListener("mousedown", onPointerMaybeInMain, true);

        scrubDocument();
        applyDarkTokens();

        var root = document.getElementById("main");
        if (root && typeof MutationObserver !== "undefined") {
            var t;
            var obs = new MutationObserver(function () {
                clearTimeout(t);
                t = setTimeout(function () {
                    applyDarkTokens();
                    scrubDocument();
                    onMaybeCalOverlay();
                }, 80);
            });
            obs.observe(root, { childList: true, subtree: true, characterData: true });
        }

        if (typeof MutationObserver !== "undefined") {
            var t2;
            var bodyObs = new MutationObserver(function () {
                clearTimeout(t2);
                t2 = setTimeout(onMaybeCalOverlay, 60);
            });
            bodyObs.observe(document.body, { childList: true, subtree: true });
        }

        [500, 1500, 3000].forEach(function (ms) {
            setTimeout(function () {
                applyDarkTokens();
                scrubDocument();
                onMaybeCalOverlay();
            }, ms);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
