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

    // Verify successful login
    await expect(page).toHaveURL(/.*inventory.html/);
    
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page.locator('.inventory_details_name')).toHaveText("Sauce Labs Backpack");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await page.getByRole("button", { name: "Remove" }).click();
    await page.getByRole("button", { name: "Back to products" }).click();
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.getByRole("link", { name: "Logout" }).click();   
    
    // Verify successful logout
    await expect(page).toHaveURL("https://www.saucedemo.com/"); 

  });
});