import { test, expect } from '@playwright/test';

test.describe("Checkout", () => {
  test("tests Checkout", async ({ page }) => {
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
    await page.getByRole("button", { name: "Back to products" }).click();
    await page.locator('[data-test="item-0-title-link"]').click();
    await expect(page.locator('.inventory_details_name')).toHaveText("Sauce Labs Bike Light");
    await page.getByRole("button", { name: "Add to cart" }).click();
    await page.getByRole("button", { name: "Back to products" }).click();
    await page.locator('a.shopping_cart_link').click();
    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("First Name").type("John");
    await page.getByPlaceholder("Last Name").type("Doe");
    await page.getByPlaceholder("Zip/Postal Code").type("12345");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.locator('.summary_info_label').first()).toHaveText("Payment Information:");
    await expect(page.locator('.summary_value_label').first()).toHaveText("SauceCard #31337");
    await expect(page.locator('.summary_info_label').nth(1)).toHaveText("Shipping Information:");
    await expect(page.locator('.summary_value_label').nth(1)).toHaveText("Free Pony Express Delivery!");
    await page.getByRole("button", { name: "Finish" }).click();
    await expect(page.locator('.complete-header')).toHaveText("Thank you for your order!");
    
    await page.getByRole("button", { name: "Open Menu" }).click();
    await page.getByRole("link", { name: "Logout" }).click();   
    
    // Verify successful logout
    await expect(page).toHaveURL("https://www.saucedemo.com/"); 

  });
});