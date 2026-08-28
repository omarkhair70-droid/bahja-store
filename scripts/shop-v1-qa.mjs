import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = 'http://127.0.0.1:3000';
await fs.mkdir('qa-artifacts', { recursive: true });

const browser = await chromium.launch();
const failures = [];

async function forceLazyImages(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let lastHeight = 0;
      let stableTicks = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 700);
        const height = document.documentElement.scrollHeight;
        if (window.scrollY + window.innerHeight >= height - 4) {
          if (height === lastHeight) stableTicks += 1;
          else stableTicks = 0;
          lastHeight = height;
          if (stableTicks >= 2) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }
      }, 60);
      setTimeout(() => {
        clearInterval(timer);
        window.scrollTo(0, 0);
        resolve();
      }, 8000);
    });
  });

  try {
    await page.waitForFunction(
      () => [...document.images].every((img) => img.complete),
      undefined,
      { timeout: 10000 }
    );
  } catch {}
  await page.waitForTimeout(300);
}

async function inspect(name, route, viewport, expectedTitle) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') failures.push(`${name}: console error: ${msg.text()}`);
  });
  page.on('pageerror', (err) => failures.push(`${name}: page error: ${err.message}`));

  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${name}: HTTP ${response?.status()}`);

  await forceLazyImages(page);

  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    brokenImages: [...document.images]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute('src')),
    incompleteImages: [...document.images]
      .filter((img) => !img.complete)
      .map((img) => img.getAttribute('src')),
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    articles: document.querySelectorAll('main article').length,
  }));

  if (metrics.documentWidth > metrics.viewport + 1 || metrics.bodyWidth > metrics.viewport + 1) {
    failures.push(`${name}: horizontal overflow viewport=${metrics.viewport} document=${metrics.documentWidth} body=${metrics.bodyWidth}`);
  }
  if (metrics.brokenImages.length) failures.push(`${name}: broken images: ${metrics.brokenImages.join(', ')}`);
  if (metrics.incompleteImages.length) failures.push(`${name}: incomplete images: ${metrics.incompleteImages.join(', ')}`);
  if (!metrics.h1.includes(expectedTitle)) failures.push(`${name}: expected title "${expectedTitle}" not found, got "${metrics.h1}"`);
  if (metrics.articles < 1) failures.push(`${name}: no product articles rendered`);

  await page.screenshot({ path: `qa-artifacts/${name}.png`, fullPage: true });

  if (name === 'shop-mobile') {
    const menuButton = page.getByRole('button', { name: 'القائمة' });
    await menuButton.click();
    if (!(await page.locator('#bahja-home-menu').isVisible())) failures.push('shop-mobile: editorial menu did not open');
    await page.screenshot({ path: 'qa-artifacts/shop-mobile-menu.png', fullPage: false });
  }

  await context.close();
}

async function smoke(route) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
  await context.close();
}

await inspect('shop-desktop', '/shop', { width: 1440, height: 1000 }, 'المتجر');
await inspect('shop-mobile', '/shop', { width: 390, height: 844 }, 'المتجر');
await inspect('shop-clutch-desktop', '/shop?collection=elegant-clutch', { width: 1440, height: 1000 }, 'أربع درجات');
await inspect('shop-himalayan-mobile', '/shop?collection=himalayan-thread-bags', { width: 390, height: 844 }, 'شنط بخامة');

for (const route of ['/shop?category=handmade-bags', '/shop/elegant-clutch', '/shop/black-gold-chain-thread-bag', '/cart']) {
  await smoke(route);
}

await browser.close();

await fs.writeFile('qa-artifacts/report.json', JSON.stringify({
  passed: failures.length === 0,
  failures,
  checked: {
    shopDesktop: true,
    shopMobile: true,
    clutchCollectionDesktop: true,
    himalayanCollectionMobile: true,
    smokeRoutes: ['/shop?category=handmade-bags', '/shop/elegant-clutch', '/shop/black-gold-chain-thread-bag', '/cart']
  }
}, null, 2));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Bahja Shop V1 QA passed.');
