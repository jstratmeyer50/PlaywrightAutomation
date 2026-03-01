// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================================
// Learning: Working with Forms
// ============================================================

test('02-1: Fill out a text input field', async ({ page }) => {
  // Visit a practice form site
  await page.goto('https://demoqa.com/text-box');
  
  // Find input by label text and fill it
  const fullNameInput = page.locator('#fullName');
  await fullNameInput.fill('John Doe');
  
  // Verify the text was entered
  const value = await fullNameInput.inputValue();
  expect(value).toBe('John Doe');
  
  console.log('Text input filled successfully');
});

test('02-2: Fill multiple form fields', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  
  // Fill multiple fields in sequence
  await page.locator('#fullName').fill('John Doe');
  await page.locator('#userEmail').fill('john@example.com');
  await page.locator('#currentAdress').fill('123 Main Street, New York');
  await page.locator('#permanentAdress').fill('456 Oak Avenue, Boston');
  
  // Click submit button
  await page.locator('#submit').click();
  
  // Verify form was submitted - look for success message
  const output = page.locator('.border');
  await expect(output).toBeVisible();
  
  console.log('Form submitted successfully');
});

test('02-3: Interact with checkboxes', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');
  
  // Check a checkbox
  const checkbox = page.locator('label').filter({ hasText: 'Documents' }).first();
  await checkbox.click();
  
  // Verify it's checked
  const isChecked = await checkbox.locator('input').isChecked();
  expect(isChecked).toBe(true);
  
  console.log('Checkbox checked successfully');
});

test('02-4: Select from dropdown', async ({ page }) => {
  await page.goto('https://demoqa.com/select-menu');
  
  // Select by visible text
  const dropdown = page.locator('#oldSelectMenu');
  await dropdown.selectOption('10');
  
  // Verify selection
  const selected = await dropdown.inputValue();
  console.log('Selected value:', selected);
  
  // For modern select dropdowns, you might need to click and select
  const modernDropdown = page.locator('#react-select-2-input');
  if (await modernDropdown.isVisible()) {
    await modernDropdown.click();
    await page.getByText('Mr.', { exact: true }).click();
  }
  
  console.log('Dropdown selection completed');
});

test('02-5: Work with radio buttons', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button');
  
  // Click radio button by label
  const yesRadio = page.locator('label').filter({ hasText: 'Yes' });
  await yesRadio.click();
  
  // Verify it's selected
  const input = yesRadio.locator('input');
  const isChecked = await input.isChecked();
  expect(isChecked).toBe(true);
  
  console.log('Radio button selected successfully');
});

test('02-6: Clear and reset form fields', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  
  // Fill a field
  const input = page.locator('#fullName');
  await input.fill('John Doe');
  expect(await input.inputValue()).toBe('John Doe');
  
  // Clear the field
  await input.clear();
  expect(await input.inputValue()).toBe('');
  
  // Type character by character (slower, more realistic)
  await input.type('Jane Smith', { delay: 100 });
  expect(await input.inputValue()).toBe('Jane Smith');
  
  console.log('Form field cleared and retyped');
});

test('02-7: Press keyboard keys', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  
  const input = page.locator('#fullName');
  
  // Focus on input
  await input.click();
  
  // Type some text
  await input.type('Hello');
  
  // Press specific keys
  await input.press('End');  // Move to end
  await input.press('Backspace');  // Delete last character
  await input.press('Control+A');  // Select all
  await input.press('Delete');  // Delete all
  
  expect(await input.inputValue()).toBe('');
  
  console.log('Keyboard interactions completed');
});

test('02-8: Work with file uploads', async ({ page }) => {
  // Note: This example shows the pattern, may need actual file
  // await page.goto('https://demoqa.com/upload-download');
  
  // // Set input type=file value
  // const fileInput = page.locator('#uploadFile');
  // await fileInput.setInputFiles('path/to/local/file.txt');
  
  // // Verify file was selected
  // expect(fileInput).toHaveValue(/file\.txt/);
  
  console.log('File upload pattern demonstrated');
});
