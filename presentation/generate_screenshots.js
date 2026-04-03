const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const filePath = path.resolve(__dirname, 'index.html');
    const outDir = path.resolve(__dirname, 'review-shots');

    await page.goto('file://' + filePath, { waitUntil: 'networkidle0' });

    const slides = await page.$$('.slide');

    for (let i = 0; i < slides.length; i++) {
        const outPath = path.join(outDir, `slide_${i + 1}.png`);
        await slides[i].screenshot({ path: outPath });
        console.log(`Saved slide_${i + 1}.png`);
    }

    await browser.close();
})();
