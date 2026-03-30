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
npx playwright test login
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

