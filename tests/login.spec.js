import { test, expect } from '@playwright/test';

test.describe("Login", () => {
  test("tests Login", async ({ page }) => {
    
    await page.setViewportSize({
          width: 1440,
          height: 452
        })
    test('has title', async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveTitle("Swag Labs");
    });

    /* await page.locator("[data-test='username']").click()
    await page.locator("[data-test='username']").type("standard_");
    await page.locator("[data-test='username']").type("standard_user");
    await page.locator("[data-test='password']").type("secret_sauce");
    await page.locator("[data-test='login-button']").click() */
    
  });
});
