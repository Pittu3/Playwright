import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { chromium } from 'playwright';

const appUrl = 'https://acc.zygarden.gg/';
const authFile = path.join(process.cwd(), 'playwright/.auth/zygarden-google.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const browser = await chromium.launch({
  channel: 'chrome',
  headless: false,
  args: ['--disable-blink-features=AutomationControlled'],
  ignoreDefaultArgs: ['--enable-automation'],
});

const context = await browser.newContext();
const page = await context.newPage();

try {
  await page.goto(appUrl);
  await page.getByRole('link', { name: /log in/i }).click();
  await page.getByRole('button', { name: /google/i }).click();

  await rl.question(
    'Complete Google login in the opened browser, then press Enter here to save auth state... '
  );

  if (/accounts\.google\.com/.test(page.url())) {
    throw new Error(
      'Google login does not look complete yet. Finish login in browser and run the script again.'
    );
  }

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await context.storageState({ path: authFile });
  console.log(`Auth file saved to: ${authFile}`);
} finally {
  rl.close();
  await browser.close();
}
