(function () {
    var META = {
        title: "Nomad Studio | Operations & Automation",
        description:
            "we figure out why your team is stuck doing manual work, and we build the exact tools to fix it. no subscriptions. no bloated tech. just systems that work.",
    };

    var LEGACY_MONOGRAM = ["\u005bAG\u005d", "\u005bag\u005d"];
    var BRAND_TO = "[nomad]";

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
        ["we partner with industry leaders to co-build AI-native products.", "we figure out why your team is stuck doing manual work, and we build the exact tools to fix it. "],
        ["You Know The Industry. We Build The Product.", "You run the business. We build the systems."],
        ["Every day you wait, You get more replaceable", "Every day you wait, bad processes cost you money."],
        ["we don't take every deal. most don't make it through.", "we only take projects where we can actually make an impact."],
        ["a problem worth solving and people who'd pay for it", "you want to focus on your business, not your IT."],
        ["the domain expert knows what needs to exist.", "Forces you to change how you work."],
        ["ready to commit as a co-builder", "If we can help, we charge 20% to start and 80% when it's done. Zero risk."],
        ["we're not looking for first-time entrepreneurs.", "we aren't looking for tech startups."],
        ["real relationships others don't have", "you want tools that work for you, not against you."],
        ["10+ years inside one vertical", "you want flat-fee results, not hourly billing."],
        ["one model. one partner. built from the inside.", "zero bs. flat fee. smooth operations."],
        ["Outsiders Guess. Insiders Build.", "Off-the-shelf Software"],
        ["Not Founders. Industry Leaders.", "Established SMEs."],
        ["You know the industry. We build the product.", "if custom tech can fix your bottleneck, we build it. if a simple spreadsheet works better, we'll tell you."],
        ["WE DON'T WRITE CHECKS. WE CO-BUILD.", "The Agency Way"],
        ["03 / WHO WE PARTNER WITH", "03 / WHO WE HELP"],
        ["CO-BUILD A VENTURE", "LET'S TALK"],
        ["AI VENTURE STUDIO", "OPERATIONS & AUTOMATION"],
        ["Build to spec and leave", "Pay once. Own the result."],
        ["Write checks and wait", "Adapts to your exact business."],
        ["Co-Build a Venture.", "We start with a conversation."],
        ["what does the JV structure look like?", "how does the pricing actually work?"],
        ["what industries do you focus on?", "do you only do IT or accounting?"],
        ["what makes a strong domain partner?", "how long does it take?"],
        ["do the ventures take outside investment?", "how do we start?"],
        ["01 / HOW IT WORKS", "01 / HOW WE WORK"],
        ["02 / THE THESIS", "02 / THE PROBLEM"],
        ["how is equity split?", "what if we don't need custom tech?"],
        ["You can hire developers anywhere.", "You can hire IT consultants anywhere."],
        ["Dev Shops", "The Nomad Way"],
        ["Investors", "Custom Systems"],
        ["One Model.", "Not Everything Needs Software."],
        ["Skin in the game", "Flat fee. 20% upfront. 80% on delivery."],
    ];
    FRAMER_VENTURE_SCRUB.sort(function (a, b) {
        return (b[0] || "").length - (a[0] || "").length;
    });

    function scrubFramerInjectedVentureCopyInString(s) {
        var out = s;
        for (var i = 0; i < FRAMER_VENTURE_SCRUB.length; i++) {
            var oldS = FRAMER_VENTURE_SCRUB[i][0];
            var newS = FRAMER_VENTURE_SCRUB[i][1];
            if (oldS && newS && out.indexOf(oldS) !== -1) {
                out = out.split(oldS).join(newS);
            }
        }
        return out;
    }

    function scrubLegacySitesAndEmail(s) {
        var out = s;
        out = out.replace(/04 \/ FAQs{2,}/g, "04 / FAQs");
        out = out.replace(/team@antigamble\.(co|vc)/gi, "team@nomadstudio.ca");
        out = out.replace(/mailto:\s*team@antigamble\.(co|vc)/gi, "mailto:team@nomadstudio.ca");
        out = out.replace(/https?:\/\/(www\.)?antigamble\.(co|vc)\/?/gi, "https://nomadstudio.ca/");
        out = out.replace(/\bantigamble\.(co|vc)\b/gi, "nomadstudio.ca");
        out = out.replace(/\bnomadstudio\.co\b/gi, "nomadstudio.ca");
        out = out.replace(/\bAnti\s*Gamble\b/gi, "Nomad Studio");
        out = out.replace(/\bAntiGamble\b/g, "Nomad Studio");
        out = out.replace(/\bANTI\s*GAMBLE\b/g, "NOMAD STUDIO");
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
            var nh = h
                .replace(/team@antigamble\.(co|vc)/gi, "team@nomadstudio.ca")
                .replace(/mailto:\s*team@antigamble\.(co|vc)/gi, "mailto:team@nomadstudio.ca")
                .replace(/https?:\/\/(www\.)?antigamble\.(co|vc)\/?/gi, "https://nomadstudio.ca/")
                .replace(/nomadstudio\.co/gi, "nomadstudio.ca");
            if (nh !== h) a.setAttribute("href", nh);
        });
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

    function scrubDocument() {
        walkTextNodes(document.body, function (node) {
            var raw = node.nodeValue;
            var next = applySanitizeToText(raw);
            if (next !== raw) node.nodeValue = next;
        });
        fixLegacyAttributes();
        applyMeta();
    }

    function init() {
        try {
            localStorage.removeItem("nomadStudioLang");
        } catch (e) {}

        scrubDocument();

        var root = document.getElementById("main");
        if (root && typeof MutationObserver !== "undefined") {
            var t;
            var obs = new MutationObserver(function () {
                clearTimeout(t);
                t = setTimeout(scrubDocument, 80);
            });
            obs.observe(root, { childList: true, subtree: true, characterData: true });
        }

        [500, 1500, 3000].forEach(function (ms) {
            setTimeout(scrubDocument, ms);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
