//Automate the about us on demoblaze.com using playwright
const { test, expect } = require('@playwright/test');

test('About Us page on demoblaze.com', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('https://www.demoblaze.com/');

  // Click on the "About us" link
  await page.click('text=About us');

  // Verify that the modal is visible
  const modalVisible = await page.isVisible('#videoModal');
  expect(modalVisible).toBe(true);

  // Close the modal
  await page.click('#videoModal .close');
}); 
