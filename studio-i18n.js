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

    var PROBLEM_SECTION_BODY =
        "Most tools force you to adapt to them. You end up paying monthly for features you don't use, workarounds your team hates, and a system that still doesn't fit how you actually operate.";

    var PROBLEM_AGENCY_SUBHEAD_HTML = "Bill by the hour.<br>Talk in circles.";
    var PROBLEM_NOMAD_SUBHEAD_HTML = "Flat fee.<br>20% upfront.<br>80% on delivery.";
    /** Text after the ✕ span (leading space matches “✕ Scope …” in design). */
    var PROBLEM_AGENCY_BULLETS = [
        " Scope grows. The clock keeps running.",
        " Deliverables tied to hours, not outcomes.",
        " You bend to their process \u2014 not the reverse.",
        " Retainers that stretch without a finish line.",
    ];
    var PROBLEM_NOMAD_TILES = [
        ["Your operations", "Known", "we map real workflows"],
        ["Scope", "Fixed", "before we build"],
        ["Honest fit", "First", "no tech for tech's sake"],
        ["Delivery", "Phased", "you can use it early"],
    ];

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
        ["Dev Shops", "Off-the-shelf"],
        ["One Model.", "Not Everything Needs Software."],
        ["Skin in the game", "Flat fee. You own it. Done."],
        [
            "Forces you to change how you work. ",
            "Most tools force you to adapt to them. You end up paying monthly for features you don't use, workarounds your team hates, and a system that still doesn't fit how you actually operate. ",
        ],
        ["Half the features you don't use.", ""],
        ["Monthly fees forever.", ""],
        [
            "we figure out why your team is stuck doing manual work, and we build the exact tools to fix it. ",
            "we work with business owners and organizations who are done with manual processes and off-the-shelf tools that don't fit. we audit what's broken, map what's possible, and build what actually works whether that's an automated workflow, a custom dashboard, or an AI integration your team will actually use. ",
        ],

        ["we want your business running smoothly. we don't want to sell you tech you don't need.", ""],
        ["no subscriptions. no bloated tech. just systems that work.", "no subscriptions. no bloated tech. flat fee. you own it."],

        ["domain expertise \u2192 we build \u2192 shared equity", "your process \u2192 we build \u2192 you own it"],
        [
            "domain expertise -> we build -> shared equity",
            "your process \u2192 we build \u2192 you own it",
        ],
        ["built for the industry. not from inside it.", "You bend to their process \u2014 not the reverse."],
        ["✕built for the industry. not from inside it.", "\u2715 You bend to their process \u2014 not the reverse."],
        ["✕ built for the industry. not from inside it.", "\u2715 You bend to their process \u2014 not the reverse."],
        ["✕no distribution on launch day.", "\u2715 Deliverables tied to hours, not outcomes."],
        ["✕ no distribution on launch day.", "\u2715 Deliverables tied to hours, not outcomes."],
        ["✕wrong problem. learned it 12 months in.", "\u2715 Scope grows. The clock keeps running."],
        ["✕ wrong problem. learned it 12 months in.", "\u2715 Scope grows. The clock keeps running."],
        ["✕18 months of runway. gone.", "\u2715 Retainers that stretch without a finish line."],
        ["✕ 18 months of runway. gone.", "\u2715 Retainers that stretch without a finish line."],
        ["Built By Someone Who Guessed.", "Bill by the hour. Talk in circles."],
        ["Built By Someone Who Knew.", "Flat fee. 20% upfront. 80% on delivery."],
        ["THE INSIDER BLUEPRINT", "THE NOMAD WAY"],
        ["THE OUTSIDER BET", "THE AGENCY WAY"],
        ["How It Gets Built", "How a project runs"],
        ["first version live", "you can use it early"],
        ["lived it for years", "no tech for tech's sake"],
        ["existing relationships", "before we build"],
        ["unfair advantage", "we map real workflows"],
        ["Problem Validation", "Honest fit"],
        ["Industry Tenure", "Your operations"],
        ["Speed to Market", "Delivery"],
        ["Day 1 Pipeline", "Scope"],
        ["10yr+", "Known"],
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
    var FAQ_EXPECTED_QUESTION_COUNT = 7;

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

    function faqRemovalDedupeRoots(nodes) {
        var out = [];
        var i;
        var j;
        var n;
        var anc;
        for (i = 0; i < nodes.length; i++) {
            n = nodes[i];
            if (!n) continue;
            anc = false;
            for (j = 0; j < nodes.length; j++) {
                if (i === j || !nodes[j]) continue;
                if (nodes[j].contains(n)) {
                    anc = true;
                    break;
                }
            }
            if (!anc && out.indexOf(n) === -1) out.push(n);
        }
        return out;
    }

    function faqGhostLabelNorm(s) {
        return ((s || "") + "")
            .replace(/\u200b/g, "")
            .replace(/\u00a0/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function faqRowRootFromQuestionH6(h6) {
        var root = h6.closest(".ssr-variant");
        if (!root) root = h6.closest('[data-framer-name="Variant 1"]');
        return root;
    }

    /**
     * Removes FAQ accordion shells that still take space: empty questions, index-only stubs, venture rows,
     * or rows with no .framer-74nljt question (Framer “ghost” frames).
     * Also removes any *direct* child of the FAQ stack that is not a real question row — invisible
     * accordion instances deleted in Framer often leave framer-*-container shells without .ssr-variant.
     */
    function removeFaqGhostRows() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var toRemove = [];
        var ventureQ = /how many ventures|venture doesn't work|how do i apply/i;
        var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
        var k;
        var h;
        var label;
        var root;
        for (k = 0; k < qh.length; k++) {
            h = qh[k];
            label = faqGhostLabelNorm(h.textContent || "");
            if (label.length !== 0 && !/^(\d{1,2})\s*\/\s*$/.test(label) && !ventureQ.test(label))
                continue;
            root = faqRowRootFromQuestionH6(h);
            if (!root || !faqRoot.contains(root)) continue;
            toRemove.push(root);
        }
        var kids = faqRoot.children;
        for (k = 0; k < kids.length; k++) {
            var rowEl = kids[k];
            if (!rowEl || rowEl.nodeType !== 1) continue;
            var qel = rowEl.querySelector(".framer-74nljt h6");
            if (!qel) {
                toRemove.push(rowEl);
                continue;
            }
            label = faqGhostLabelNorm(qel.textContent || "");
            if (label.length === 0) toRemove.push(rowEl);
        }
        var deduped = faqRemovalDedupeRoots(toRemove);
        for (k = deduped.length - 1; k >= 0; k--) {
            try {
                deduped[k].remove();
            } catch (eGhost) {}
        }
    }

    /**
     * Deleted FAQ items can leave empty Framer wrappers in the export (e.g. framer-ws3309-container,
     * framer-1790loh-container for old Q06/Q08/Q09). They still participate in the FAQ stack flex layout
     * and read as dead space. In Framer: open the FAQ stack, select the invisible accordion shells between
     * real items, delete them, republish. This removes any that remain at runtime.
     */
    function removeFaqOrphanFramerContainers() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var list = faqRoot.querySelectorAll(
            ".framer-ws3309-container, .framer-1790loh-container"
        );
        var k;
        var n;
        var row;
        for (k = list.length - 1; k >= 0; k--) {
            n = list[k];
            if (!n || !faqRoot.contains(n)) continue;
            if (n.querySelector(".framer-74nljt h6")) continue;
            row = n.closest(".ssr-variant");
            if (row && row.parentNode === faqRoot) {
                try {
                    row.remove();
                } catch (eOrphan) {}
                continue;
            }
            try {
                n.remove();
            } catch (eOrphan2) {}
        }
    }

    /**
     * Framer often ships six FAQ shells after venture/ghost cleanup; insert clones until seven slots.
     * Clone the *penultimate* row and insertBefore the last row so the real last item keeps Framer’s
     * bottom spacing before the CTA — appending a copy of the last row left Q6 with “last item” margin
     * and a dead gap before Q7.
     */
    function ensureFaqSevenQuestionRows() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var guard = 0;
        while (guard < 12) {
            guard++;
            var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
            if (qh.length >= FAQ_EXPECTED_QUESTION_COUNT) return;
            if (qh.length === 0) return;
            var kids = faqRoot.children;
            var lastRow = null;
            var lastIdx = -1;
            var i;
            for (i = kids.length - 1; i >= 0; i--) {
                var row = kids[i];
                if (
                    row &&
                    row.classList &&
                    row.classList.contains("ssr-variant") &&
                    row.querySelector(".framer-74nljt h6")
                ) {
                    lastRow = row;
                    lastIdx = i;
                    break;
                }
            }
            if (!lastRow) {
                lastRow = faqRowRootFromQuestionH6(qh[qh.length - 1]);
                if (!lastRow || !faqRoot.contains(lastRow)) return;
                faqRoot.appendChild(lastRow.cloneNode(true));
                continue;
            }
            var templateRow = null;
            for (i = lastIdx - 1; i >= 0; i--) {
                row = kids[i];
                if (
                    row &&
                    row.classList &&
                    row.classList.contains("ssr-variant") &&
                    row.querySelector(".framer-74nljt h6")
                ) {
                    templateRow = row;
                    break;
                }
            }
            if (!templateRow) {
                templateRow = lastRow;
            }
            faqRoot.insertBefore(templateRow.cloneNode(true), lastRow);
        }
    }

    /**
     * FAQs stack uses flex gap; strip margins/min-heights on rows and inner Framer shells so
     * :nth-last-child(2) / last-item rules cannot double space (see studio-i18n.css FAQ block).
     */
    function normalizeFaqListSpacing() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var kids = faqRoot.children;
        var i;
        var j;
        var el;
        var c;
        var v1;
        for (i = 0; i < kids.length; i++) {
            el = kids[i];
            if (!el || !el.classList || !el.classList.contains("ssr-variant")) continue;
            if (!el.querySelector(".framer-74nljt h6")) continue;
            el.style.setProperty("margin-top", "0", "important");
            el.style.setProperty("margin-bottom", "0", "important");
            el.style.setProperty("min-height", "0", "important");
            for (j = 0; j < el.children.length; j++) {
                c = el.children[j];
                if (!c || !c.className || typeof c.className !== "string") continue;
                if (c.className.indexOf("framer-") === -1) continue;
                c.style.setProperty("margin-top", "0", "important");
                c.style.setProperty("margin-bottom", "0", "important");
                c.style.setProperty("min-height", "0", "important");
            }
            v1 = el.querySelector('[data-framer-name="Variant 1"]');
            if (v1) {
                v1.style.setProperty("min-height", "0", "important");
                v1.style.setProperty("margin-block", "0", "important");
            }
        }
    }

    /** Hide accordion answer shells when row is not in Framer’s open variant (framer-v-niip13). */
    function normalizeFaqClosedAnswerSlots() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var shells = faqRoot.querySelectorAll(".framer-15ssd7a");
        var k;
        var sh;
        var par;
        for (k = 0; k < shells.length; k++) {
            sh = shells[k];
            par = sh.closest(".framer-s6yNh");
            if (!par) continue;
            if (par.classList.contains("framer-v-niip13")) {
                sh.style.removeProperty("display");
                continue;
            }
            sh.style.setProperty("display", "none", "important");
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
        var qRows =
            qh.length >= FAQ_EXPECTED_QUESTION_COUNT
                ? FAQ_QUESTION_ROWS
                : FAQ_QUESTION_ROWS_SHORT;
        var n = Math.min(qh.length, qRows.length);
        var i;
        var t;
        for (i = 0; i < n; i++) {
            t = qRows[i];
            if (!t || !qh[i]) continue;
            qh[i].textContent = t;
        }
    }

    /**
     * Left column indices are a separate h6 in .framer-tg7p11 (Geist Pixel Grid). Framer keeps old slot
     * numbers (e.g. 10) after middle rows are deleted — re-sync to 01…07 after ghost removal + copy patch.
     */
    function patchFaqIndexBadges() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
        var i;
        var q;
        var bar;
        var badge;
        var num;
        for (i = 0; i < qh.length; i++) {
            q = qh[i];
            bar = q.closest(".framer-1xm2enl");
            badge = null;
            if (bar) badge = bar.querySelector(".framer-tg7p11 h6");
            if (!badge) {
                var c = findFaqItemContainer(q);
                if (c) badge = c.querySelector(".framer-tg7p11 h6");
            }
            if (!badge) continue;
            num = String(i + 1);
            if (num.length === 1) num = "0" + num;
            badge.textContent = num;
        }
    }

    function patchFaqAccordionAnswers() {
        var faqRoot = document.querySelector('[data-framer-name="FAQs"]');
        if (!faqRoot) return;
        var qh = faqRoot.querySelectorAll(".framer-74nljt h6");
        if (!qh || qh.length === 0) return;
        var aRows =
            qh.length >= FAQ_EXPECTED_QUESTION_COUNT
                ? FAQ_ANSWER_ROWS
                : FAQ_ANSWER_ROWS_SHORT;
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

    function patchNomadLogoHomeLink() {
        var logo = document.querySelector('[data-framer-name="logo"]');
        if (!logo || logo.getAttribute("data-nomad-home-wrapped") === "1") return;
        var existing = logo.closest("a");
        if (existing) {
            existing.setAttribute("href", "/");
            existing.setAttribute("aria-label", "Nomad home");
            logo.setAttribute("data-nomad-home-wrapped", "1");
            return;
        }
        var par = logo.parentNode;
        if (!par) return;
        var a = document.createElement("a");
        a.href = "/";
        a.setAttribute("aria-label", "Nomad home");
        a.style.cssText = "color:inherit;text-decoration:none;display:contents";
        par.insertBefore(a, logo);
        a.appendChild(logo);
        logo.setAttribute("data-nomad-home-wrapped", "1");
    }

    function injectNomadPovAboutChrome() {
        var root = document.querySelector("[data-framer-root]");
        var shell = document.getElementById("main");
        if (!root || !shell) return;
        var studioHome = root.parentElement === shell;
        var nav = document.querySelector("[data-nomad-header-util]");
        if (!nav && studioHome) {
            nav = document.createElement("nav");
            nav.setAttribute("data-nomad-header-util", "1");
            nav.setAttribute("aria-label", "Editorial");
            var l1 = document.createElement("a");
            l1.href = "pov/index.html";
            l1.textContent = "pov";
            var l2 = document.createElement("a");
            l2.href = "about/index.html";
            l2.textContent = "about";
            nav.appendChild(l1);
            nav.appendChild(l2);
            shell.insertBefore(nav, shell.firstChild);
        } else if (nav && studioHome && nav.parentElement !== shell) {
            shell.insertBefore(nav, shell.firstChild);
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
        patchNomadLogoHomeLink();
        injectNomadPovAboutChrome();
        patchHeroLede();
        applySection02ProblemHeadline();
        patchSection02ProblemBody();
        patchProblemComparisonPanels();
        patchProblemComparisonTable();
        applyWhoWeHelpHeadline();
        removeWhoWeHelpInjectedParas();
        patchCtaSubcopy();
        removeVentureFaqRows();
        removeFaqGhostRows();
        removeFaqOrphanFramerContainers();
        ensureFaqSevenQuestionRows();
        patchFaqQuestionsFromStudio();
        patchFaqAccordionAnswers();
        patchFaqIndexBadges();
        normalizeFaqListSpacing();
        normalizeFaqClosedAnswerSlots();
    }

    function removeWhoWeHelpInjectedParas() {
        var sec = document.getElementById("is-ts-2");
        if (!sec) return;
        var a = sec.querySelector('[data-nomad-case-study="1"]');
        if (a) a.remove();
        var b = sec.querySelector('[data-nomad-pricing-p="1"]');
        if (b) b.remove();
    }

    function applySection02ProblemHeadline() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        var h2 = sec.querySelector("h2.framer-text, h2");
        if (h2) {
            h2.textContent = "Off-the-shelf software wasn't built for your business.";
        }
    }

    function patchSection02ProblemBody() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        var rtc = sec.querySelector(".framer-8027iy");
        if (!rtc) return;
        var ps = rtc.querySelectorAll("p.framer-text");
        if (!ps.length) return;
        ps[0].textContent = PROBLEM_SECTION_BODY;
        ps[0].setAttribute("data-nomad-problem-body", "1");
        var i;
        for (i = 1; i < ps.length; i++) {
            ps[i].remove();
        }
    }

    function isProblemGridColumnShell(d, grid) {
        return !!(grid && d && (d === grid.children[0] || d === grid.children[1]));
    }

    /**
     * Main comparison row: exactly two columns (AGENCY | NOMAD). Not the 3-up stat grid, not the 2×2 tile grid.
     */
    function looksLikeProblemComparisonGrid(g) {
        if (!g || g.children.length !== 2) return false;
        var t0 = ((g.children[0].textContent || "") + "").toUpperCase();
        var t1 = ((g.children[1].textContent || "") + "").toUpperCase();
        var agency =
            t0.indexOf("AGENCY") !== -1 ||
            t0.indexOf("OUTSIDER") !== -1 ||
            t0.indexOf("BILL BY") !== -1 ||
            t1.indexOf("AGENCY") !== -1 ||
            t1.indexOf("OUTSIDER") !== -1 ||
            t1.indexOf("BILL BY") !== -1;
        var nomad =
            t0.indexOf("NOMAD") !== -1 ||
            t0.indexOf("INSIDER") !== -1 ||
            t0.indexOf("FLAT FEE") !== -1 ||
            t1.indexOf("NOMAD") !== -1 ||
            t1.indexOf("INSIDER") !== -1 ||
            t1.indexOf("FLAT FEE") !== -1;
        return agency && nomad;
    }

    function findProblemTwoColumnGrid(sec) {
        if (!sec) return null;
        var divs = sec.getElementsByTagName("div");
        var i;
        var g;
        var st;
        var c0;
        var s0;
        for (i = 0; i < divs.length; i++) {
            g = divs[i];
            if (g.children.length !== 2) continue;
            st = (g.getAttribute("style") || "").replace(/\s+/g, "");
            if (st.indexOf("grid-template-columns") === -1) continue;
            if (st.indexOf("1fr1fr1fr") !== -1) continue;
            if (st.indexOf("1fr1fr") === -1) continue;
            c0 = g.children[0];
            s0 = (c0.getAttribute("style") || "").replace(/\s+/g, "");
            if (
                (s0.indexOf("min-height:400px") !== -1 || s0.indexOf("border-right:1pxsolid#2a2a2a") !== -1) &&
                looksLikeProblemComparisonGrid(g)
            )
                return g;
        }
        for (i = 0; i < divs.length; i++) {
            g = divs[i];
            if (g.children.length !== 2) continue;
            st = (g.getAttribute("style") || "").replace(/\s+/g, "");
            if (st.indexOf("grid-template-columns") === -1) continue;
            if (st.indexOf("1fr1fr1fr") !== -1) continue;
            if (st.indexOf("1fr1fr") !== -1 && looksLikeProblemComparisonGrid(g)) return g;
        }
        return null;
    }

    function assignColumnsFromGrid(grid) {
        if (!grid || grid.children.length !== 2) return { left: null, right: null };
        var a = grid.children[0];
        var b = grid.children[1];
        var ua = (a.textContent || "").toUpperCase();
        var ub = (b.textContent || "").toUpperCase();
        var aNomad =
            ua.indexOf("THE NOMAD WAY") !== -1 ||
            ua.indexOf("THE INSIDER") !== -1 ||
            (ua.indexOf("FLAT FEE") !== -1 && ua.indexOf("NOMAD") !== -1);
        var bNomad =
            ub.indexOf("THE NOMAD WAY") !== -1 ||
            ub.indexOf("THE INSIDER") !== -1 ||
            (ub.indexOf("FLAT FEE") !== -1 && ub.indexOf("AGENCY") === -1 && ub.indexOf("OUTSIDER") === -1);
        var aAgency =
            ua.indexOf("THE AGENCY WAY") !== -1 ||
            ua.indexOf("THE OUTSIDER") !== -1 ||
            ua.indexOf("BILL BY THE HOUR") !== -1 ||
            ua.indexOf("WHO GUESSED") !== -1;
        var bAgency =
            ub.indexOf("THE AGENCY WAY") !== -1 ||
            ub.indexOf("THE OUTSIDER") !== -1 ||
            ub.indexOf("BILL BY THE HOUR") !== -1 ||
            ub.indexOf("WHO GUESSED") !== -1;
        if (aAgency && !bAgency) return { left: a, right: b };
        if (bAgency && !aAgency) return { left: b, right: a };
        if (aNomad && !bNomad) return { left: b, right: a };
        if (bNomad && !aNomad) return { left: a, right: b };
        return { left: a, right: b };
    }

    function enforceProblemComparisonLayout(grid) {
        if (!grid) return;
        try {
            grid.setAttribute("data-nomad-problem-grid", "1");
            grid.style.setProperty("display", "grid", "important");
            grid.style.setProperty("grid-template-columns", "1fr 1fr", "important");
            var i;
            for (i = 0; i < grid.children.length; i++) {
                var col = grid.children[i];
                if (!col || col.style === undefined) continue;
                col.style.setProperty("display", "flex", "important");
                col.style.setProperty("flex-direction", "column", "important");
                col.style.setProperty("visibility", "visible", "important");
                col.style.setProperty("opacity", "1", "important");
            }
        } catch (eEnf) {}
    }

    function nukeProblemPanelDeckMetrics(sec, grid) {
        if (!sec) return;
        var list = sec.getElementsByTagName("div");
        var i;
        var snap = [];
        for (i = 0; i < list.length; i++) snap.push(list[i]);
        for (i = 0; i < snap.length; i++) {
            if (isProblemGridColumnShell(snap[i], grid)) continue;
            var st = (snap[i].getAttribute("style") || "").replace(/\s+/g, "");
            if (st.indexOf("grid-template-columns:1fr1fr1fr") !== -1) {
                try {
                    snap[i].remove();
                } catch (eNuke3) {}
            }
        }
        snap = [];
        list = sec.getElementsByTagName("div");
        for (i = 0; i < list.length; i++) snap.push(list[i]);
        var kill = [];
        for (i = 0; i < snap.length; i++) {
            var d = snap[i];
            if (isProblemGridColumnShell(d, grid)) continue;
            var st2 = d.getAttribute("style") || "";
            if (st2.indexOf("margin-top:auto") === -1) continue;
            var t = (d.textContent || "").replace(/\s+/g, " ").trim();
            if (/Satisfaction/i.test(t) && t.length < 200) kill.push(d);
            else if (/Reliability/i.test(t) && t.length < 200) kill.push(d);
        }
        for (i = 0; i < kill.length; i++) {
            try {
                kill[i].remove();
            } catch (eNukeB) {}
        }
    }

    function nukeVentureProblemStatBlocks(sec, grid) {
        if (!sec) return;
        var snap = [];
        var list = sec.getElementsByTagName("div");
        var i;
        for (i = 0; i < list.length; i++) snap.push(list[i]);
        for (i = 0; i < snap.length; i++) {
            var d = snap[i];
            if (isProblemGridColumnShell(d, grid)) continue;
            var tx = (d.textContent || "").replace(/\s+/g, " ").trim();
            if (tx.length > 120) continue;
            if (/TIME TO MARKET/i.test(tx) && /18mo/i.test(tx)) {
                try {
                    d.remove();
                } catch (eVs1) {}
                continue;
            }
            if (/DAY 1 CUSTOMERS/i.test(tx)) {
                try {
                    d.remove();
                } catch (eVs2) {}
                continue;
            }
            if (/OUTCOME/i.test(tx) && /\bdead\b/i.test(tx) && tx.length < 100) {
                try {
                    d.remove();
                } catch (eVs3) {}
                continue;
            }
            if (/survival\s+rate/i.test(tx) && tx.length < 120) {
                try {
                    d.remove();
                } catch (eVs4) {}
                continue;
            }
            if (/Defensibility/i.test(tx) && tx.length < 120) {
                try {
                    d.remove();
                } catch (eVs5) {}
            }
        }
    }

    function getProblemPanelColumnsFallback(sec) {
        var leftCol = null;
        var rightCol = null;
        var cand;
        var red = sec.querySelector('span[style*="#ff6b6b"]');
        if (red && red.parentElement && red.parentElement.parentElement) {
            cand = red.parentElement.parentElement;
            var cta = cand.textContent || "";
            if (
                cta.indexOf("Bill by the hour") !== -1 ||
                cta.indexOf("Built By Someone Who Guessed") !== -1 ||
                cta.indexOf("THE OUTSIDER BET") !== -1 ||
                (cta.indexOf("\u2715") !== -1 && cta.indexOf("wrong problem") !== -1)
            )
                leftCol = cand;
        }
        if (!leftCol) {
            leftCol = sec.querySelector('div[style*="border-right:1px solid #2a2a2a"]');
        }
        if (!leftCol && red) {
            cand = red;
            var u;
            for (u = 0; u < 14 && cand; u++) {
                cand = cand.parentElement;
                if (!cand || cand === sec) break;
                var tx = cand.textContent || "";
                if (
                    (tx.indexOf("THE AGENCY WAY") !== -1 || tx.indexOf("THE OUTSIDER BET") !== -1) &&
                    (tx.indexOf("Bill by the hour") !== -1 ||
                        tx.indexOf("Built By Someone Who Guessed") !== -1 ||
                        tx.indexOf("wrong problem") !== -1 ||
                        tx.indexOf("Scope grows") !== -1)
                ) {
                    leftCol = cand;
                    break;
                }
            }
        }
        var grn =
            sec.querySelector('span[style*="#c8ff00"]') ||
            sec.querySelector('span[style*="rgb(200, 255, 0)"]');
        if (grn && grn.parentElement && grn.parentElement.parentElement) {
            cand = grn.parentElement.parentElement;
            var ctb = cand.textContent || "";
            if (
                ctb.indexOf("Flat fee") !== -1 ||
                ctb.indexOf("Built By Someone Who Knew") !== -1 ||
                ctb.indexOf("THE INSIDER BLUEPRINT") !== -1
            )
                rightCol = cand;
        }
        if (!rightCol && leftCol && leftCol.nextElementSibling) {
            cand = leftCol.nextElementSibling;
            var ctc = cand.textContent || "";
            if (ctc.indexOf("THE NOMAD WAY") !== -1 || ctc.indexOf("THE INSIDER BLUEPRINT") !== -1)
                rightCol = cand;
        }
        if (!rightCol && grn) {
            cand = grn;
            for (var v = 0; v < 14 && cand; v++) {
                cand = cand.parentElement;
                if (!cand || cand === sec) break;
                var ty = cand.textContent || "";
                if (
                    (ty.indexOf("THE NOMAD WAY") !== -1 || ty.indexOf("THE INSIDER BLUEPRINT") !== -1) &&
                    (ty.indexOf("Flat fee") !== -1 ||
                        ty.indexOf("Built By Someone Who Knew") !== -1 ||
                        ty.indexOf("domain expertise") !== -1 ||
                        ty.indexOf("shared equity") !== -1)
                ) {
                    rightCol = cand;
                    break;
                }
            }
        }
        return { left: leftCol, right: rightCol };
    }

    function getProblemPanelColumns(sec) {
        var grid = findProblemTwoColumnGrid(sec);
        if (grid) return assignColumnsFromGrid(grid);
        return getProblemPanelColumnsFallback(sec);
    }

    function resolveProblemComparisonWrap(sec) {
        var grid = findProblemTwoColumnGrid(sec);
        if (grid && grid.parentElement) return grid.parentElement;
        var cols = getProblemPanelColumns(sec);
        if (cols.left && cols.left.parentElement) return cols.left.parentElement;
        return (
            sec.querySelector('.framer-12rkaoe-container div[style*="max-width:720px"]') ||
            sec.querySelector('div[style*="max-width:720px"]')
        );
    }

    /** Matches Framer: ~48–64px breathing room between Section 02 headline block and the two-column card. */
    function patchProblemComparisonWrapSpacing(sec) {
        if (!sec) return;
        var wrap = resolveProblemComparisonWrap(sec);
        if (!wrap) return;
        try {
            wrap.setAttribute("data-nomad-s02-comparison-wrap", "1");
        } catch (eWrap) {}
    }

    function patchProblemLeftPanel(left) {
        if (!left) return;
        var j;
        walkTextNodes(left, function (n) {
            var v = n.nodeValue;
            if (!v) return;
            if (v.trim() === "THE OUTSIDER BET") n.nodeValue = "THE AGENCY WAY";
        });
        var subPatched = false;
        var divs = left.querySelectorAll("div");
        for (j = 0; j < divs.length; j++) {
            var d = divs[j];
            var sty = (d.getAttribute("style") || "").replace(/\s+/g, "");
            var txt = (d.textContent || "").trim();
            if (
                !subPatched &&
                (sty.indexOf("font-size:20px") !== -1 || sty.indexOf("line-height:1.25") !== -1) &&
                (txt.indexOf("Built By Someone Who Guessed") !== -1 ||
                    txt.indexOf("Bill by the hour") !== -1 ||
                    txt.indexOf("Talk in circles") !== -1)
            ) {
                d.innerHTML = PROBLEM_AGENCY_SUBHEAD_HTML;
                subPatched = true;
                break;
            }
        }
        if (!subPatched && left.children.length >= 2) {
            left.children[1].innerHTML = PROBLEM_AGENCY_SUBHEAD_HTML;
        }
        var bulletRoot = null;
        for (j = 0; j < left.children.length; j++) {
            var txl = left.children[j].textContent || "";
            if (
                txl.indexOf("\u2715") !== -1 ||
                txl.indexOf("wrong problem") !== -1 ||
                txl.indexOf("no distribution") !== -1 ||
                (txl.indexOf("runway") !== -1 && txl.indexOf("gone") !== -1) ||
                (txl.indexOf("built for the industry") !== -1 && txl.indexOf("inside it") !== -1)
            ) {
                bulletRoot = left.children[j];
                break;
            }
        }
        if (!bulletRoot) {
            for (j = 0; j < left.children.length; j++) {
                var cj = left.children[j];
                if (
                    (cj.getAttribute("style") || "").indexOf("flex-direction:column") !== -1 &&
                    cj.children.length >= 3
                ) {
                    bulletRoot = cj;
                    break;
                }
            }
        }
        if (!bulletRoot) {
            for (j = 0; j < divs.length; j++) {
                var dj = divs[j];
                var tj = dj.textContent || "";
                if (
                    tj.indexOf("wrong problem") !== -1 ||
                    tj.indexOf("no distribution") !== -1 ||
                    (tj.indexOf("runway") !== -1 && tj.indexOf("gone") !== -1) ||
                    (tj.indexOf("built for the industry") !== -1 && tj.indexOf("inside it") !== -1)
                ) {
                    var par = dj.parentElement;
                    if (par && par !== left && par.children.length >= 4) {
                        bulletRoot = par;
                        break;
                    }
                }
            }
        }
        if (!bulletRoot) return;
        var brCols = bulletRoot.children;
        var row;
        var sps;
        for (j = 0; j < brCols.length && j < PROBLEM_AGENCY_BULLETS.length; j++) {
            row = brCols[j];
            if (!row) continue;
            sps = row.querySelectorAll("span");
            if (sps.length >= 2) {
                sps[0].textContent = "\u2715";
                sps[sps.length - 1].textContent = PROBLEM_AGENCY_BULLETS[j];
            } else if (sps.length === 1) {
                sps[0].textContent = "\u2715" + PROBLEM_AGENCY_BULLETS[j];
            } else {
                row.textContent = "\u2715" + PROBLEM_AGENCY_BULLETS[j];
            }
        }
        walkTextNodes(left, function (n) {
            var v = n.nodeValue;
            if (!v || v.indexOf("not the reverse") === -1) return;
            if (/their process\s*[\u2013\u2014-]\s*not the reverse/i.test(v)) {
                n.nodeValue = v.replace(
                    /their process\s*[\u2013\u2014-]\s*not the reverse/gi,
                    "their process \u2014 not the reverse"
                );
            }
        });
    }

    function patchProblemPipelineRow(right) {
        if (!right) return;
        walkTextNodes(right, function (n) {
            var v = n.nodeValue;
            if (!v) return;
            var o = v;
            if (/domain expertise/gi.test(v)) v = v.replace(/domain expertise/gi, "your process");
            if (/\bshared equity\b/gi.test(v)) v = v.replace(/\bshared equity\b/gi, "you own it");
            if (v !== o) n.nodeValue = v;
        });
        var j;
        var pipeRows = right.querySelectorAll("div[style*='justify-content:space-between']");
        var pr;
        var chips;
        for (j = 0; j < pipeRows.length; j++) {
            pr = pipeRows[j];
            chips = pr.querySelectorAll("div[style*='white-space:nowrap']");
            if (chips.length === 3) {
                chips[0].textContent = "your process";
                chips[1].textContent = "we build";
                chips[2].textContent = "you own it";
                return;
            }
        }
    }

    function patchProblemComparisonPanels() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        var grid = findProblemTwoColumnGrid(sec);
        nukeProblemPanelDeckMetrics(sec, grid);
        nukeVentureProblemStatBlocks(sec, grid);
        enforceProblemComparisonLayout(grid);
        var cols = getProblemPanelColumns(sec);
        var left = cols.left;
        var right = cols.right;
        var j;
        if (left) {
            patchProblemLeftPanel(left);
        }
        if (right) {
            if (right.children.length >= 2) {
                right.children[1].innerHTML = PROBLEM_NOMAD_SUBHEAD_HTML;
            }
            var grids = right.querySelectorAll("div");
            var tileGrid = null;
            for (j = 0; j < grids.length; j++) {
                var gst = (grids[j].getAttribute("style") || "").replace(/\s+/g, "");
                if (gst.indexOf("grid-template-columns:1fr1fr") !== -1 && gst.indexOf("flex:1") !== -1) {
                    tileGrid = grids[j];
                    break;
                }
            }
            if (!tileGrid) {
                for (j = 0; j < grids.length; j++) {
                    if (grids[j].children.length === 4) {
                        var z = grids[j].children[0];
                        var zt = (z.textContent || "").trim();
                        if (
                            zt === "Your operations" ||
                            zt.indexOf("operations") !== -1 ||
                            zt.indexOf("Industry Tenure") !== -1 ||
                            zt.indexOf("Day 1 Pipeline") !== -1
                        ) {
                            tileGrid = grids[j];
                            break;
                        }
                    }
                }
            }
            if (tileGrid && tileGrid.children.length >= 4) {
                for (j = 0; j < 4; j++) {
                    var card = tileGrid.children[j];
                    var ch = card.children;
                    if (ch.length >= 3) {
                        ch[0].textContent = PROBLEM_NOMAD_TILES[j][0];
                        ch[1].textContent = PROBLEM_NOMAD_TILES[j][1];
                        ch[2].textContent = PROBLEM_NOMAD_TILES[j][2];
                    }
                }
            }
            patchProblemPipelineRow(right);
        }
        patchProblemComparisonWrapSpacing(sec);
    }

    function wrapHasFramerProblemComparisonTable(wrap) {
        var t = wrap.textContent || "";
        return (
            t.indexOf("Monthly retainer. You rent the work.") !== -1 &&
            t.indexOf("Adapts you to it. Fees forever.") !== -1 &&
            t.indexOf("Flat fee. You own it. Done.") !== -1
        );
    }

    function patchProblemComparisonTable() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        var wrap = resolveProblemComparisonWrap(sec);
        if (!wrap || wrap.querySelector("[data-nomad-problem-table]")) return;
        if (wrapHasFramerProblemComparisonTable(wrap)) return;
        var outer = document.createElement("div");
        outer.setAttribute("data-nomad-problem-table", "1");
        outer.style.cssText =
            "margin-top:18px;border:1px solid #2a2a2a;border-radius:10px;overflow:hidden;font-family:inherit;font-size:11px;line-height:1.45;color:#e0e0e0;";
        var rows = [
            ["Investors", "Monthly retainer. You rent the work."],
            ["Off-the-shelf", "Adapts you to it. Fees forever."],
            ["Nomad Studio", "Flat fee. You own it. Done."],
        ];
        var i;
        var r;
        var c0;
        var c1;
        for (i = 0; i < rows.length; i++) {
            r = document.createElement("div");
            r.style.cssText =
                "display:grid;grid-template-columns:1fr 1.25fr;gap:14px;padding:14px 16px;background:#111111;border-top:" +
                (i === 0 ? "none" : "1px solid #2a2a2a") +
                ";align-items:start;";
            c0 = document.createElement("div");
            c0.style.cssText =
                "color:#888;text-transform:uppercase;letter-spacing:0.06em;font-size:9px;font-family:Geist Mono, SF Mono, ui-monospace, monospace;";
            c0.textContent = rows[i][0];
            c1 = document.createElement("div");
            c1.style.cssText =
                "color:#e0e0e0;font-size:12px;font-family:Geist Mono, SF Mono, ui-monospace, monospace;";
            c1.textContent = rows[i][1];
            r.appendChild(c0);
            r.appendChild(c1);
            outer.appendChild(r);
        }
        wrap.appendChild(outer);
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

    /**
     * Framer hydration often replaces the Section 02 embed with live canvas copy *after* first paint.
     * SSR HTML can already show “THE AGENCY WAY”; the client may still flash/revert to OUTSIDER / INSIDER.
     * Re-run scrub + DOM fixes for #is-ts-1 on a stagger so we win after hydrate.
     */
    function runSection02Repair() {
        var sec = document.getElementById("is-ts-1");
        if (!sec) return;
        walkTextNodes(sec, function (node) {
            var raw = node.nodeValue;
            var next = applySanitizeToText(raw);
            if (next !== raw) node.nodeValue = next;
        });
        applySection02ProblemHeadline();
        patchSection02ProblemBody();
        patchProblemComparisonPanels();
        patchProblemComparisonTable();
    }

    function scheduleSection02PostHydrateRepair() {
        var delays = [120, 400, 900, 2000, 4500, 9000];
        var i;
        for (i = 0; i < delays.length; i++) {
            setTimeout(runSection02Repair, delays[i]);
        }
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
        scheduleSection02PostHydrateRepair();

        var root = document.getElementById("main");
        if (root && typeof MutationObserver !== "undefined") {
            var t;
            var obs = new MutationObserver(function () {
                clearTimeout(t);
                t = setTimeout(function () {
                    applyDarkTokens();
                    scrubDocument();
                    runSection02Repair();
                    onMaybeCalOverlay();
                }, 120);
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
                runSection02Repair();
                onMaybeCalOverlay();
            }, ms);
        });

        window.addEventListener("load", function () {
            setTimeout(runSection02Repair, 50);
            setTimeout(runSection02Repair, 600);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
