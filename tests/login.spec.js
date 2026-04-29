//Automate the login process for demoblaze.com using playwright
const { test, expect } = require('@playwright/test');

test('Login to demoblaze.com', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.demoblaze.com/');

  // Click on the login button to open the login modal
  await page.click('#login2');

  // Wait for the login modal to appear
  await page.waitForSelector('#logInModal');

  // Fill in the username and password fields
  await page.fill('#loginusername', 'your_username');
  await page.fill('#loginpassword', 'your_password');

  // Click the login button within the modal
  await page.click('#logInModal .btn-primary');

  // Wait for the user to be logged in (you can check for a specific element that appears after login)
  await page.waitForSelector('#nameofuser');

  // Assert that the user is logged in by checking for the presence of the username
  const username = await page.textContent('#nameofuser');
  expect(username).toContain('your_username');
});