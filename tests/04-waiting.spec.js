// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================================
// Learning: Waiting for Elements and Conditions
// Critical for reliable tests when content loads dynamically
// ============================================================

test('04-1: Auto-waiting (automatic element waiting)', async ({ page }) => {
  // Playwright automatically waits for elements up to timeout before failing
  // Default timeout is 30 seconds
  
  await page.goto('https://demoqa.com/buttons');
  
  // This automatically waits for element to appear (up to 30s)
  await page.locator('#doubleClickBtn').click();
  
  console.log('Auto-waiting demonstrated');
});

test('04-2: Wait for element to be visible', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');
  
  const button = page.locator('#doubleClickBtn');
  
  // Wait for element to be visible (up to 30 seconds)
  await button.waitFor({ state: 'visible' });
  
  console.log('Element is now visible and ready to interact');
});

test('04-3: Wait for element to be hidden', async ({ page }) => {
  await page.goto('https://example.com');
  
  // After some action, you might want to wait for a loading spinner to disappear
  // const loadingSpinner = page.locator('.loading-spinner');
  // await loadingSpinner.waitFor({ state: 'hidden' });
  
  console.log('Waiting for hidden state works pattern demonstrated');
});

test('04-4: Wait for specific condition (custom waiting)', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Wait until a specific condition is true
  await page.waitForFunction(() => {
    return document.readyState === 'complete';
  });
  
  console.log('Page is fully loaded');
});

test('04-5: Set and use custom timeout', async ({ page }) => {
  await page.goto('https://example.com');
  
  const element = page.locator('h1');
  
  // Custom timeout for this specific action (in milliseconds)
  await element.click({ timeout: 10000 }); // 10 seconds
  
  console.log('Clicked with custom timeout');
});

test('04-6: Wait for navigation', async ({ page }) => {
  await page.goto('https://example.com');
  
  const link = page.getByRole('link', { name: 'More information' });
  
  // Wait for navigation to complete after clicking
  await Promise.all([
    page.waitForNavigation(),
    link.click()
  ]);
  
  // New page has loaded
  console.log('Successfully navigated to:', page.url());
});

test('04-7: Wait for specific URL', async ({ page }) => {
  await page.goto('https://example.com');
  
  const link = page.getByRole('link', { name: 'More information' });
  await link.click();
  
  // Wait for URL to change to specific pattern
  await page.waitForURL(/iana.org/);
  
  console.log('URL changed as expected');
});

test('04-8: Wait for console message', async ({ page }) => {
  const messagePromise = page.waitForEvent('console');
  
  await page.goto('https://example.com');
  
  // Execute script that logs to console
  await page.evaluate(() => console.log('Hello from page'));
  
  // Wait for the console message
  const message = await messagePromise;
  console.log('Console message received:', message.text());
});

test('04-9: Wait for load state', async ({ page }) => {
  // Wait for different load states
  await page.goto('https://example.com');
  
  // domcontentloaded: DOM is parsed
  await page.waitForLoadState('domcontentloaded');
  
  // load: page and all resources loaded
  await page.waitForLoadState('load');
  
  // networkidle: no more than 2 network connections (good for dynamic content)
  await page.waitForLoadState('networkidle');
  
  console.log('Page fully loaded');
});

test('04-10: Wait for element count', async ({ page }) => {
  await page.goto('https://example.com');
  
  const paragraphs = page.locator('p');
  
  // Wait until we have specific number of elements
  await page.waitForFunction(() => {
    return document.querySelectorAll('p').length >= 2;
  });
  
  const count = await paragraphs.count();
  console.log('Found expected number of paragraphs:', count);
});

test('04-11: Timeout configuration', async ({ page }) => {
  // Set timeout for all operations on this page (in milliseconds)
  page.setDefaultTimeout(15000); // 15 seconds
  
  await page.goto('https://example.com');
  
  // This will use the 15 second timeout
  await page.locator('h1').click();
  
  console.log('Operation completed with custom page timeout');
});

test('04-12: Polling/Retry pattern', async ({ page }) => {
  const maxRetries = 3;
  let retries = 0;
  let success = false;
  
  await page.goto('https://example.com');
  
  // Keep trying until success or max retries
  while (retries < maxRetries && !success) {
    try {
      const element = page.locator('h1');
      await expect(element).toBeVisible({ timeout: 5000 });
      success = true;
      console.log('Element found on attempt', retries + 1);
    } catch (error) {
      retries++;
      if (retries < maxRetries) {
        console.log('Retry attempt', retries);
        await page.reload();
      }
    }
  }
  
  expect(success).toBe(true);
});
