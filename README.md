# Playwright Automation Tests

Automated end-to-end testing suite for [demoblaze.com](https://www.demoblaze.com/) using Playwright.

## 📋 Overview

This project contains automated tests for core user workflows on the demoblaze e-commerce platform, including user authentication, product checkout, and general site navigation.

## 🧪 Test Suite

- **login.spec.js** - User login/authentication tests
- **checkout.spec.js** - Shopping cart and checkout workflow tests
- **about_us.spec.js** - About Us page validation tests

## 🛠️ Tech Stack

- **Playwright** v1.58.2 - Browser automation and testing framework
- **Node.js** - Runtime environment
- **CommonJS** - Module system

## ⚙️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PlaywrightAutomation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🚀 Running Tests

### Run all tests (headless mode)
```bash
npm test
```

### Run tests with browser visible
```bash
npm run test:headed
```

### Debug mode with step-through
```bash
npm run test:debug
```

### Interactive UI mode
```bash
npm run test:ui
```

## 📁 Project Structure

```
PlaywrightAutomation/
├── tests/
│   ├── login.spec.js          # Login automation tests
│   ├── checkout.spec.js       # Checkout workflow tests
│   └── about_us.spec.js       # About Us page tests
├── playwright.config.js       # Playwright configuration
├── global-setup.ts            # Global setup/teardown
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 📊 Test Reports

After running tests, view the report:
```bash
npx playwright show-report
```

Reports are generated in the `playwright-report/` directory.

## 🔧 Configuration

The `playwright.config.js` file contains test configuration including:
- Browser types (Chromium, Firefox, WebKit)
- Timeout settings
- Retry logic
- Output directories

## ⚠️ Notes

- Update test credentials in the test files before running against production
- Tests are configured to run in headless mode by default
- Playwright automatically downloads required browser binaries on first run

## 📝 License

ISC
