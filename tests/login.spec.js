import { test, expect } from '@playwright/test';

test.describe("Login", () => {
  test("tests Login", async ({ page }) => {
    await page.setViewportSize({
      width: 1440,
      height: 452
    });
    
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");

    await page.getByPlaceholder("Username").click();
    await page.getByPlaceholder("Username").type("standard_user");
    await page.getByPlaceholder("Password").type("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

  });
});