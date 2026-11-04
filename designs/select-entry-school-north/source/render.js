// Renders slide.html to PNG with headless Chromium (Playwright).
//
//   node render.js                      -> ../select-entry-school-north.png (1080x1080) and @2x (2160x2160)
//   node render.js '{"dot":1}'          -> same, with any layout/copy params overridden (see defaults in slide.html)
//
// Needs `playwright` resolvable from Node (npm i playwright) and a Chromium it can launch.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const params = process.argv[2] || '{}';
  JSON.parse(params); // fail fast on bad JSON
  const url = 'file://' + path.join(__dirname, 'slide.html') + '?p=' + encodeURIComponent(params);
  const browser = await chromium.launch();
  for (const [scale, suffix] of [[1, ''], [2, '@2x']]) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: scale });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    const missing = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'error').map(f => f.family));
    if (missing.length) throw new Error('fonts failed to load: ' + missing.join(', '));
    await page.waitForTimeout(150);
    const out = path.join(__dirname, '..', `select-entry-school-north${suffix}.png`);
    await page.screenshot({ path: out });
    console.log('wrote', out);
    await page.close();
  }
  await browser.close();
})();
