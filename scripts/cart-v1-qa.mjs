import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = 'http://127.0.0.1:3000';
const storageKey = 'bahja-order-bag-v1';
const seededItems = [
  {
    productSlug: 'black-gold-chain-thread-bag',
    title: 'Black Gold Chain Thread Bag',
    arabicTitle: 'شنطة خيوط السلسلة أسود وذهبي',
    image: '/images/bahja/redesigned/black-gold-chain-thread-bag-main.png',
    collection: 'شنط خيوط السلسلة',
    priceGuide: 'صغير: ٦٥٠ جنيه · متوسط: ٧٥٠ جنيه · كبير: ٨٥٠ جنيه',
    selectedSize: 'Large',
    quantity: 1,
    customNote: 'ذهبي هادي'
  },
  {
    productSlug: 'dusty-pink-satin-hair-accessories',
    title: 'Dusty Pink Satin Hair Accessories',
    arabicTitle: 'إكسسوارات شعر ساتان وردي هادئ',
    image: '/images/bahja/redesigned/dusty-pink-satin-hair-accessories-main.png',
    collection: 'إكسسوارات شعر يدوية',
    priceGuide: 'استفسري عن السعر عبر واتساب',
    quantity: 2,
    customNote: ''
  }
];

await fs.mkdir('qa-artifacts', { recursive: true });
const browser = await chromium.launch();
const failures = [];

async function addSeed(context, items = seededItems) {
  await context.addInitScript(
    ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
    { key: storageKey, value: items }
  );
}

async function forceImages(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let stable = 0;
      let lastHeight = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 650);
        const height = document.documentElement.scrollHeight;
        if (window.scrollY + window.innerHeight >= height - 4) {
          stable = height === lastHeight ? stable + 1 : 0;
          lastHeight = height;
          if (stable >= 2) {
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
    await page.waitForFunction(() => [...document.images].every((img) => img.complete), undefined, { timeout: 10000 });
  } catch {}
  await page.waitForTimeout(250);
}

async function inspectFilled(name, viewport) {
  const context = await browser.newContext({ viewport });
  await addSeed(context);
  const page = await context.newPage();

  page.on('pageerror', (error) => failures.push(`${name}: page error: ${error.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') failures.push(`${name}: console error: ${msg.text()}`);
  });

  const response = await page.goto(`${baseURL}/cart`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${name}: HTTP ${response?.status()}`);
  await page.waitForTimeout(300);
  await forceImages(page);

  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.getAttribute('src')),
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    articleCount: document.querySelectorAll('main article').length,
    hasFakeTotal: document.body.textContent?.includes('الإجمالي') ?? false,
  }));

  if (metrics.documentWidth > metrics.viewport + 1 || metrics.bodyWidth > metrics.viewport + 1) {
    failures.push(`${name}: horizontal overflow viewport=${metrics.viewport} doc=${metrics.documentWidth} body=${metrics.bodyWidth}`);
  }
  if (metrics.brokenImages.length) failures.push(`${name}: broken images: ${metrics.brokenImages.join(', ')}`);
  if (!metrics.h1.includes('سلة الطلب')) failures.push(`${name}: cart title missing`);
  if (metrics.articleCount !== 2) failures.push(`${name}: expected 2 line items, found ${metrics.articleCount}`);
  if (metrics.hasFakeTotal) failures.push(`${name}: fake total label detected`);

  await page.screenshot({ path: `qa-artifacts/${name}.png`, fullPage: true });
  await context.close();
}

await inspectFilled('cart-desktop', { width: 1440, height: 1000 });
await inspectFilled('cart-mobile', { width: 390, height: 844 });

const emptyContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const emptyPage = await emptyContext.newPage();
await emptyPage.goto(`${baseURL}/cart`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await emptyPage.waitForTimeout(300);
if (!(await emptyPage.getByText('لسه ما اخترتيش قطعة.').isVisible())) failures.push('empty-cart: empty state missing');
await emptyPage.screenshot({ path: 'qa-artifacts/cart-empty-mobile.png', fullPage: true });
await emptyContext.close();

const interactionContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
await addSeed(interactionContext);
const page = await interactionContext.newPage();
await page.goto(`${baseURL}/cart`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(300);

const increment = page.getByRole('button', { name: 'زيادة كمية شنطة خيوط السلسلة أسود وذهبي' });
await increment.click();
const bagArticle = page.locator('article').filter({ hasText: 'شنطة خيوط السلسلة أسود وذهبي' });
if (!(await bagArticle.getByText('2', { exact: true }).isVisible())) failures.push('interaction: quantity increment failed');

const decrement = page.getByRole('button', { name: 'تقليل كمية شنطة خيوط السلسلة أسود وذهبي' });
await decrement.click();
if (!(await bagArticle.getByText('1', { exact: true }).isVisible())) failures.push('interaction: quantity decrement failed');

const bagNote = page.getByLabel('ملاحظة على شنطة خيوط السلسلة أسود وذهبي');
await bagNote.fill('سلسلة ذهبية أهدأ');

await page.getByLabel('الاسم').fill('اختبار بهجة');
await page.getByLabel('رقم الهاتف').fill('01000000000');
await page.getByLabel('المنطقة / العنوان').fill('القاهرة');
await page.getByLabel('ملاحظات إضافية').fill('التواصل قبل التنفيذ');

const waHref = await page.getByRole('link', { name: 'إرسال الطلب عبر واتساب' }).getAttribute('href');
const decoded = decodeURIComponent(waHref ?? '');
for (const expected of ['اختبار بهجة', '01000000000', 'القاهرة', 'التواصل قبل التنفيذ', 'سلسلة ذهبية أهدأ', 'شنطة خيوط السلسلة أسود وذهبي']) {
  if (!decoded.includes(expected)) failures.push(`interaction: WhatsApp payload missing "${expected}"`);
}

await page.screenshot({ path: 'qa-artifacts/cart-interaction-mobile.png', fullPage: true });

const accessoryArticle = page.locator('article').filter({ hasText: 'إكسسوارات شعر ساتان وردي هادئ' });
await accessoryArticle.getByRole('button', { name: 'حذف' }).click();
if (await page.getByText('إكسسوارات شعر ساتان وردي هادئ', { exact: true }).isVisible().catch(() => false)) {
  failures.push('interaction: remove item failed');
}

await page.getByRole('button', { name: 'إفراغ السلة' }).click();
await page.waitForTimeout(150);
if (!(await page.getByText('لسه ما اخترتيش قطعة.').isVisible())) failures.push('interaction: clear cart failed');
await interactionContext.close();

for (const route of ['/', '/shop', '/shop/elegant-clutch', '/custom-orders']) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const smoke = await context.newPage();
  const response = await smoke.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${route}: HTTP ${response?.status()}`);
  await context.close();
}

await browser.close();

await fs.writeFile('qa-artifacts/report.json', JSON.stringify({
  passed: failures.length === 0,
  failures,
  checked: {
    filledDesktop: true,
    filledMobile: true,
    emptyMobile: true,
    increment: true,
    decrement: true,
    noteEdit: true,
    customerFields: true,
    whatsappPayload: true,
    removeItem: true,
    clearCart: true,
    noFakeTotal: true,
    routeSmoke: true
  }
}, null, 2));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Bahja Cart V1 QA passed.');
