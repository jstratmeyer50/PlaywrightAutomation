// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================================
// Learning: Assertions and Validations
// Assertions verify that conditions are true (pass/fail tests)
// ============================================================

test('03-1: Text assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  const heading = page.locator('h1');
  
  // Check exact text
  await expect(heading).toHaveText('Example Domain');
  
  // Check partial text
  await expect(heading).toContainText('Example');
  
  // Assert text is NOT something
  // await expect(heading).not.toHaveText('Not this text');
  
  console.log('Text assertions passed');
});

test('03-2: Visibility assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  const heading = page.locator('h1');
  const nonexistent = page.locator('.does-not-exist');
  
  // Check element is visible
  await expect(heading).toBeVisible();
  
  // Check element is hidden/not visible
  await expect(nonexistent).not.toBeVisible();
  
  // Check element is hidden
  // await expect(element).toBeHidden();
  
  console.log('Visibility assertions passed');
});

test('03-3: Element state assertions', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  
  const input = page.locator('#fullName');
  
  // Element is enabled (can interact with it)
  await expect(input).toBeEnabled();
  
  // Element is editable
  await expect(input).toBeFocused();
  await input.focus();
  await expect(input).toBeFocused();
  
  // Note: Better to use toBeEmpty() for form checks
  await expect(input).toHaveValue('');
  
  console.log('Element state assertions passed');
});

test('03-4: URL and page assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Check current URL
  expect(page.url()).toBe('https://example.com/');
  expect(page.url()).toContain('example');
  
  // Check page title
  await expect(page).toHaveTitle('Example Domain');
  
  console.log('URL and page assertions passed');
});

test('03-5: Count and existence assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  const paragraphs = page.locator('p');
  
  // Check element count
  await expect(paragraphs).toHaveCount(2);
  
  // Get actual count
  const count = await paragraphs.count();
  console.log('Number of paragraphs:', count);
  expect(count).toBeGreaterThan(0);
  
  console.log('Count assertions passed');
});

test('03-6: Checkbox and radio assertions', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button');
  
  // Check if checkbox is checked
  const radioButton = page.locator('input[name="like"]').first();
  
  // Click to check/select
  await radioButton.click();
  
  // Verify it's checked
  await expect(radioButton).toBeChecked();
  
  console.log('Checkbox assertions passed');
});

test('03-7: Attribute assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  const link = page.locator('a').first();
  
  // Check element has a specific attribute
  await expect(link).toHaveAttribute('href', /iana.org/);
  
  // Check attribute contains text
  const href = await link.getAttribute('href');
  expect(href).toContain('iana');
  
  console.log('Attribute assertions passed');
});

test('03-8: Custom numeric assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  const paragraphs = page.locator('p');
  const count = await paragraphs.count();
  
  // Use standard JS expect for numeric values
  expect(count).toBe(2);
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThan(10);
  expect(count).toBeGreaterThanOrEqual(2);
  
  console.log('Numeric assertions passed');
});

test('03-9: Multiple assertions (one failure stops test)', async ({ page }) => {
  await page.goto('https://example.com');
  
  // All these must pass for test to continue
  await expect(page).toHaveTitle('Example Domain');
  await expect(page.locator('h1')).toBeVisible();
  expect(page.url()).toContain('example');
  
  // If ANY assertion fails, test stops here and fails the entire test
  
  console.log('All assertions passed - test continues');
});

test('03-10: Soft assertions (failures don\'t stop test)', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Use .soft to continue test even if assertion fails
  await expect.soft(page).toHaveTitle('Wrong Title');  // This fails but test continues
  await expect.soft(page.locator('h1')).toHaveText('Wrong Text');  // This fails but test continues
  await expect(page.url()).toContain('example');  // This passes
  
  // Test completes and reports ALL failures, not just the first one
  console.log('Test completed with soft assertions');
});
