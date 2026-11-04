// Renders a slide page to PNG with headless Chromium (Playwright).
//
//   node render.js                                   -> slide.html -> ../select-entry-school-north.png (+ @2x)
//   node render.js '{}' slide-classroom.html select-entry-school-north-classroom
//                                                    -> the classroom-photo version
//   any page's defaults can be overridden with the JSON params argument (see the defaults block in each page)
//
// Needs `playwright` resolvable from Node (npm i playwright) and a Chromium it can launch.
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const params = process.argv[2] || '{}';
  const pageFile = process.argv[3] || 'slide.html';
  const outBase = process.argv[4] || 'select-entry-school-north';
  JSON.parse(params); // fail fast on bad JSON
  const url = 'file://' + path.join(__dirname, pageFile) + '?p=' + encodeURIComponent(params);
  const browser = await chromium.launch();
  for (const [scale, suffix] of [[1, ''], [2, '@2x']]) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: scale });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    const missing = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'error').map(f => f.family));
    if (missing.length) throw new Error('fonts failed to load: ' + missing.join(', '));
    await page.waitForTimeout(150);
    const out = path.join(__dirname, '..', `${outBase}${suffix}.png`);
    await page.screenshot({ path: out });
    console.log('wrote', out);
    await page.close();
  }
  await browser.close();
})();
