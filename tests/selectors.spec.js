import {test, expect} from '@playwright/test';

test("Learning selectors", async ({page}) => {
    // navigate to the webpage
    await page.goto("http://127.0.0.1:5500/clickMe.html");

    // selecting by ID
    await page.locator('#clickButton').click()

    // selecting by class
    await page.locator('.button-style').click()

    // By Tag and Class
    await page.locator('button.button-style').click()

    // By attribute value
    await page.locator('[data-actions="increment"]').click()
    
    // Partial attribute
    await page.locator('[roles*="but"]').click()

    // 6 By Text content
    await page.locator('text=CLICK ME').click()

    // 7 Combine selectors for precision, class and text - Find exact text match
    await page.locator('.button-style:text("CLICK ME")').click()

    // 8 Find elements containing specific text, has-text(text-incensistive)
    await page.locator('.button-style:has-text("click me")').click()

    // 9 Attribute and text combination
    await page.locator('[data-actions="increment"]:text("CLICK ME")').click()

    // 10 Playwright locators - https://playwright.dev/docs/locators
    // get by text
    await page.getByText('CLICK ME').click()

    // 11 by role
    await page.getByRole('button', {name: /click me/i}).click()

    // Lets assert the counter
    await expect(page.locator('#counter')).toContainText('11')

})