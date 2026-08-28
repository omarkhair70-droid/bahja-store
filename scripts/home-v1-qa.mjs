import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = 'http://127.0.0.1:3000';
await fs.mkdir('qa-artifacts', { recursive: true });

const browser = await chromium.launch();
const failures = [];

async function waitForImages(page) {
  await page.locator('img').evaluateAll((images) =>
    Promise.all(images.map((img) => img.complete ? undefined : new Promise((resolve) => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    })))
  );
}

async function inspectHome(name, viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') failures.push(`${name}: console error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => failures.push(`${name}: page error: ${err.message}`));

  const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
  if (!response?.ok()) failures.push(`${name}: home returned HTTP ${response?.status()}`);

  await waitForImages(page);

  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    brokenImages: [...document.images]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute('src')),
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    sections: document.querySelectorAll('main section').length,
  }));

  if (metrics.scrollWidth > metrics.viewport + 1 || metrics.bodyScrollWidth > metrics.viewport + 1) {
    failures.push(`${name}: horizontal overflow viewport=${metrics.viewport} document=${metrics.scrollWidth} body=${metrics.bodyScrollWidth}`);
  }
  if (metrics.brokenImages.length) failures.push(`${name}: broken images: ${metrics.brokenImages.join(', ')}`);
  if (!metrics.h1.includes('للغُرز حكايا')) failures.push(`${name}: expected hero H1 not found`);
  if (metrics.sections < 8) failures.push(`${name}: expected editorial section structure, found ${metrics.sections}`);

  await page.screenshot({ path: `qa-artifacts/home-${name}.png`, fullPage: true });

  if (name === 'mobile') {
    const menuButton = page.getByRole('button', { name: 'القائمة' });
    await menuButton.click();
    const menu = page.locator('#bahja-home-menu');
    if (!(await menu.isVisible())) failures.push('mobile: menu did not open');
    await page.screenshot({ path: 'qa-artifacts/home-mobile-menu.png', fullPage: false });
  }

  await context.close();
}

async function smokeRoute(route) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  if (!response?.ok()) failures.push(`${route}: returned HTTP ${response?.status()}`);
  await context.close();
}

await inspectHome('desktop', { width: 1440, height: 1000 });
await inspectHome('mobile', { width: 390, height: 844 });

for (const route of ['/shop', '/shop/elegant-clutch', '/cart']) {
  await smokeRoute(route);
}

const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const reducedPage = await reduced.newPage();
await reducedPage.goto(baseURL, { waitUntil: 'networkidle' });
const reducedOverflow = await reducedPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
if (reducedOverflow) failures.push('reduced-motion: horizontal overflow');
await reduced.close();

await browser.close();

await fs.writeFile('qa-artifacts/report.json', JSON.stringify({
  failures,
  passed: failures.length === 0,
  checked: {
    homeViewports: ['1440x1000', '390x844'],
    smokeRoutes: ['/shop', '/shop/elegant-clutch', '/cart'],
    reducedMotion: true,
  }
}, null, 2));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Bahja Home V1 QA passed.');
