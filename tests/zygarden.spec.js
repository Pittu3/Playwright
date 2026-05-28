import { test, expect } from '@playwright/test';

test('google login flow', async ({ page }) => {

  await page.goto('https://acc.zygarden.gg/');

  await page.getByRole('link', { name: 'Log in' }).click();

  await page.locator('button:has(svg[aria-label="google-icon"])').click();

  // Enter email
  await page.locator('input[type="email"]').fill('zygarden.qa@gmail.com');

  await page.getByRole('button', { name: 'Next' }).click();

  // Enter password
  await page.locator('input[type="password"]').fill('zygarden@4988');

  await page.getByRole('button', { name: 'Next' }).click();

  // Verify logged in
  await expect(
    page.getByRole('link', { name: 'Account' })
  ).toBeVisible();

});