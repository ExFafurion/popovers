const puppeteer = require('puppeteer');
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:8080');
});

afterAll(async () => {
  await browser.close();
});

test('popover appears on button click and disappears on second click', async () => {
  // Проверяем, что изначально popover нет
  let popover = await page.$('.popover');
  expect(popover).toBeNull();

  // Кликаем по кнопке
  await page.click('#popoverBtn');
  await page.waitForSelector('.popover', { timeout: 1000 });
  popover = await page.$('.popover');
  expect(popover).not.toBeNull();

  // заголовок
  const header = await page.$eval('.popover-header', el => el.textContent);
  expect(header).toContain('Popover title');

  // Второй клик
  await page.click('#popoverBtn');
  await page.waitForTimeout(300);
  popover = await page.$('.popover');
  expect(popover).toBeNull();
});