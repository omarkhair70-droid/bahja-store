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
        window.scrollBy(0, 750);
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
      }, 9000);
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

async function inspect(name, route, viewport, expectedTitle, minImages = 1) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  page.on('pageerror', (err) => failures.push(`${name}: page error: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') failures.push(`${name}: console error: ${msg.text()}`);
  });

  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${name}: HTTP ${response?.status()}`);

  await forceLazyImages(page);

  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.getAttribute('src')),
    incompleteImages: [...document.images].filter((img) => !img.complete).map((img) => img.getAttribute('src')),
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    imageCount: document.querySelectorAll('main img').length,
    whatsappCount: document.querySelectorAll('main a[href*="wa.me"], main a[href*="api.whatsapp.com"]').length,
  }));

  if (metrics.documentWidth > metrics.viewport + 1 || metrics.bodyWidth > metrics.viewport + 1) {
    failures.push(`${name}: horizontal overflow viewport=${metrics.viewport} document=${metrics.documentWidth} body=${metrics.bodyWidth}`);
  }
  if (metrics.brokenImages.length) failures.push(`${name}: broken images: ${metrics.brokenImages.join(', ')}`);
  if (metrics.incompleteImages.length) failures.push(`${name}: incomplete images: ${metrics.incompleteImages.join(', ')}`);
  if (!metrics.h1.includes(expectedTitle)) failures.push(`${name}: expected title "${expectedTitle}", got "${metrics.h1}"`);
  if (metrics.imageCount < minImages) failures.push(`${name}: expected at least ${minImages} PDP images, found ${metrics.imageCount}`);
  if (metrics.whatsappCount < 1) failures.push(`${name}: WhatsApp action missing`);

  await page.screenshot({ path: `qa-artifacts/${name}.png`, fullPage: true });
  await context.close();
}

await inspect(
  'pdp-bag-desktop',
  '/shop/black-gold-chain-thread-bag',
  { width: 1440, height: 1000 },
  'شنطة خيوط السلسلة أسود وذهبي',
  5
);
await inspect(
  'pdp-bag-mobile',
  '/shop/light-grey-himalayan-thread-bag',
  { width: 390, height: 844 },
  'شنطة خيط هيمالايا رمادي فاتح',
  5
);
await inspect(
  'pdp-clutch-desktop',
  '/shop/elegant-clutch',
  { width: 1440, height: 1000 },
  'إليجانت كلاتش',
  16
);
await inspect(
  'pdp-clutch-mobile',
  '/shop/elegant-clutch',
  { width: 390, height: 844 },
  'إليجانت كلاتش',
  16
);
await inspect(
  'pdp-accessory-mobile',
  '/shop/dusty-pink-satin-hair-accessories',
  { width: 390, height: 844 },
  'إكسسوارات شعر ساتان وردي هادئ',
  1
);

const commerce = await browser.newContext({ viewport: { width: 390, height: 844 } });
const commercePage = await commerce.newPage();
await commercePage.goto(`${baseURL}/shop/black-gold-chain-thread-bag`, { waitUntil: 'domcontentloaded', timeout: 30000 });

const largeButton = commercePage.getByRole('button', { name: 'كبير' });
await largeButton.click();
if ((await largeButton.getAttribute('aria-pressed')) !== 'true') {
  failures.push('commerce: large size did not become selected');
}

await commercePage.getByLabel('اللون أو التفاصيل المطلوبة').fill('اختبار لون');
await commercePage.getByRole('button', { name: 'أضيفي إلى السلة' }).click();
if (!(await commercePage.getByText('تمت إضافة القطعة إلى السلة', { exact: false }).isVisible())) {
  failures.push('commerce: add-to-bag confirmation missing');
}

const cartText = await commercePage.getByRole('link', { name: /السلة/ }).first().textContent();
if (!cartText?.includes('(1)')) failures.push(`commerce: header cart count did not update, got "${cartText}"`);

await commercePage.screenshot({ path: 'qa-artifacts/pdp-commerce-mobile.png', fullPage: false });
await commerce.close();

for (const route of ['/shop', '/shop/navy-himalayan-thread-bag', '/cart']) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
  await context.close();
}

await browser.close();

await fs.writeFile('qa-artifacts/report.json', JSON.stringify({
  passed: failures.length === 0,
  failures,
  checked: {
    bagDesktop: true,
    bagMobile: true,
    clutchDesktop: true,
    clutchMobile: true,
    accessoryMobile: true,
    sizeSelection: true,
    addToBag: true,
    cartCount: true,
    whatsappPresence: true,
    cartSmoke: true
  }
}, null, 2));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Bahja PDP V1 QA passed.');
