# Playwright Learning Scripts

This directory contains educational Playwright test scripts to help you learn test automation.

## 📚 Test Files Overview

### [01-basics.spec.js](01-basics.spec.js)
**Learn the fundamentals of Playwright**
- Navigating to websites
- Selecting elements (CSS, XPath, role-based)
- Extracting text from elements
- Reading element attributes
- Checking element visibility
- Clicking links and buttons
- Taking screenshots

**Key concepts:** Page navigation, locators, basic interactions

---

### [02-forms.spec.js](02-forms.spec.js)
**Interact with HTML forms like a real user**
- Filling text input fields
- Submitting forms
- Clicking checkboxes
- Selecting from dropdowns
- Selecting radio buttons
- Clearing and resetting form fields
- Keyboard interactions
- File uploads (pattern)

**Key concepts:** Form automation, user input, keyboard events

---

### [03-assertions.spec.js](03-assertions.spec.js)
**Verify that your application behaves correctly**
- Text assertions (exact match, partial match)
- Visibility assertions
- Element state assertions (enabled, focused)
- URL and page title validation
- Element counting
- Checkbox/radio button states
- Attribute assertions
- Numeric comparisons
- Soft assertions (non-blocking)

**Key concepts:** Test validations, expect statements, failure handling

---

### [04-waiting.spec.js](04-waiting.spec.js)
**Write reliable tests that handle dynamic content**
- Auto-waiting (Playwright's built-in feature)
- Explicit element waiting
- Custom timeouts
- Waiting for navigation
- Waiting for specific URLs
- Waiting for load states
- Polling and retry patterns
- Timeouts (page-level and operation-level)

**Key concepts:** Test reliability, dynamic content, waits vs. hardcoded delays

---

### [05-advanced.spec.js](05-advanced.spec.js)
**Master advanced Playwright features**
- Screenshots and visual debugging
- Element positioning and dimensions
- Scrolling elements
- Hovering and special clicks (double-click, right-click)
- Drag and drop
- JavaScript execution on page
- Dialog handling (alerts, confirms)
- Popup window handling
- Network interception
- Storage (localStorage, sessionStorage, cookies)
- Performance measurement

**Key concepts:** Advanced interactions, debugging, network/storage manipulation

---

### [06-best-practices.spec.js](06-best-practices.spec.js)
**Learn how to write maintainable, professional tests**
- Using fixtures for setup/teardown
- Writing meaningful test names
- Single responsibility principle
- Page Object Model pattern
- Proper waiting strategies
- Selector best practices
- Error handling
- Debugging with logs
- Test organization
- Hooks (beforeEach, afterEach)
- Test retries and skipping
- Serial execution

**Key concepts:** Test design, maintainability, scalability

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run All Tests
```bash
npx playwright test
```

### 3. Run Specific Test File
```bash
# Run basics only
npx playwright test 01-basics

# Run forms tests
npx playwright test 02-forms
```

### 4. Run in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### 5. Run Single Test
```bash
npx playwright test --grep "navigate to a page"
```

### 6. View Interactive Test Report
```bash
npx playwright show-report
```

### 7. Debug Mode (Step Through)
```bash
npx playwright test --debug
```

---

## 📖 Suggested Learning Path

1. **Start here:** `01-basics.spec.js` - Learn how Playwright works
2. **Then:** `02-forms.spec.js` - Interact with forms
3. **Then:** `03-assertions.spec.js` - Verify your tests work correctly
4. **Then:** `04-waiting.spec.js` - Handle real-world delays
5. **Then:** `05-advanced.spec.js` - Use advanced features when needed
6. **Finally:** `06-best-practices.spec.js` - Write professional tests

---

## 💡 Key Playwright Concepts

### Locators (Finding Elements)

```javascript
// By CSS selector
page.locator('h1')

// By XPath
page.locator('//h1')

// By ARIA role (RECOMMENDED)
page.getByRole('heading', { level: 1 })

// By text content
page.getByText('Example Domain')

// By label (for forms)
page.getByLabel('Username')

// By test ID (requires data-testid attribute)
page.getByTestId('submit-button')
```

### Actions (Interacting)

```javascript
// Click
await element.click()

// Type text
await input.fill('text here')
await input.type('slower typing', { delay: 100 })

// Check/Uncheck
await checkbox.check()
await checkbox.uncheck()

// Select dropdown
await dropdown.selectOption('value')

// Double-click
await element.dblclick()

// Right-click
await element.click({ button: 'right' })

// Hover
await element.hover()
```

### Assertions (Validations)

```javascript
// Text
await expect(element).toHaveText('exact text')
await expect(element).toContainText('partial text')

// Visibility
await expect(element).toBeVisible()
await expect(element).toBeHidden()

// State
await expect(element).toBeEnabled()
await expect(element).toBeChecked()

// Count
await expect(locator).toHaveCount(5)

// URL/Title
await expect(page).toHaveTitle('Page Title')
expect(page.url()).toBe('https://example.com')
```

---

## 🎓 Tips for Learning

1. **Run each test individually** - Try running one test at a time to understand it
2. **Modify tests** - Change values, add new assertions, test different sites
3. **Use `--headed` mode** - See what the browser is actually doing
4. **Read the output** - Playwright gives clear error messages about what failed
5. **Check screenshots** - Tests create screenshots that help debugging
6. **Start simple** - Add complexity gradually as you understand concepts

---

## ⚠️ Important Notes

- Tests in this file use public demo websites (example.com, demoqa.com)
- Some tests might fail if websites change
- Use `--headed` mode to see what's actually happening
- Read test comments carefully - they explain each concept

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Locator Best Practices](https://playwright.dev/docs/locators)
- [API Reference](https://playwright.dev/docs/api/class-page)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

## ✅ What You'll Learn

By studying these files, you'll understand:
- How to automate browser interactions
- How to find and interact with web elements
- How to write reliable and maintainable tests
- How to handle real-world scenarios (waiting, navigation, forms)
- Best practices for test automation
- Debugging techniques for failing tests

Happy learning! 🎉
