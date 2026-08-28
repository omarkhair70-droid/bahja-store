import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseURL = 'http://127.0.0.1:3000';
await fs.mkdir('qa-artifacts', { recursive: true });

const browser = await chromium.launch();
const failures = [];

async function forceImages(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let stable = 0;
      let lastHeight = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 700);
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
  await page.waitForTimeout(250);
}

async function inspect(name, route, viewport, expectedText, screenshot = true) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  page.on('pageerror', (error) => failures.push(`${name}: page error: ${error.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') failures.push(`${name}: console error: ${msg.text()}`);
  });

  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (!response?.ok()) failures.push(`${name}: HTTP ${response?.status()}`);

  await forceImages(page);

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
    text: document.body.innerText,
    headerCount: document.querySelectorAll('header').length,
    footerCount: document.querySelectorAll('footer').length
  }));

  if (metrics.documentWidth > metrics.viewport + 1 || metrics.bodyWidth > metrics.viewport + 1) {
    failures.push(`${name}: horizontal overflow viewport=${metrics.viewport} doc=${metrics.documentWidth} body=${metrics.bodyWidth}`);
  }
  if (metrics.brokenImages.length) failures.push(`${name}: broken images: ${metrics.brokenImages.join(', ')}`);
  if (metrics.incompleteImages.length) failures.push(`${name}: incomplete images: ${metrics.incompleteImages.join(', ')}`);
  if (!metrics.text.includes(expectedText)) failures.push(`${name}: expected text "${expectedText}" missing`);
  if (metrics.headerCount !== 1) failures.push(`${name}: expected one global header, found ${metrics.headerCount}`);
  if (metrics.footerCount !== 1) failures.push(`${name}: expected one global footer, found ${metrics.footerCount}`);

  if (screenshot) {
    await page.screenshot({ path: `qa-artifacts/${name}.png`, fullPage: true });
  }

  await context.close();
}

const desktop = { width: 1440, height: 1000 };
const mobile = { width: 390, height: 844 };

await inspect('home-desktop', '/', desktop, 'للغُرز حكايا');
await inspect('shop-desktop', '/shop', desktop, 'المتجر');
await inspect('pdp-clutch-desktop', '/shop/elegant-clutch', desktop, 'إليجانت كلاتش');
await inspect('collections-desktop', '/collections', desktop, 'المجموعات');
await inspect('collections-mobile', '/collections', mobile, 'المجموعات');
await inspect('custom-orders-desktop', '/custom-orders', desktop, 'خليها بتفاصيلك');
await inspect('custom-orders-mobile', '/custom-orders', mobile, 'خليها بتفاصيلك');
await inspect('about-desktop', '/about', desktop, 'المنتج هو البطل');
await inspect('about-mobile', '/about', mobile, 'المنتج هو البطل');
await inspect('contact-desktop', '/contact', desktop, 'اسألي عن القطعة');
await inspect('contact-mobile', '/contact', mobile, 'اسألي عن القطعة');

const menuContext = await browser.newContext({ viewport: mobile });
const menuPage = await menuContext.newPage();
await menuPage.goto(`${baseURL}/contact`, { waitUntil: 'domcontentloaded' });
await menuPage.getByRole('button', { name: 'القائمة' }).click();
if (!(await menuPage.locator('#bahja-main-menu').isVisible())) failures.push('mobile-menu: did not open');
for (const label of ['المتجر', 'المجموعات', 'طلب خاص', 'عن بهجة', 'تواصل معنا']) {
  if (!(await menuPage.getByRole('link', { name: label, exact: true }).isVisible())) failures.push(`mobile-menu: "${label}" missing`);
}
await menuPage.screenshot({ path: 'qa-artifacts/global-mobile-menu.png', fullPage: false });
await menuContext.close();

const shopContext = await browser.newContext({ viewport: mobile });
const shopPage = await shopContext.newPage();
await shopPage.goto(`${baseURL}/shop`, { waitUntil: 'domcontentloaded' });
await shopPage.getByRole('link', { name: 'خيط الهيمالايا', exact: true }).click();
await shopPage.waitForLoadState('domcontentloaded');
if (!(await shopPage.locator('h1').getByText('شنط بخامة أهدأ وحضور يومي', { exact: true }).isVisible())) {
  failures.push('shop-filter: Himalayan filter navigation failed');
}
await shopContext.close();

const journey = await browser.newContext({ viewport: mobile });
const journeyPage = await journey.newPage();
await journeyPage.goto(`${baseURL}/shop/black-gold-chain-thread-bag`, { waitUntil: 'domcontentloaded' });

const largeButton = journeyPage.getByRole('button', { name: 'كبير' });
await largeButton.click();
if ((await largeButton.getAttribute('aria-pressed')) !== 'true') failures.push('journey: large size not selected');

await journeyPage.getByLabel('اللون أو التفاصيل المطلوبة').fill('سلسلة ذهبية هادئة');
await journeyPage.getByRole('button', { name: 'أضيفي إلى السلة' }).click();
if (!(await journeyPage.getByText('تمت إضافة القطعة إلى السلة', { exact: false }).isVisible())) failures.push('journey: add-to-bag confirmation missing');

const cartLink = journeyPage.getByRole('link', { name: /السلة/ }).first();
if (!(await cartLink.textContent())?.includes('(1)')) failures.push('journey: cart count did not update');
await cartLink.click();
await journeyPage.waitForLoadState('domcontentloaded');

if (!(await journeyPage.getByText('شنطة خيوط السلسلة أسود وذهبي', { exact: true }).isVisible())) failures.push('journey: cart item missing');
if (!(await journeyPage.getByText('المقاس: كبير', { exact: true }).isVisible())) failures.push('journey: selected size missing in cart');

await journeyPage.getByLabel('الاسم').fill('اختبار نهائي');
await journeyPage.getByLabel('رقم الهاتف').fill('01000000000');
await journeyPage.getByLabel('المنطقة / العنوان').fill('القاهرة');
await journeyPage.getByLabel('ملاحظات إضافية').fill('التواصل قبل التنفيذ');

const waHref = await journeyPage.getByRole('link', { name: 'إرسال الطلب عبر واتساب' }).getAttribute('href');
const decoded = decodeURIComponent(waHref ?? '');
for (const expected of ['اختبار نهائي', '01000000000', 'القاهرة', 'التواصل قبل التنفيذ', 'سلسلة ذهبية هادئة', 'شنطة خيوط السلسلة أسود وذهبي']) {
  if (!decoded.includes(expected)) failures.push(`journey: WhatsApp payload missing "${expected}"`);
}
await journeyPage.screenshot({ path: 'qa-artifacts/end-to-end-cart-mobile.png', fullPage: true });
await journey.close();

const customContext = await browser.newContext({ viewport: mobile });
const customPage = await customContext.newPage();
await customPage.goto(`${baseURL}/custom-orders`, { waitUntil: 'domcontentloaded' });
const customWa = await customPage.getByRole('link', { name: /طلبًا خاصًا|واتساب/ }).first().getAttribute('href');
if (!customWa?.includes('wa.me')) failures.push('custom-orders: WhatsApp CTA missing');
await customContext.close();

const contactContext = await browser.newContext({ viewport: desktop });
const contactPage = await contactContext.newPage();
await contactPage.goto(`${baseURL}/contact`, { waitUntil: 'domcontentloaded' });
const socialHrefs = await contactPage.locator('a[target="_blank"]').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
if (!socialHrefs.some((href) => href?.includes('instagram.com'))) failures.push('contact: Instagram link missing');
if (!socialHrefs.some((href) => href?.includes('facebook.com'))) failures.push('contact: Facebook link missing');
await contactContext.close();

const reduced = await browser.newContext({ viewport: mobile, reducedMotion: 'reduce' });
const reducedPage = await reduced.newPage();
await reducedPage.goto(baseURL, { waitUntil: 'domcontentloaded' });
const reducedOverflow = await reducedPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
if (reducedOverflow) failures.push('reduced-motion: horizontal overflow');
await reduced.close();

const keyboard = await browser.newContext({ viewport: desktop });
const keyboardPage = await keyboard.newPage();
await keyboardPage.goto(baseURL, { waitUntil: 'domcontentloaded' });
await keyboardPage.keyboard.press('Tab');
const focusTag = await keyboardPage.evaluate(() => document.activeElement?.tagName ?? '');
if (!['A', 'BUTTON', 'INPUT'].includes(focusTag)) failures.push(`keyboard: first Tab did not land on interactive control, got ${focusTag}`);
await keyboard.close();

await browser.close();

await fs.writeFile('qa-artifacts/report.json', JSON.stringify({
  passed: failures.length === 0,
  failures,
  checked: {
    typeAndBuild: true,
    representativeDesktopAndMobileRoutes: true,
    singleGlobalHeaderFooter: true,
    images: true,
    overflow: true,
    mobileMenu: true,
    shopFilter: true,
    endToEndPdpCartWhatsapp: true,
    customOrderWhatsapp: true,
    socialLinks: true,
    reducedMotion: true,
    keyboardFocusSmoke: true
  }
}, null, 2));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Bahja final whole-store QA passed.');
