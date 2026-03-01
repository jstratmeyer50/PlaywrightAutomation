// @ts-checkimport { test, expect } from '@playwright/test';
























































































































});  console.log('Successfully clicked link and navigated');    expect(page.url()).toContain('iana.org');  // Verify we navigated to a new page    await link.click();  const link = page.getByRole('link', { name: 'More information' });  // Find and click the "More information" link    await page.goto('https://example.com');test('01-6: Click elements on page', async ({ page }) => {// ============================================================// TEST 6: Click elements// ============================================================});  console.log('Number of h1 elements:', count);  const count = await page.locator('h1').count();  // Count how many h1 elements exist    // const isChecked = await heading.isChecked();  // Check if element is checked (for checkboxes)    // const isEnabled = await heading.isEnabled();  // Check if element is enabled (for buttons/inputs)    expect(isVisible).toBe(true);  console.log('Heading is visible:', isVisible);  const isVisible = await heading.isVisible();  // Check if element is visible    const heading = page.locator('h1');    await page.goto('https://example.com');test('01-5: Check element visibility and state', async ({ page }) => {// ============================================================// TEST 5: Check element visibility and state// ============================================================});  console.log('Element attributes:', attributes);  }, elementHandle);    }));      value: attr.value      name: attr.name,    return Array.from(el.attributes).map(attr => ({  const attributes = await page.evaluate((el) => {  const elementHandle = await page.$('h1');  // Get all attributes of an element    console.log('Link href:', href);  const href = await link.getAttribute('href');  const link = await page.locator('a');  // Find a link and get its href attribute    await page.goto('https://example.com');test('01-4: Get element attributes', async ({ page }) => {// ============================================================// TEST 4: Element attributes// ============================================================});  expect(heading).toContain('Example');  // Verify we got the expected text    console.log('Paragraphs:', paragraphs);  const paragraphs = await page.locator('p').allTextContents();  // Get all paragraph text    console.log('Heading text:', heading);  const heading = await page.locator('h1').textContent();  // Get the text of the main heading    await page.goto('https://example.com');test('01-3: Extract text content from page', async ({ page }) => {// ============================================================// TEST 3: Get text from elements// ============================================================});  console.log('All locator methods work!');    await expect(roleElement).toBeVisible();  // Verify the element exists and is visible    const textElement = await page.getByText('Example Domain');  // Method 4: Text content    const roleElement = await page.getByRole('heading', { level: 1 });  // Method 3: Role-based selection (recommended - more accessible)    const xpathElement = await page.locator('//h1');  // Method 2: XPath selector    const cssElement = await page.locator('h1');  // Method 1: CSS selector    await page.goto('https://example.com');test('01-2: Select elements using different locators', async ({ page }) => {// ============================================================// TEST 2: Different ways to select elements// ============================================================});  await page.screenshot({ path: 'screenshot.png' });  // Take a screenshot to see what we're looking at    expect(page.url()).toContain('example');  // Check that page has loaded by checking the URL    await page.goto('https://example.com');  // Navigate to a websitetest('01-1: Navigate to website and verify page loaded', async ({ page }) => {// ============================================================// TEST 1: BASICS - Navigation and Element Selection// ============================================================const { test, expect } = require('@playwright/test');
// BASICS: Navigation, assertions, and page properties
test.describe('Basic Navigation and Assertions', () => {
  test('navigate to a page and check title', async ({ page }) => {
    // Navigate to a URL
    await page.goto('https://example.com');
    
    // Get and verify the page title
    const title = await page.title();
    expect(title).toBe('Example Domain');
  });

  test('check page URL', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Verify the current URL
    expect(page.url()).toBe('https://example.com/');
  });

  test('check if element exists and is visible', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Check if heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Get the text content
    const headingText = await heading.textContent();
    expect(headingText).toContain('Example Domain');
  });

  test('check multiple elements', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Count how many paragraph elements exist
    const paragraphs = page.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
    
    // Get text from first paragraph
    const firstParagraphText = await paragraphs.first().textContent();
    expect(firstParagraphText).toBeTruthy();
  });

  test('check element attributes', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Get href attribute from the link
    const link = page.locator('a');
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('use CSS and XPath selectors', async ({ page }) => {
    await page.goto('https://example.com');
    
    // CSS selector - gets by tag name
    await expect(page.locator('h1')).toBeVisible();
    
    // XPath selector - more powerful for complex selections
    await expect(page.locator('//a[@href]')).toBeVisible();
  });

  test('take a screenshot', async ({ page }) => {
    await page.goto('https://example.com');
    
    // Save a screenshot (useful for debugging)
    await page.screenshot({ path: 'example.png' });
  });
});
