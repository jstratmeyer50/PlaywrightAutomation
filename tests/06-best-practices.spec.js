// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================================
// Learning: Playwright Best Practices
// ============================================================

test('06-1: Use test fixtures for setup/teardown', async ({ page }) => {
  // The `page` fixture is automatically provided by Playwright
  // It automatically closes after test completes
  
  await page.goto('https://example.com');
  
  await expect(page).toHaveTitle('Example Domain');
  
  // Page automatically closed after this test
  console.log('Test fixture pattern demonstrated');
});

test('06-2: Use meaningful test names', async ({ page }) => {
  // ✓ GOOD: Test name clearly describes what is being tested
  // Test name: "User can see main heading on homepage"
  
  // ✗ BAD: Test name is vague
  // Test name: "test1" or "basic test"
  
  await page.goto('https://example.com');
  
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('Example Domain');
});

test('06-3: One assertion focus per test', async ({ page }) => {
  // Each test should focus on one specific behavior
  // This makes it easy to understand what failed
  
  await page.goto('https://example.com');
  
  // This test ONLY checks if heading is visible
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  
  // ✗ DON'T do this in one test:
  // await expect(heading).toHaveText('Example Domain');
  // await expect(heading).toHaveClass('main-title');
  // (These should be separate tests)
});

test('06-4: Use page object model pattern', async ({ page }) => {
  // PageObject pattern makes tests more maintainable
  // Instead of:
  //   await page.locator('button').click();
  // Do this:
  //   await homePage.clickMainButton();
  
  // Example pattern:
  class PageObject {
    constructor(page) {
      this.page = page;
      this.heading = page.locator('h1');
    }
    
    async goto() {
      await this.page.goto('https://example.com');
    }
    
    async getHeadingText() {
      return await this.heading.textContent();
    }
  }
  
  const homePage = new PageObject(page);
  await homePage.goto();
  const text = await homePage.getHeadingText();
  
  console.log('Page object model pattern demonstrated');
  console.log('Heading:', text);
});

test('06-5: Avoid hardcoded waits (sleep)', async ({ page }) => {
  await page.goto('https://example.com');
  
  // ✗ DON'T: Use hardcoded delays
  // await page.waitForTimeout(2000);
  
  // ✓ DO: Wait for specific condition
  // Option 1: Wait for element visibility
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  
  // Option 2: Wait for specific condition
  await page.waitForFunction(() => {
    return document.readyState === 'complete';
  });
  
  // Option 3: Wait for load state
  await page.waitForLoadState('networkidle');
  
  console.log('Proper waiting demonstrated');
});

test('06-6: Use data-testid selectors when possible', async ({ page }) => {
  // ✓ BEST: Use data-testid (stable, explicit)
  // const button = page.locator('[data-testid="submit-button"]');
  
  // ✓ GOOD: Use role selectors (accessible, semantic)
  const button = page.getByRole('button', { name: 'Submit' });
  
  // ⚠ OKAY: Use text selectors (but can be fragile)
  // const button = page.getByText('Submit');
  
  // ✗ AVOID: CSS/XPath that are brittle
  // const button = page.locator('#form > div.body > button');
  
  console.log('Selector best practices demonstrated');
});

test('06-7: Handle errors gracefully', async ({ page }) => {
  // Instead of letting test fail abruptly, handle known issues
  
  try {
    await page.goto('https://example.com', { timeout: 10000 });
  } catch (error) {
    console.log('Failed to load page:', error.message);
    // Handle the error appropriately
    throw error; // Re-throw if you want test to fail
  }
  
  console.log('Error handling demonstrated');
});

test('06-8: Log meaningful debugging information', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Include context in logs
  console.log('TEST: Verifying page title');
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  
  const heading = page.locator('h1');
  if (await heading.isVisible()) {
    console.log('Heading found:', await heading.textContent());
  } else {
    console.log('ERROR: Heading not visible on page');
  }
});

test('06-9: Use test.describe for test organization', async ({ page }) => {
  // While this is a single test, organize related tests with describe
  // See pattern below (this would be at file level):
  
  // test.describe('Homepage', () => {
  //   test('title should be correct', async ({ page }) => { ... });
  //   test('heading should be visible', async ({ page }) => { ... });
  //   test('links should be clickable', async ({ page }) => { ... });
  // });
  
  console.log('Test organization pattern demonstrated');
});

test('06-10: Use test.beforeEach and test.afterEach', async ({ page }) => {
  // Although hooks are usually at file level, they look like this:
  
  // test.beforeEach(async ({ page }) => {
  //   // Runs before EVERY test in this file
  //   await page.goto('https://example.com');
  // });
  
  // test.afterEach(async ({ page }) => {
  //   // Runs after EVERY test in this file
  //   console.log('Test completed');
  // });
  
  // Then in your tests, you can skip the goto since it's in beforeEach
  
  console.log('Setup/teardown hooks pattern demonstrated');
});

test('06-11: Retry flaky tests intelligently', async ({ page }) => {
  // Configure this at the top of test file or in playwright.config.js
  // This test will retry up to 3 times if it fails
  
  // In playwright.config.js:
  // retries: 2,
  
  // Or in specific test:
  // test.only('Might be flaky', async ({ page }) => { ... });
  
  await page.goto('https://example.com');
  
  // This test should be reliable, so no retries needed
  await expect(page.locator('h1')).toBeVisible();
  
  console.log('Test retry pattern demonstrated');
});

test('06-12: Use expect.soft for non-blocking assertions', async ({ page }) => {
  await page.goto('https://example.com');
  
  // These won't stop the test, all will be checked
  await expect.soft(page.locator('h1')).toBeVisible();
  await expect.soft(page.locator('p')).toHaveCount(2);
  
  // Regular assertion - WILL stop test if fails
  await expect(page).toHaveTitle('Example Domain');
  
  console.log('Soft assertion pattern demonstrated');
});

test('06-13: Skip tests dynamically', async ({ page }) => {
  // Skip entire test based on condition
  const isChrome = test.info().project.name === 'chromium';
  
  if (!isChrome) {
    test.skip();
  }
  
  await page.goto('https://example.com');
  console.log('Test run on Chrome only');
});

test('06-14: Mark test as expected to fail', async ({ page }) => {
  // test.fail() - Mark test as expected to fail
  // If test fails, it's marked as "expected failure" (passes overall)
  // If test passes, it's marked as "unexpected pass" (might fail overall)
  
  // test.fail(true);
  
  await page.goto('https://example.com');
  
  console.log('Expected failure pattern demonstrated');
});

test('06-15: Run tests in specific order with serial execution', async ({ page }) => {
  // By default tests run in parallel
  // For tests that MUST run in order, use test.describe.serial:
  
  // test.describe.serial('Sequential tests', () => {
  //   test('Step 1: Create item', async ({ page }) => { ... });
  //   test('Step 2: Edit item', async ({ page }) => { ... });
  //   test('Step 3: Delete item', async ({ page }) => { ... });
  // });
  
  // Usually you should avoid this - better to make tests independent
  
  console.log('Serial execution pattern demonstrated');
});
