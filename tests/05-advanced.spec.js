// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================================
// Learning: Advanced Playwright Features
// ============================================================

test('05-1: Screenshot for debugging', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Take screenshot of entire page
  await page.screenshot({ path: 'full-page.png' });
  
  // Take screenshot of specific element
  const heading = page.locator('h1');
  await heading.screenshot({ path: 'heading.png' });
  
  console.log('Screenshots saved');
});

test('05-2: Get element dimensions and position', async ({ page }) => {
  await page.goto('https://example.com');
  
  const heading = page.locator('h1');
  
  // Get bounding box (x, y, width, height)
  const box = await heading.boundingBox();
  console.log('Element position and size:', box);
  
  // Get just the bounding box for a specific element
  if (box) {
    console.log(`Element is ${box.width}px wide and ${box.height}px tall`);
    console.log(`Position: x=${box.x}, y=${box.y}`);
  }
});

test('05-3: Scroll elements into view', async ({ page }) => {
  await page.goto('https://example.com');
  
  const heading = page.locator('h1');
  
  // Scroll element into viewport
  await heading.scrollIntoViewIfNeeded();
  
  // Scroll to specific coordinates
  await page.evaluate(() => window.scrollBy(0, 100));
  
  console.log('Scrolling completed');
});

test('05-4: Hover over elements', async ({ page }) => {
  await page.goto('https://example.com');
  
  const link = page.locator('a').first();
  
  // Hover to trigger hover effects
  await link.hover();
  
  // Perform action after hover
  await page.waitForTimeout(500); // Wait a bit for animation
  await link.click();
  
  console.log('Hovered and clicked element');
});

test('05-5: Double-click elements', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');
  
  const doubleClickButton = page.locator('#doubleClickBtn');
  
  // Double-click element
  await doubleClickButton.dblclick();
  
  // Verify the result
  const message = page.locator('#doubleClickMessage');
  await expect(message).toContainText('double');
  
  console.log('Double-click successful');
});

test('05-6: Right-click (context menu)', async ({ page }) => {
  await page.goto('https://demoqa.com/buttons');
  
  const rightClickButton = page.locator('#rightClickBtn');
  
  // Right-click element
  await rightClickButton.click({ button: 'right' });
  
  // Verify the result
  const message = page.locator('#rightClickMessage');
  await expect(message).toContainText('right');
  
  console.log('Right-click successful');
});

test('05-7: Drag and drop', async ({ page }) => {
  // Example pattern for drag and drop
  await page.goto('https://example.com');
  
  // Drag element to specific coordinates
  const element = page.locator('a').first();
  // await element.dragTo(page.locator('h1'));
  
  console.log('Drag and drop pattern demonstrated');
});

test('05-8: Execute JavaScript on page', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Run JavaScript and get result
  const pageTitle = await page.evaluate(() => {
    return document.title;
  });
  console.log('Page title from JS:', pageTitle);
  
  // Run JavaScript with parameters
  const result = await page.evaluate((name) => {
    return `Hello, ${name}!`;
  }, 'Playwright');
  console.log('JS result:', result);
  
  // Modify DOM with JavaScript
  await page.evaluate(() => {
    document.body.style.backgroundColor = 'lightblue';
  });
  
  console.log('JavaScript execution completed');
});

test('05-9: Handle JavaScript dialogs (alert, confirm)', async ({ page }) => {
  page.on('dialog', dialog => {
    console.log(`Dialog type: ${dialog.type()}`);
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept(); // Click OK
  });
  
  // Trigger an alert
  await page.evaluate(() => alert('Hello!'));
  
  console.log('Alert handled');
});

test('05-10: Handle page popups', async ({ page, context }) => {
  // Set up listener for new pages (popups)
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.goto('https://example.com')
  ]);
  
  // Work with the popup
  console.log('Popup URL:', popup.url());
  await popup.close();
  
  console.log('Popup handled');
});

test('05-11: Network interception and mocking', async ({ page }) => {
  // Intercept and modify requests
  await page.route('**/*', route => {
    const request = route.request();
    console.log('Intercepted URL:', request.url());
    
    // Continue the request
    route.continue();
  });
  
  await page.goto('https://example.com');
  
  console.log('Network interception demonstrated');
});

test('05-12: Wait and handle network requests', async ({ page }) => {
  // Wait for response from specific URL
  const responsePromise = page.waitForResponse(response =>
    response.url().includes('api.github.com')
  );
  
  // Trigger the request (this is just an example)
  await page.goto('https://example.com');
  
  // Wait for the response
  // const response = await responsePromise;
  // console.log('Response status:', response.status());
  
  console.log('Network response handling demonstrated');
});

test('05-13: Local storage and session storage', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Set local storage
  await page.evaluate(() => {
    localStorage.setItem('testKey', 'testValue');
  });
  
  // Set session storage
  await page.evaluate(() => {
    sessionStorage.setItem('sessionKey', 'sessionValue');
  });
  
  // Read from local storage
  const value = await page.evaluate(() => {
    return localStorage.getItem('testKey');
  });
  console.log('Local storage value:', value);
  
  // Clear storage
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  
  console.log('Storage operations completed');
});

test('05-14: Handle cookies', async ({ page, context }) => {
  // Add cookies
  await context.addCookies([
    {
      name: 'testCookie',
      value: 'testValue',
      url: 'https://example.com'
    }
  ]);
  
  await page.goto('https://example.com');
  
  // Get all cookies
  const cookies = await context.cookies();
  console.log('Cookies:', cookies);
  
  // Get specific cookie value
  const cookieValue = await page.evaluate(() => {
    return document.cookie;
  });
  console.log('Cookie string:', cookieValue);
});

test('05-15: Measure page performance', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const perfData = window.performance.getEntriesByType('navigation')[0];
    return {
      domReady: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      pageLoad: perfData.loadEventEnd - perfData.loadEventStart,
      totalTime: perfData.loadEventEnd - perfData.fetchStart
    };
  });
  
  console.log('Performance metrics:', metrics);
  console.log(`DOM Ready time: ${metrics.domReady}ms`);
  console.log(`Page Load time: ${metrics.pageLoad}ms`);
  console.log(`Total time: ${metrics.totalTime}ms`);
});
