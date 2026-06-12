/**
 * Smoke test for the Lift STL landing page.
 *
 * Run:  npm install && npx playwright install chromium && npm test
 *
 * Serves the repo over a local static server, then verifies in
 * headless Chromium (desktop + mobile emulation) that the page
 * loads cleanly and every conversion-critical behavior works.
 */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { chromium } from 'playwright';

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = http.createServer(async (req, res) => {
  try {
    const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    const body = await readFile(join(process.cwd(), '.' + path));
    res.writeHead(200, { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});
await new Promise(r => server.listen(0, r));
const BASE = `http://localhost:${server.address().port}`;

let failures = 0;
const check = (name, ok) => {
  console.log(`${ok ? '  ✓' : '  ✗ FAIL'} ${name}`);
  if (!ok) failures++;
};

const browser = await chromium.launch();

/* ---------- desktop ---------- */
{
  const page = await browser.newPage({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${BASE}/index.html?gclid=SMOKE&utm_campaign=test`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  console.log('desktop:');
  check('no page errors', errors.length === 0);
  check('motion engine active', await page.evaluate(() => document.body.classList.contains('motion')));
  check('attribution captured', await page.evaluate(() =>
    ATTRIBUTION.gclid === 'SMOKE' && ATTRIBUTION.utm_campaign === 'test'));
  check('tel links present', await page.$$eval('a[href^="tel:+13142963117"]', els => els.length >= 3));
  check('two lead forms', await page.$$eval('form.lead-form', els => els.length === 2));

  // short phone blocked
  await page.fill('#hero-name', 'Smoke');
  await page.fill('#hero-email', 's@test.com');
  await page.fill('#hero-phone', '555');
  await page.click('form[data-form-location=hero] button[type=submit]');
  await page.waitForTimeout(300);
  check('short phone blocked', await page.$eval('form[data-form-location=hero]',
    f => !f.classList.contains('is-done')));

  // valid phone succeeds
  await page.fill('#hero-phone', '3145551234');
  await page.click('form[data-form-location=hero] button[type=submit]');
  await page.waitForTimeout(400);
  check('valid submit shows success', await page.$eval('form[data-form-location=hero]',
    f => f.classList.contains('is-done')));

  // honeypot swallows bots
  await page.$eval('#bottom-website', el => { el.value = 'spam'; });
  await page.fill('#bottom-name', 'Bot');
  await page.fill('#bottom-email', 'b@b.com');
  await page.fill('#bottom-phone', '3145550000');
  await page.click('form[data-form-location=bottom] button[type=submit]');
  await page.waitForTimeout(300);
  check('honeypot silently done', await page.$eval('form[data-form-location=bottom]',
    f => f.classList.contains('is-done')));

  // drag-to-compare slider responds
  await page.$eval('.ba-range', el => { el.value = 80; el.dispatchEvent(new Event('input')); });
  check('compare slider responds', await page.$eval('.ba-slider',
    el => el.style.getPropertyValue('--cut') === '80%'));

  // play button starts the video
  await page.$eval('.video-shell .play-btn', btn => btn.click());
  await page.waitForTimeout(700);
  check('video plays on click', await page.$eval('.video-shell video', v => !v.paused));

  await page.close();
}

/* ---------- mobile ---------- */
{
  const page = await browser.newPage({
    ignoreHTTPSErrors: true,
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
  });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${BASE}/index.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  console.log('mobile:');
  check('no page errors', errors.length === 0);
  check('JS film disabled on touch', await page.evaluate(() => !document.body.classList.contains('motion')));
  check('sticky call bar visible', await page.$eval('.call-bar', el => el.offsetHeight > 0));
  check('transformation carousel is swipeable', await page.$eval('.gal-track',
    el => getComputedStyle(el).display === 'flex' && el.scrollWidth > el.clientWidth));

  await page.close();
}

await browser.close();
server.close();

console.log(failures ? `\n${failures} check(s) FAILED` : '\nall checks passed');
process.exit(failures ? 1 : 0);
