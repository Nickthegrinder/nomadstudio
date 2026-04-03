import os

html_content = """<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1920, initial-scale=1.0">
    <title>Artificial Capital - Final Deck</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /*
         * VC Deck Visual System Overrides (with original Theme colors)
         * 12-Column Grid, Strict Hierarchy, Cards
         */
        :root {
            /* These align with original styles.css to force usage */
            --margin-x: 80px;
            --margin-block-start: 80px;
            --margin-block-end: 60px;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-light); /* Fallback */
            color: var(--text-dark); /* Fallback */
        }

        /* Essential Slide Layout Setup */
        .slide {
            padding: var(--margin-block-start) var(--margin-x) var(--margin-block-end) var(--margin-x) !important;
            justify-content: flex-start;
            height: 1080px; /* strict dimensions for PDF */
        }
        
        .dark-theme, .light-theme {
            height: 1080px;
        }

        /* Typography Hierarchy */
        h1.headline {
            font-size: 60px !important;
            font-weight: 700 !important;
            margin-bottom: 40px !important;
        }

        h2.subhead {
            font-size: 28px !important;
            font-weight: 500 !important;
            margin-bottom: 20px !important;
        }

        .small-text {
            font-size: 14px !important;
        }

        .huge-stat {
            font-size: 42px !important;
            font-weight: 700 !important;
            margin-top: 0 !important;
            margin-bottom: 8px !important;
        }

        /* Subtle Dividers */
        .divider-thin {
            width: 100%;
            height: 1px;
            margin-top: 24px;
            margin-bottom: 24px;
        }
        
        .light-theme .divider-thin { background-color: var(--card-light-border); }
        .dark-theme .divider-thin { background-color: var(--card-dark-border); }
        
        .divider-vertical {
            width: 1px;
            height: 100%;
        }

        .light-theme .divider-vertical { background-color: var(--card-light-border); }
        .dark-theme .divider-vertical { background-color: var(--card-dark-border); }

        /* Icons */
        .lucide {
            stroke-width: 2.5; /* Made solid/impactful */
            width: 48px;
            height: 48px;
            margin-bottom: 24px;
        }
        
        .dark-theme .lucide { stroke: var(--text-white) !important; }
        .light-theme .lucide { stroke: var(--text-dark) !important; }
        
        /* Colored Icons */
        .lucide-teal {
            stroke: var(--accent-teal) !important;
        }

        /* 12 Column Grid Container */
        .grid-container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 40px;
            width: 100%;
        }

        /* Reduced height cards, auto sizing to fit content */
        .card {
            border-radius: 8px !important;
            padding: 32px !important;
            border: 1px solid transparent !important;
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            height: fit-content !important; /* Forces reduction of card height to fit content */
        }

        /* Specific Layout Utilities */
        .col-span-12 { grid-column: span 12; }
        .col-span-6 { grid-column: span 6; }
        .col-span-4 { grid-column: span 4; }
        .col-span-3 { grid-column: span 3; }
        .col-span-5 { grid-column: span 5; }
        .col-span-2 { grid-column: span 2; }

        .centered-statement {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }

        .bottom-line-left {
            position: absolute;
            bottom: var(--margin-block-end) !important;
            left: var(--margin-x) !important;
            font-weight: 500 !important;
            font-size: 18px !important;
            right: var(--margin-x) !important; /* Allow spanning */
        }

        .avatar-img {
            width: 120px !important;
            height: 120px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            margin-bottom: 24px !important;
        }

        ul { padding-left: 20px; margin-bottom: 0; }
        li { margin-bottom: 12px; }

        /* Chart visuals */
        .stacked-bar-container {
            display: flex;
            height: 80px;
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 40px;
        }
        
        .timeline-container-horizontal {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            position: relative;
            margin-top: 100px;
        }
        
        .timeline-line-horizontal {
            position: absolute;
            top: 24px;
            left: 0;
            right: 0;
            height: 2px;
            z-index: 1;
        }
        
        .light-theme .timeline-line-horizontal { background-color: var(--card-light-border); }
        .dark-theme .timeline-line-horizontal { background-color: var(--card-dark-border); }
        
        .timeline-node {
            position: relative;
            z-index: 2;
            padding: 0 16px;
            text-align: center;
            width: 250px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .light-theme .timeline-node { background: var(--bg-light); }
        .dark-theme .timeline-node { background: var(--bg-dark); }
        
        .process-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Un-hiding the slide footers and increasing font sizes per instructions */
        .slide-footer { 
            position: absolute;
            bottom: 32px;
            left: var(--margin-x);
            right: var(--margin-x);
            display: flex;
            justify-content: space-between;
            font-size: 12px !important; /* >10pt requested */
            font-weight: 500;
        }
        
        .dark-theme .slide-footer { color: #4B5563; }
        .light-theme .slide-footer { color: #9CA3AF; }

        .pie-chart {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background: conic-gradient(var(--accent-teal) 0% 70%, white 70% 100%);
            margin: 0 auto;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .pie-chart::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            height: 65%;
            border-radius: 50%;
            background-color: #000000;
            z-index: 0;
        }

        /* Team Logo Overrides */
        .team-logo {
            height: 24px;
            object-fit: contain;
            filter: grayscale(100%);
            opacity: 0.6;
            margin-top: 16px;
        }
        
        /* Logo wordmark for Cover/Contact */
        .wordmark {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: -0.02em;
            display: flex;
            align-items: center;
            margin-bottom: 16px;
        }
        .wordmark-circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: var(--accent-teal);
            margin-right: 12px;
        }
        
        /* New Table Styling */
        .status-green { color: #10B981; font-weight: 600; }
        .status-yellow { color: #F59E0B; font-weight: 600; }
        .status-blue { color: #3B82F6; font-weight: 600; }
        .status-purple { color: #8B5CF6; font-weight: 600; }

        .system-diagram {
            display: flex;
            align-items: stretch;
            justify-content: center;
            height: 400px;
            gap: 20px;
        }
        .system-node {
            flex: 1;
            padding: 32px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        .dark-theme .system-node { background: var(--card-dark-border); }
    </style>
</head>

<body>
    <div class="slide-container" id="slider">

        <!-- 01 Cover (DARK) -->
        <section class="slide dark-theme" style="padding-top: 260px;">
            <div style="text-align: center;">
                <h1 style="font-size: 140px; font-weight: 800; margin-bottom: 0; letter-spacing: -3px; color: white; line-height: 1;">Artificial Capital</h1>
                <div style="width: 200px; height: 4px; background-color: var(--accent-teal); margin: 40px auto;"></div>
                <p style="font-size: 32px; font-weight: 500; color: var(--text-grey); margin-bottom: 24px;">Demand-Engineered Software Studio</p>
                <p style="font-size: 22px; font-weight: 600; color: var(--accent-teal); text-transform: uppercase; letter-spacing: 4px;">Fund I</p>
            </div>
            
            <div style="position: absolute; bottom: 40px; left: 0; right: 0; text-align: center; color: var(--text-grey); font-size: 14px;">
                Confidential &amp; Proprietary &nbsp; | &nbsp; 2026
            </div>
        </section>

        <!-- Disclosures Moved to End -->

        <!-- 03 Team (LIGHT) -->
        <section class="slide light-theme" style="justify-content: center; padding-top: 60px;">
            <h1 class="headline" style="text-align: center; margin-bottom: 60px;">Team</h1>
            <div class="grid-container" style="align-items: stretch;">
                
                <div class="col-span-4 card" style="display: flex; flex-direction: column;">
                    <div style="text-align: center;">
                        <img src="nick_photo.png" class="avatar-img" alt="Nick Nihezagire">
                        <h2 class="subhead" style="margin-bottom: 4px;">Nick Nihezagire</h2>
                        <p style="color: var(--text-grey); margin-bottom: 0;">Managing Partner</p>
                        <i data-lucide="linkedin" style="width: 20px; height: 20px; margin-top: 8px; margin-bottom: 0; stroke: var(--accent-teal);"></i>
                    </div>
                    <div class="divider-thin"></div>
                    <ul style="margin-bottom: 0;">
                        <li>PwC M&A financial diligence</li>
                        <li>Credit underwriting at Investissement Québec</li>
                        <li>Evaluated hundreds of SMB financials</li>
                        <li>Downside-first capital allocation</li>
                    </ul>
                </div>
                
                <div class="col-span-4 card" style="display: flex; flex-direction: column;">
                    <div style="text-align: center;">
                        <img src="espoir_photo.png" class="avatar-img" alt="Espoir" style="object-fit: cover;">
                        <!-- Renamed to Espoir B. per instructions -->
                        <h2 class="subhead" style="margin-bottom: 4px;">Espoir B.</h2>
                        <p style="color: var(--text-grey); margin-bottom: 0;">Co-Founder & Operating Partner</p>
                        <i data-lucide="linkedin" style="width: 20px; height: 20px; margin-top: 8px; margin-bottom: 0; stroke: var(--accent-teal);"></i>
                    </div>
                    <div class="divider-thin"></div>
                    <ul style="margin-bottom: 0;">
                        <li>Built multiple ventures from zero</li>
                        <li>Product launch and execution</li>
                        <li>Operates under capital constraints</li>
                        <li>Leads product build and deployment</li>
                    </ul>
                </div>
                
                <div class="col-span-4 card" style="display: flex; flex-direction: column;">
                    <div style="text-align: center;">
                        <img src="raph_photo.png" class="avatar-img" alt="Raphael Tremblay-Bouchard">
                        <h2 class="subhead" style="margin-bottom: 4px;">Raphael Tremblay-Bouchard</h2>
                        <p style="color: var(--text-grey); margin-bottom: 0;">Venture Partner</p>
                        <i data-lucide="linkedin" style="width: 20px; height: 20px; margin-top: 8px; margin-bottom: 0; stroke: var(--accent-teal);"></i>
                    </div>
                    <div class="divider-thin"></div>
                    <ul>
                        <li>Founder of Farmzz B2B SaaS</li>
                        <li>Product development and GTM strategy</li>
                        <li>Experience serving non-technical SMBs</li>
                        <li>Focus on niche SaaS markets</li>
                    </ul>
                </div>
                
            </div>
            
            <div style="position: absolute; bottom: 80px; left: 0; right: 0; background-color: #F5F5F5; height: 110px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0 40px;">
                <p style="font-size: 16pt; color: #000000; font-weight: 800; margin-bottom: 16px; margin-top: 0;">A team trusted by world-class organizations</p>
                <div style="display: flex; justify-content: space-evenly; align-items: center; width: 100%; max-width: 1200px;">
                    <img src="pwc.png" style="height: 40px; filter: grayscale(100%);" alt="PwC">
                    <img src="investquebec.png" style="height: 40px; filter: grayscale(100%);" alt="Investissement Quebec">
                    <img src="capgemini.png" style="height: 40px; filter: grayscale(100%);" alt="Capgemini">
                    <img src="divertissementai.png" style="height: 40px; filter: grayscale(100%);" alt="DivertissementAI">
                    <img src="farmzz.png" style="height: 40px; filter: grayscale(100%);" alt="Farmzz">
                    <img src="belton.png" style="height: 40px; filter: grayscale(100%);" alt="Belton">
                </div>
            </div>
            
            <div class="slide-footer" style="z-index: 10;">
                <span style="color: var(--text-dark);">artificial capital.</span>
                <span style="color: var(--text-dark);">02</span>
            </div>
        </section>

        <!-- 04 Why This Team Has an Edge (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">Why This Team Has an Edge</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="shield-check" style="fill: transparent; width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Capital Discipline</h2>
                    <ul style="text-align: left; margin-top: auto;">
                        <li style="font-size: 20px;">Credit underwriting background</li>
                        <li style="font-size: 20px;">Downside-first thinking</li>
                        <li style="font-size: 20px;">Disciplined capital deployment</li>
                    </ul>
                </div>
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="hammer" style="fill: transparent; width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Product Execution</h2>
                    <ul style="text-align: left; margin-top: auto;">
                        <li style="font-size: 20px;">Bootstrapped product builders</li>
                        <li style="font-size: 20px;">Rapid product deployment</li>
                        <li style="font-size: 20px;">Capital-efficient development</li>
                    </ul>
                </div>
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="scan-search" style="fill: transparent; width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Demand Discovery</h2>
                    <ul style="text-align: left; margin-top: auto;">
                        <li style="font-size: 20px;">Structured operator interviews</li>
                        <li style="font-size: 20px;">Creator partnerships</li>
                        <li style="font-size: 20px;">Presale validation</li>
                    </ul>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">This combination creates a repeatable system for discovering and monetizing demand.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">03</span>
            </div>
        </section>

        <!-- 05 The New Reality of Software (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">The New Reality of Software</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="cpu" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">AI-Assisted Development</h2>
                    <p style="margin-top: auto; color: var(--text-grey); font-size: 20px; line-height: 1.6;">MVP build costs range from $15k to $40k. Small, agile teams are now successfully replacing large engineering units.</p>
                </div>
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="zap" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Speed of Iteration</h2>
                    <p style="margin-top: auto; color: var(--text-grey); font-size: 20px; line-height: 1.6;">Products are launched in weeks, not months. Failed ideas are killed quickly, preserving capital.</p>
                </div>
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="network" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Fragmented Distribution</h2>
                    <p style="margin-top: auto; color: var(--text-grey); font-size: 20px; line-height: 1.6;">Niche communities are replacing mass marketing. Creators are becoming primary distribution channels.</p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Because code is commoditized, successful software investing is no longer about technology risk&mdash;it's entirely about distribution risk.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">04</span>
            </div>
        </section>

        <!-- 06 Problem with Venture (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Traditional Venture vs. New Reality</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                
                <div class="col-span-5 card" style="background-color: #8B1A1A !important; padding: 60px 48px; border-radius: 0; min-height: 440px; display: flex; flex-direction: column;">
                    <i data-lucide="flame" style="stroke: white !important; width: 64px; height: 64px; margin-bottom: 32px;"></i>
                    <h2 class="subhead" style="font-size: 36px; color: white !important;">Traditional Venture</h2>
                    <div style="width: 100%; height: 1px; background-color: rgba(255,255,255,0.3); margin: 24px 0;"></div>
                    <ul style="color: white; margin-top: auto; font-size: 22px;">
                        <li style="margin-bottom: 20px;">High capital requirements</li>
                        <li style="margin-bottom: 20px;">Growth emphasized before revenue</li>
                        <li>Heavy power-law dependency</li>
                    </ul>
                </div>
                
                <div class="col-span-2" style="display: flex; justify-content: center; align-items: center;">
                    <i data-lucide="arrow-right" style="stroke: var(--text-grey) !important; width: 64px; height: 64px;"></i>
                </div>

                <div class="col-span-5 card" style="background-color: var(--accent-teal) !important; padding: 60px 48px; border-radius: 0; min-height: 440px; display: flex; flex-direction: column;">
                    <i data-lucide="settings" style="stroke: white !important; width: 64px; height: 64px; margin-bottom: 32px;"></i>
                    <h2 class="subhead" style="font-size: 36px; color: white !important;">New Reality</h2>
                    <div style="width: 100%; height: 1px; background-color: rgba(255,255,255,0.3); margin: 24px 0;"></div>
                    <ul style="color: white; margin-top: auto; font-size: 22px;">
                        <li style="margin-bottom: 20px;">Software is cheaper than ever</li>
                        <li style="margin-bottom: 20px;">Faster experimentation is possible</li>
                        <li>Smaller lean teams can win</li>
                    </ul>
                </div>

            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Capital-intensive venture models become inefficient when software becomes cheap.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">05</span>
            </div>
        </section>

        <!-- (Divider 1 Removed per instructions) -->

        <!-- 07 Our Thesis System Diagram (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">Our Investment Thesis</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            
            <div class="system-diagram" style="flex: 1; align-items: stretch;">
                <div class="system-node card" style="text-align: center; padding: 48px 32px; border-radius: 0; width: 320px; min-height: 380px; display: flex; flex-direction: column;">
                    <i data-lucide="search" class="lucide-teal" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Demand Engineering</h2>
                    <p style="color: var(--text-grey); font-size: 20px; margin-top: auto;">Identify monetizable niches and validate willingness to pay before building.</p>
                </div>
                
                <div style="display: flex; align-items: center;">
                    <i data-lucide="arrow-right" style="stroke: var(--accent-teal) !important; width: 48px; height: 48px;"></i>
                </div>
                
                <div class="system-node card" style="text-align: center; padding: 48px 32px; border-radius: 0; width: 320px; min-height: 380px; display: flex; flex-direction: column;">
                    <i data-lucide="megaphone" class="lucide-teal" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Creator Distribution</h2>
                    <p style="color: var(--text-grey); font-size: 20px; margin-top: auto;">Leverage trusted audiences for zero-CAC product launches.</p>
                </div>
                
                <div style="display: flex; align-items: center;">
                    <i data-lucide="arrow-right" style="stroke: var(--accent-teal) !important; width: 48px; height: 48px;"></i>
                </div>
                
                 <div class="system-node card" style="text-align: center; padding: 48px 32px; border-radius: 0; width: 320px; min-height: 380px; display: flex; flex-direction: column;">
                    <i data-lucide="calculator" class="lucide-teal" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <h2 class="subhead">Capital Discipline</h2>
                    <p style="color: var(--text-grey); font-size: 20px; margin-top: auto;">Run cheap experiments and enact fast shutdowns of failures.</p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Returns are the by-product of a repeatable demand discovery engine.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">06</span>
            </div>
        </section>

        <!-- 08 Compounding Trust Thesis (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">The Compounding Trust Thesis</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                <div class="col-span-4 card" style="background-color: #000000 !important; padding: 60px 40px; border-radius: 0; display: flex; flex-direction: column; justify-content: center; min-height: 440px;">
                    <p style="font-size: 32px; line-height: 1.4; font-weight: 700; color: white; margin: 0;">Most apps are built for growth. We build for a finite life.</p>
                </div>
                <div class="col-span-4 card" style="background-color: #0D1B2A !important; padding: 60px 40px; border-radius: 0; display: flex; flex-direction: column; justify-content: center; min-height: 440px;">
                    <p style="font-size: 32px; line-height: 1.4; font-weight: 700; color: white; margin: 0;">Every asset is designed to be self-sustaining within 3&ndash;6 months.</p>
                </div>
                <div class="col-span-4 card" style="background-color: var(--accent-teal) !important; padding: 60px 40px; border-radius: 0; display: flex; flex-direction: column; justify-content: center; min-height: 440px;">
                    <p style="font-size: 32px; line-height: 1.4; font-weight: 700; color: white; margin: 0;">Our real moat is the trust we build with every interaction. That compounds forever.</p>
                </div>
            </div>
            
            <div class="slide-footer">
                <span>artificial capital.</span>
                <span>07</span>
            </div>
        </section>

        <!-- 08 Traction / Farmzz (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Traction: Farmzz</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            <div style="max-width: 1400px; margin: 0 auto;">
                <p style="font-size: 22px; line-height: 1.6; margin-bottom: 48px;">Farmzz is a B2B SaaS platform for modern farming operations, built by Venture Partner Raphael Tremblay-Bouchard. This asset proves our ability to identify niches, build vertical solutions, and capture revenue without venture capital.</p>
            </div>
            <div class="grid-container" style="flex: 1; align-items: stretch; max-width: 1400px; margin: 0 auto;">
                
                <div class="col-span-4 card" style="background-color: var(--text-dark) !important; text-align: center; padding: 60px 32px; display: flex; flex-direction: column; justify-content: center; min-height: 300px;">
                    <i data-lucide="users" style="stroke: var(--accent-teal) !important; width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="huge-stat" style="color: white !important; font-size: 72px;">50+</h2>
                    <p style="color: var(--text-grey) !important; font-size: 22px; font-weight: 500;">Paying enterprise customers</p>
                </div>
                
                <div class="col-span-4 card" style="background-color: #0D1B2A !important; text-align: center; padding: 60px 32px; display: flex; flex-direction: column; justify-content: center; min-height: 300px;">
                    <i data-lucide="line-chart" class="lucide-teal" style="width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="huge-stat" style="color: white !important; font-size: 72px;">15%</h2>
                    <p style="color: var(--text-grey) !important; font-size: 22px; font-weight: 500;">Month-over-month growth</p>
                </div>
                
                <div class="col-span-4 card" style="background-color: var(--accent-teal) !important; text-align: center; padding: 60px 32px; display: flex; flex-direction: column; justify-content: center; min-height: 300px;">
                    <i data-lucide="banknote" style="stroke: white !important; width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="color: white !important; font-size: 36px; line-height: 1.2; margin-top: 16px; margin-bottom: 16px;">Bootstrapped to Profitability</h2>
                    <p style="color: #E2E8F0 !important; font-size: 20px; margin-bottom: 0;">Built entirely on customer revenue.</p>
                </div>
            </div>
            
            <div class="slide-footer">
                <span>artificial capital.</span>
                <span>08</span>
            </div>
        </section>

        <!-- 09 Pipeline (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Active Pipeline</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            <div style="width: 100%; max-width: 1700px; margin: 40px auto 0 auto;">
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="font-size: 18px; width: 15%;">Stage</th>
                            <th style="font-size: 18px; width: 35%;">Opportunity</th>
                            <th style="font-size: 18px; width: 15%;">Vertical</th>
                            <th style="font-size: 18px; width: 10%;">Target Close</th>
                            <th style="font-size: 18px; width: 10%;">Est. Y1 Rev</th>
                            <th style="font-size: 18px; width: 15%;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="font-weight: 600; font-size: 18px;">Operating & Growth</td>
                            <td style="font-size: 18px;"><strong>Farmzz</strong> &mdash; B2B SaaS platform for modern farming operations. 50+ paying customers. Bootstrapped to profitability.</td>
                            <td style="font-size: 18px;">AgriTech / B2B SaaS</td>
                            <td style="font-size: 18px;">Live</td>
                            <td style="font-size: 18px;">$120k</td>
                            <td style="font-size: 18px; font-weight: 700; color: var(--accent-teal);">Revenue Generating</td>
                        </tr>
                        <tr>
                            <td style="font-weight: 600; font-size: 18px;">Demand Engineering</td>
                            <td style="font-size: 18px;"><strong>Selah</strong> &mdash; AI-powered bookkeeping built for skilled trades and blue-collar operators.</td>
                            <td style="font-size: 18px;">Fintech / Trades</td>
                            <td style="font-size: 18px;">Q2 2026</td>
                            <td style="font-size: 18px;">$150k</td>
                            <td style="font-size: 18px; font-weight: 700; color: var(--accent-teal);">Active Build</td>
                        </tr>
                        <tr>
                            <td style="font-weight: 600; font-size: 18px;">Demand Engineering</td>
                            <td style="font-size: 18px;"><strong>Alarmy 2.0</strong> &mdash; A premium, AI-native alarm and sleep wellness app. Acquisition of Alarmy mobile app under evaluation.</td>
                            <td style="font-size: 18px;">Health / Utilities</td>
                            <td style="font-size: 18px;">Q3 2026</td>
                            <td style="font-size: 18px;">$250k</td>
                            <td style="font-size: 18px; font-weight: 700; color: var(--accent-teal);">LOI in Progress</td>
                        </tr>
                        <tr>
                            <td style="font-weight: 600; font-size: 18px;">Discovery & Validation</td>
                            <td style="font-size: 18px;"><strong>Niche Social Scheduler</strong> &mdash; A content planning and scheduling tool built specifically for TikTok and short-form creators.</td>
                            <td style="font-size: 18px;">MarTech / Creator</td>
                            <td style="font-size: 18px;">Q4 2026</td>
                            <td style="font-size: 18px;">TBD</td>
                            <td style="font-size: 18px; font-weight: 600; color: var(--text-grey);">40+ Interviews Run</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">The pipeline focuses Exclusively on fast-path-to-revenue micro-SaaS opportunities.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">09</span>
            </div>
        </section>

        <!-- (Divider 2 Removed per instructions) -->

        <!-- 10 Validation Before Build (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">Validation Before Build</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex: 1; padding: 0 40px; align-items: center;">
                
                <div style="text-align: center; width: 320px;">
                    <div style="width: 140px; height: 140px; border-radius: 50%; background: var(--text-dark); border: 2px solid var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="eye" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 26px; margin-bottom: 12px;">Distribute the Idea</p>
                    <p style="font-size: 18px; color: var(--text-grey);">Post content about the problem across TikTok and Instagram. Target 100k impressions.</p>
                </div>
                
                <div class="process-arrow" style="height: 140px;"><i data-lucide="arrow-right" style="opacity: 0.3; margin: 0; width: 48px; height: 48px;"></i></div>

                <div style="text-align: center; width: 320px;">
                    <div style="width: 140px; height: 140px; border-radius: 50%; background: var(--text-dark); border: 2px solid var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="activity" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 26px; margin-bottom: 12px;">Read the Signal</p>
                    <p style="font-size: 18px; color: var(--text-grey);">Analyze intent signals, not likes. Focus on waitlist signups and hard presales.</p>
                </div>
                
                <div class="process-arrow" style="height: 140px;"><i data-lucide="arrow-right" style="opacity: 0.3; margin: 0; width: 48px; height: 48px;"></i></div>

                <div style="text-align: center; width: 320px;">
                    <div style="width: 140px; height: 140px; border-radius: 50%; background: var(--text-dark); border: 2px solid var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="hammer" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 26px; margin-bottom: 12px;">Build or Kill</p>
                    <p style="font-size: 18px; color: var(--text-grey);">If validated, build with pre-existing audience. If not, kill in days, preserve capital.</p>
                </div>

            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Building is now cheap. Distribution is the moat. We have both.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">10</span>
            </div>
        </section>

        <!-- 11 Studio Model (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Demand Engineering Studio</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex: 1; padding: 0 0px; align-items: center;">
                
                <div style="text-align: center; width: 240px;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; background: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="search" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 24px; margin-bottom: 12px;">Demand Validation</p>
                    <p style="font-size: 18px; color: var(--text-grey);">Identify niches, run interviews, and secure pre-sales to de-risk demand.</p>
                </div>
                
                <div class="process-arrow" style="height: 150px;"><i data-lucide="arrow-right" style="opacity: 0.3; margin: 0; width: 48px; height: 48px;"></i></div>

                <div style="text-align: center; width: 240px;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; background: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="hammer" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 24px; margin-bottom: 12px;">Lean Build</p>
                    <p style="font-size: 18px; color: var(--text-grey);">Capital-efficient sprints on core monetized features only.</p>
                </div>
                
                <div class="process-arrow" style="height: 150px;"><i data-lucide="arrow-right" style="opacity: 0.3; margin: 0; width: 48px; height: 48px;"></i></div>

                <div style="text-align: center; width: 240px;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; background: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="dollar-sign" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 24px; margin-bottom: 12px;">Monetized Utility</p>
                    <p style="font-size: 18px; color: var(--text-grey);">Launch to committed audience, scale MRR rapidly.</p>
                </div>

                <div class="process-arrow" style="height: 150px;"><i data-lucide="arrow-right" style="opacity: 0.3; margin: 0; width: 48px; height: 48px;"></i></div>

                <div style="text-align: center; width: 240px;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; background: var(--accent-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px auto;">
                        <i data-lucide="refresh-cw" style="margin: 0; stroke: white !important; width: 64px; height: 64px;"></i>
                    </div>
                    <p style="font-weight: 600; font-size: 24px; margin-bottom: 12px;">Reinvest Earnings</p>
                    <p style="font-size: 18px; color: var(--text-grey);">Funnel excess cash flow into new experiments or return to LPs.</p>
                </div>

            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">A structured, repeatable process that transforms validated demand into cash-flowing software assets.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">11</span>
            </div>
        </section>

        <!-- (Divider 3 Removed per instructions) -->

        <!-- 12 Portfolio Construction (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">Portfolio Construction</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                <div class="col-span-4 card" style="display: flex; flex-direction: column; justify-content: center;">
                    <i data-lucide="layers"></i>
                    <h2 class="subhead">Fund Structure</h2>
                    <ul>
                        <li><span style="font-weight: 600; color: var(--text-white);">$1M-$3M</span> target size</li>
                        <li><span style="font-weight: 600; color: var(--text-white);">8-12</span> targeted assets</li>
                        <li><span style="font-weight: 600; color: var(--text-white);">3-5</span> year hold period</li>
                    </ul>
                </div>
                
                <div class="col-span-4 card" style="align-items: center; justify-content: center;">
                    <h2 class="subhead" style="margin-bottom: 32px;">Target Allocation</h2>
                    <div class="pie-chart" style="width: 240px; height: 240px;">
                        <span style="font-size: 40px; font-weight: 700; color: white; z-index: 2; line-height: 1; margin-top: 4px;">$1M</span>
                        <span style="font-size: 16px; color: white; z-index: 2; margin-top: 4px;">Total Fund</span>
                    </div>
                    <div style="margin-top: 24px; width: 100%;">
                        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                            <div style="width: 20px; height: 20px; border-radius: 4px; background-color: var(--accent-teal); margin-right: 12px;"></div>
                            <span style="font-size: 20px; font-weight: 600; color: white;">70%</span>
                            <span style="font-size: 20px; color: var(--text-grey); margin-left: 12px;">New Builds</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center;">
                            <div style="width: 20px; height: 20px; border-radius: 4px; background-color: white; margin-right: 12px;"></div>
                            <span style="font-size: 20px; font-weight: 600; color: white;">30%</span>
                            <span style="font-size: 20px; color: var(--text-grey); margin-left: 12px;">Micro-Acquisitions</span>
                        </div>
                    </div>
                </div>
                
                <div class="col-span-4 card" style="display: flex; flex-direction: column; justify-content: center;">
                    <i data-lucide="shield"></i>
                    <h2 class="subhead">Risk Management</h2>
                    <ul>
                        <li>Hard validation gates</li>
                        <li>Capped capital exposure</li>
                        <li>Fast failures prioritized</li>
                    </ul>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Small experiments create asymmetric outcomes.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">12</span>
            </div>
        </section>

        <!-- 13 Capital Deployment Per Asset (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Capital Deployment (Per Asset)</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <div style="display: flex; height: 180px; width: 100%; overflow: hidden; margin-bottom: 48px;">
                    <div style="width: 40%; background-color: var(--text-dark); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <span style="font-size: 40px; font-weight: 700; color: white;">40%</span>
                        <span style="color: var(--text-grey); font-size: 18px; margin-top: 8px;">Product Dev</span>
                    </div>
                    <div style="width: 30%; background-color: var(--accent-teal); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <span style="font-size: 40px; font-weight: 700; color: white;">30%</span>
                        <span style="color: white; font-size: 18px; margin-top: 8px;">Infrastructure</span>
                    </div>
                    <div style="width: 30%; background-color: #0D1B2A; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                        <span style="font-size: 40px; font-weight: 700; color: white;">30%</span>
                        <span style="color: var(--text-grey); font-size: 18px; margin-top: 8px;">Go-To-Market</span>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 60px; margin-top: 24px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 24px; height: 24px; background-color: var(--text-dark);"></div>
                        <span style="font-size: 20px; color: var(--text-dark); font-weight: 500;">Product Dev &mdash; Engineering, UI/UX, AI</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 24px; height: 24px; background-color: var(--accent-teal);"></div>
                        <span style="font-size: 20px; color: var(--text-dark); font-weight: 500;">Infrastructure &mdash; Cloud, DevOps, Security</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 24px; height: 24px; background-color: #0D1B2A;"></div>
                        <span style="font-size: 20px; color: var(--text-dark); font-weight: 500;">Go-To-Market &mdash; Creators, Ads, Sales</span>
                    </div>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Capital deployed gradually across 24 months.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">13</span>
            </div>
        </section>

        <!-- 14 Unit Economics (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Unit Economics per Asset</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="hammer" class="lucide-teal" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <p class="huge-stat" style="color: var(--text-dark) !important; font-size: 72px !important;">$25k</p>
                    <h2 class="subhead" style="margin-top: 8px;">Build Cost / Capex</h2>
                    <div class="divider-thin"></div>
                    <p style="color: var(--text-dark); font-size: 20px; margin-top: auto;">Extremely low upfront risk allows rapid deployment and abandonment.</p>
                </div>
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="trending-up" class="lucide-teal" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <p class="huge-stat" style="color: var(--text-dark) !important; font-size: 72px !important;">$2k &rarr; $15k</p>
                    <h2 class="subhead" style="margin-top: 8px;">Revenue Ramp</h2>
                    <div class="divider-thin"></div>
                    <p style="color: var(--text-dark); font-size: 20px; margin-top: auto;">Expected MRR scaling within 12-18 months of launch.</p>
                </div>
                <div class="col-span-4 card" style="display: flex; flex-direction: column; text-align: center; padding: 48px 32px; min-height: 420px;">
                    <i data-lucide="percent" class="lucide-teal" style="width: 80px; height: 80px; margin: 0 auto 32px auto;"></i>
                    <p class="huge-stat" style="color: var(--text-dark) !important; font-size: 72px !important;">$5k&ndash;$10k</p>
                    <h2 class="subhead" style="margin-top: 8px;">MRR Breakeven</h2>
                    <div class="divider-thin"></div>
                    <p style="color: var(--text-dark); font-size: 20px; margin-top: auto;">Monthly recurring revenue target per asset to cover operating costs.</p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">&quot;We build for profitability, not just growth. Every asset is designed to be self-sustaining within 3&ndash;6 months.&quot;</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">14</span>
            </div>
        </section>

        <!-- 15 Portfolio Outcome (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">We Expect Failures. <span style="color: var(--accent-teal);">The Model Still Wins.</span></h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                
                <div class="col-span-4 card" style="background-color: #8B1A1A !important; color: white !important; border: none !important; padding: 60px 40px !important; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">
                    <h2 style="font-size: 32px; font-weight: 700; color: white; margin-bottom: 24px; margin-top: 0;">Failures (40%)</h2>
                    <p style="font-size: 20px; color: white; line-height: 1.5; margin-bottom: 0;">Assets that never reach breakeven. Capital capped at $15k per failure.</p>
                </div>
                
                <div class="col-span-4 card" style="background-color: #0D1B2A !important; color: white !important; border: none !important; padding: 60px 40px !important; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">
                    <h2 style="font-size: 32px; font-weight: 700; color: white; margin-bottom: 24px; margin-top: 0;">Break-Evens (40%)</h2>
                    <p style="font-size: 20px; color: white; line-height: 1.5; margin-bottom: 0;">Assets that cover their own costs but do not generate significant returns.</p>
                </div>

                <div class="col-span-4 card" style="background-color: #00A395 !important; color: white !important; border: none !important; padding: 60px 40px !important; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">
                    <h2 style="font-size: 32px; font-weight: 700; color: white; margin-bottom: 24px; margin-top: 0;">Winners (20%)</h2>
                    <p style="font-size: 20px; color: white; line-height: 1.5; margin-bottom: 0;">Assets that achieve product-market fit and generate 10x+ returns.</p>
                </div>

            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">&quot;Our model is built on the assumption that most of our experiments will not be massive successes. It works anyway.&quot;</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">15</span>
            </div>
        </section>

        <!-- 16 Creator Partnership Model (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Creator Partnership Model</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            
            <div style="display: flex; justify-content: center; align-items: stretch; flex: 1; gap: 40px; max-width: 1200px; margin: 0 auto;">
                
                <div class="card" style="width: 360px; text-align: center; padding: 40px; border: 2px solid var(--accent-teal);">
                    <i data-lucide="video" class="lucide-teal" style="width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="margin-bottom: 24px;">The Creator</h2>
                    <p style="font-size: 20px; margin-bottom: 12px; color: var(--text-dark); font-weight: 500;">Brings Niche Audience</p>
                    <p style="font-size: 20px; margin-bottom: 12px; color: var(--text-dark); font-weight: 500;">Validates Problem Space</p>
                    <p style="font-size: 20px; margin-bottom: 0; color: var(--text-dark); font-weight: 500;">Markets Product Organically</p>
                </div>

                <div style="display: flex; flex-direction: column; justify-content: center; width: 300px;">
                    <div style="display: flex; align-items: center; color: var(--text-dark); margin-bottom: 32px;">
                        <span style="font-weight: 600; font-size: 20px; margin-right: 12px;">Audience Traffic</span>
                        <i data-lucide="arrow-right" style="margin: 0; width: 40px; height: 40px;"></i>
                    </div>
                    <div style="display: flex; align-items: center; color: var(--accent-teal);">
                        <i data-lucide="arrow-left" style="margin: 0; width: 40px; height: 40px;"></i>
                        <span style="font-weight: 600; font-size: 20px; margin-left: 12px;">10-25% Equity / Rev Share</span>
                    </div>
                </div>

                <div class="card" style="width: 360px; text-align: center; padding: 40px; border: 2px solid var(--text-dark);">
                    <i data-lucide="factory" style="stroke: var(--text-dark) !important; width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="margin-bottom: 24px;">The Studio</h2>
                    <p style="font-size: 20px; margin-bottom: 12px; color: var(--text-dark); font-weight: 500;">Executes Product Build</p>
                    <p style="font-size: 20px; margin-bottom: 12px; color: var(--text-dark); font-weight: 500;">Deploys Fund Capital</p>
                    <p style="font-size: 20px; margin-bottom: 0; color: var(--text-dark); font-weight: 500;">Manages Tech Operations</p>
                </div>

            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">A symbiotic model aligning product building capabilities with embedded distribution networks.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">16</span>
            </div>
        </section>

        <!-- 17 Liquidity (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">Liquidity Pathways</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch;">
                <div class="col-span-3 card" style="display: flex; flex-direction: column; padding: 40px 28px; min-height: 380px;">
                    <i data-lucide="banknote" class="lucide-teal" style="width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="text-align: center; font-size: 24px;">Cash Yield</h2>
                    <div class="divider-thin"></div>
                    <ul style="margin-bottom: 0;">
                        <li>Quarterly capital distributions</li>
                        <li>Derived from free cash flow of yielding assets</li>
                    </ul>
                </div>
                <div class="col-span-3 card" style="display: flex; flex-direction: column; padding: 40px 28px; min-height: 380px;">
                    <i data-lucide="tag" class="lucide-teal" style="width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="text-align: center; font-size: 24px;">Asset Sales</h2>
                    <div class="divider-thin"></div>
                    <ul style="margin-bottom: 0;">
                        <li>Opportunistic spin-offs</li>
                        <li>Target valuation at 4-6x ARR</li>
                        <li>Strategic micro-PE buyers</li>
                    </ul>
                </div>
                <div class="col-span-3 card" style="display: flex; flex-direction: column; padding: 40px 28px; min-height: 380px;">
                    <i data-lucide="briefcase" class="lucide-teal" style="width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="text-align: center; font-size: 24px;">Portfolio Roll-Up</h2>
                    <div class="divider-thin"></div>
                    <ul style="margin-bottom: 0;">
                        <li>Full SaaS bundle exit</li>
                        <li>Target buyer: Strategic acquirer or major PE firm</li>
                    </ul>
                </div>
                <div class="col-span-3 card" style="display: flex; flex-direction: column; padding: 40px 28px; min-height: 380px;">
                    <i data-lucide="refresh-cw" class="lucide-teal" style="width: 64px; height: 64px; margin: 0 auto 24px auto;"></i>
                    <h2 class="subhead" style="text-align: center; font-size: 24px;">Continuation</h2>
                    <div class="divider-thin"></div>
                    <ul style="margin-bottom: 0;">
                        <li>Roll winners into Fund II</li>
                        <li>Original LPs bought out at standard NAV price</li>
                    </ul>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Multiple pathways to return capital, not dependent on unicorn exits.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">17</span>
            </div>
        </section>

        <!-- 18 Timeline (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">First 24 Months</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            
            <div class="timeline-container-horizontal" style="flex: 1;">
                <div class="timeline-line-horizontal" style="top: 80px;"></div>
                
                <div class="timeline-node" style="width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--accent-teal); border: 4px solid var(--bg-light); margin-bottom: 24px; z-index: 2; position: relative;"></div>
                    <i data-lucide="rocket" style="width: 48px; height: 48px;"></i>
                    <h2 class="subhead" style="margin-bottom: 8px;">0-6 Months</h2>
                    <ul style="text-align: left; padding-left: 16px; font-size: 16px; color: var(--text-dark);">
                        <li>Launch Selah v2.0</li>
                        <li>Close AI Bookkeeping beta</li>
                        <li>Acquire first micro-SaaS</li>
                    </ul>
                </div>

                <div class="timeline-node" style="width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--accent-teal); border: 4px solid var(--bg-light); margin-bottom: 24px; z-index: 2; position: relative;"></div>
                    <i data-lucide="trending-up" style="width: 48px; height: 48px;"></i>
                    <h2 class="subhead" style="margin-bottom: 8px;">6-12 Months</h2>
                    <ul style="text-align: left; padding-left: 16px; font-size: 16px; color: var(--text-dark);">
                        <li>First assets cross $5k MRR</li>
                        <li>Complete 2nd creator partnership</li>
                        <li>Scale infrastructure efficiency</li>
                    </ul>
                </div>

                <div class="timeline-node" style="width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--accent-teal); border: 4px solid var(--bg-light); margin-bottom: 24px; z-index: 2; position: relative;"></div>
                    <i data-lucide="check-circle" style="width: 48px; height: 48px;"></i>
                    <h2 class="subhead" style="margin-bottom: 8px;">12-18 Months</h2>
                    <ul style="text-align: left; padding-left: 16px; font-size: 16px; color: var(--text-dark);">
                        <li>Portfolio breakeven at $40K MRR</li>
                        <li>Liquidate failed experiments</li>
                    </ul>
                </div>

                <div class="timeline-node" style="width: 25%;">
                    <div style="width: 24px; height: 24px; border-radius: 50%; background: var(--accent-teal); border: 4px solid var(--bg-light); margin-bottom: 24px; z-index: 2; position: relative;"></div>
                    <i data-lucide="banknote" style="width: 48px; height: 48px;"></i>
                    <h2 class="subhead" style="margin-bottom: 8px;">18-24 Months</h2>
                    <ul style="text-align: left; padding-left: 16px; font-size: 16px; color: var(--text-dark);">
                        <li>Begin first LP cash distributions</li>
                        <li>Evaluate initial asset spin-offs</li>
                    </ul>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">Execution begins on day one of first close.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">18</span>
            </div>
        </section>

        <!-- 19 Fund Terms (DARK) -->
        <section class="slide dark-theme">
            <h1 class="headline">Fund Terms</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            <div class="grid-container" style="flex: 1; align-items: stretch; max-width: 1400px; margin: 0 auto;">
                <div class="col-span-4 card" style="text-align: center; padding: 60px 40px; min-height: 380px; display: flex; flex-direction: column; justify-content: center;">
                    <p class="huge-stat" style="color: var(--accent-teal) !important; font-size: 64px !important;">2.0%</p>
                    <h2 class="subhead" style="margin-top: 16px; color: var(--text-white) !important;">Management Fee</h2>
                    <div class="divider-thin" style="margin: 24px auto;"></div>
                    <p style="color: var(--text-grey); font-size: 18px;">Assessed annually on committed capital to fund operations.</p>
                </div>
                <div class="col-span-4 card" style="text-align: center; padding: 60px 40px; min-height: 380px; display: flex; flex-direction: column; justify-content: center;">
                    <p class="huge-stat" style="color: var(--accent-teal) !important; font-size: 64px !important;">20%</p>
                    <h2 class="subhead" style="margin-top: 16px; color: var(--text-white) !important;">Carried Interest</h2>
                    <div class="divider-thin" style="margin: 24px auto;"></div>
                    <p style="color: var(--text-grey); font-size: 18px;">Paid only on distributions above the preferred return hurdle.</p>
                </div>
                <div class="col-span-4 card" style="text-align: center; padding: 60px 40px; min-height: 380px; display: flex; flex-direction: column; justify-content: center;">
                    <p class="huge-stat" style="color: var(--accent-teal) !important; font-size: 64px !important;">8%</p>
                    <h2 class="subhead" style="margin-top: 16px; color: var(--text-white) !important;">Preferred Return</h2>
                    <div class="divider-thin" style="margin: 24px auto;"></div>
                    <p style="color: var(--text-grey); font-size: 18px;">Cumulative, non-compounding hurdle rate prioritizing LPs.</p>
                </div>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">LP-friendly terms designed to align incentives from day one.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">19</span>
            </div>
        </section>

        <!-- 20 Current Raise (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Current Raise</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 40px;"></div>
            
            <div class="grid-container" style="text-align: center; max-width: 1400px; margin: 0 auto;">
                <div class="col-span-3 card" style="padding: 32px 24px;">
                    <p class="huge-stat" style="color: var(--accent-teal) !important; font-size: 48px !important;">$250k</p>
                    <div class="divider-thin" style="width: 50%; margin: 24px auto;"></div>
                    <h2 class="subhead" style="font-size: 20px;">First Close</h2>
                    <p style="font-size: 16px; font-weight: 600; color: var(--text-grey);">Target: Q3 2026</p>
                </div>
                <div class="col-span-3 card" style="padding: 32px 24px;">
                    <p class="huge-stat" style="color: var(--accent-teal) !important; font-size: 48px !important;">$1M</p>
                    <div class="divider-thin" style="width: 50%; margin: 24px auto;"></div>
                    <h2 class="subhead" style="font-size: 20px;">Fund Target</h2>
                </div>
                <div class="col-span-3 card" style="padding: 32px 24px;">
                    <p class="huge-stat" style="color: var(--accent-teal) !important; font-size: 48px !important;">$100k</p>
                    <div class="divider-thin" style="width: 50%; margin: 24px auto;"></div>
                    <h2 class="subhead" style="font-size: 20px;">Minimum LP</h2>
                </div>
                <div class="col-span-3 card" style="padding: 32px 24px;">
                    <p class="huge-stat" style="font-size: 36px !important; color: var(--accent-teal) !important;">Immediate</p>
                    <div class="divider-thin" style="width: 50%; margin: 24px auto;"></div>
                    <h2 class="subhead" style="font-size: 20px;">Deployment</h2>
                </div>
            </div>
            
            <div style="max-width: 800px; margin: 40px auto 0 auto; padding: 48px 60px; background-color: #0D1B2A; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <h2 class="subhead" style="font-size: 24px; margin-bottom: 0; color: white;">Use of Proceeds</h2>
                    <p style="color: var(--text-grey); font-weight: 500; margin-bottom: 0;">(First Close)</p>
                </div>
                <div style="width: 2px; height: 80px; background-color: rgba(255,255,255,0.2);"></div>
                <ul style="font-size: 18px; margin-bottom: 0; color: white;">
                    <li style="margin-bottom: 8px;">Build out 2 new demand-validated assets</li>
                    <li style="margin-bottom: 8px;">Acquire 1 high-margin micro-SaaS tool</li>
                    <li style="margin-bottom: 0;">Fund 12 months of core operations</li>
                </ul>
            </div>
            
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: var(--accent-teal); padding: 32px var(--margin-x); text-align: center;">
                <p style="color: white; font-size: 22px; font-weight: 600; margin: 0;">We are raising now. First close target: Q3 2026.</p>
            </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: white !important;">artificial capital.</span>
                <span style="color: white !important;">20</span>
            </div>
        </section>

        <!-- 21 Contact (DARK) -->
        <section class="slide dark-theme">
            <h1 style="font-size: 96px; font-weight: 800; margin-bottom: 0; letter-spacing: -2px; color: white;">Artificial Capital</h1>
            <div style="width: 200px; height: 4px; background-color: var(--accent-teal); margin: 32px 0 60px 0;"></div>
            
            <div class="grid-container" style="flex: 1; justify-content: center; gap: 80px; align-items: center;">
                    <div class="col-span-4" style="text-align: center;">
                        <img src="nick_photo.png" class="avatar-img" alt="Nick Nihezagire" style="width: 120px; height: 120px; margin-bottom: 24px; border: 4px solid var(--accent-teal);">
                        <h1 class="headline" style="margin-bottom: 8px; font-size: 32px !important;">Nick Nihezagire</h1>
                        <p style="font-size: 18px; font-weight: 500; color: var(--accent-teal) !important; margin-bottom: 16px;">Managing Partner</p>
                        <p style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                            <a href="mailto:nick@artificialcapital.com" style="color: var(--text-grey); text-decoration: none;">nick@artificialcapital.com</a>
                        </p>
                        <p style="font-size: 16px; font-weight: 600;">
                            <a href="https://linkedin.com/in/nicknihezagire" style="color: var(--accent-teal); text-decoration: underline;">LinkedIn Profile</a>
                        </p>
                    </div>
                    
                    <div class="col-span-4" style="text-align: center;">
                        <img src="espoir_photo.png" class="avatar-img" alt="Espoir B." style="width: 120px; height: 120px; margin-bottom: 24px; object-fit: cover;">
                        <h1 class="headline" style="margin-bottom: 8px; font-size: 32px !important;">Espoir B.</h1>
                        <p style="font-size: 18px; font-weight: 500; color: var(--accent-teal) !important; margin-bottom: 16px;">Co-Founder & Operating Partner</p>
                        <p style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                            <a href="mailto:espoir@artificialcapital.com" style="color: var(--text-grey); text-decoration: none;">espoir@artificialcapital.com</a>
                        </p>
                        <p style="font-size: 16px; font-weight: 600;">
                            <a href="#" style="color: var(--accent-teal); text-decoration: underline;">LinkedIn Profile</a>
                        </p>
                    </div>

                    <div class="col-span-4" style="text-align: center;">
                        <img src="raph_photo.png" class="avatar-img" alt="Raphael Tremblay" style="width: 120px; height: 120px; margin-bottom: 24px;">
                        <h1 class="headline" style="margin-bottom: 8px; font-size: 32px !important;">Raphael Tremblay</h1>
                        <p style="font-size: 18px; font-weight: 500; color: var(--accent-teal) !important; margin-bottom: 16px;">Venture Partner</p>
                        <p style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                            <a href="mailto:raphael@artificialcapital.com" style="color: var(--text-grey); text-decoration: none;">raphael@artificialcapital.com</a>
                        </p>
                        <p style="font-size: 16px; font-weight: 600;">
                            <a href="#" style="color: var(--accent-teal); text-decoration: underline;">LinkedIn Profile</a>
                        </p>
                    </div>
                </div>
            
            <div class="slide-footer" style="z-index: 10; bottom: 16px;">
                <span style="color: var(--text-grey);">artificial capital.</span>
                <span style="color: var(--text-grey);">21</span>
            </div>
        </section>

        <!-- 22 Disclosures (LIGHT) -->
        <section class="slide light-theme">
            <h1 class="headline">Disclosures</h1>
            <div style="width: 100%; height: 3px; background-color: var(--accent-teal); margin-bottom: 60px;"></div>
            <div style="max-width: 70%; margin: 60px auto 0 auto; text-align: justify; display: flex; flex-direction: column; justify-content: center;">
                <p style="margin-bottom: 32px; font-size: 18px; line-height: 1.8;">The information contained in this document is confidential and is intended solely for the person to whom it has been delivered. It is not to be reproduced or distributed to any other person without the prior written consent of Artificial Capital. This document does not constitute an offer to sell or a solicitation of an offer to buy any security. Any such offer would only be made by means of a formal private placement memorandum.</p>
                <p style="font-size: 18px; line-height: 1.8;">An investment in the fund is speculative and involves a high degree of risk. Opportunities for withdrawal and transferability of interests are restricted, so investors may not have access to capital when it is needed. There is no secondary market for the interests and none is expected to develop. The fees and expenses charged to an investment in the fund may be higher than the fees and expenses of other investment alternatives and may offset profits. Past performance is not indicative of future results.</p>
            </div>
            <div class="slide-footer">
                <span>artificial capital.</span>
                <span>22</span>
            </div>
        </section>

    </div>
    
    <script>
        lucide.createIcons();
    </script>
</body>

</html>
"""
