//Automate the checkout process on demoblaze.com using playwright
const { test, expect } = require('@playwright/test');

test('Checkout process on demoblaze.com', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.demoblaze.com/');

  // Click on the first product (e.g., "Samsung galaxy s6")
  await page.click('text=Samsung galaxy s6');

  // Click on "Add to cart" button
  await page.click('text=Add to cart');

  // Wait for the alert and accept it
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // Click on the "Cart" link
  await page.click('text=Cart');

  // Click on "Place Order" button
  await page.click('text=Place Order');

  // Fill in the order form
  await page.fill('#name', 'John Doe');
  await page.fill('#country', 'USA');
  await page.fill('#city', 'New York');
  await page.fill('#card', '1234 5678 9012 3456');
  await page.fill('#month', '12');
  await page.fill('#year', '2025');

  // Click on "Purchase" button
  await page.click('text=Purchase');

  // Verify that the order was placed successfully
  const confirmationText = await page.textContent('.sweet-alert h2');
  expect(confirmationText).toBe('Thank you for your purchase!');
});