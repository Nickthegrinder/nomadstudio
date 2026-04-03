const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const filePath = path.resolve(__dirname, 'index.html');
    const fileUrl = 'file:///' + filePath.replace(/\\/g, '/');

    console.log('Loading deck:', filePath);

    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for Lucide icons to render
    await page.evaluate(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    await new Promise(r => setTimeout(r, 500));

    const outputPath = path.resolve(__dirname, 'Artificial_Capital_Pitch_Deck.pdf');

    console.log('Generating PDF (one page per slide)...');

    await page.pdf({
        path: outputPath,
        width: '1920px',
        height: '1080px',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        preferCSSPageSize: false
    });

    console.log('Done:', outputPath);

    await browser.close();
})();
