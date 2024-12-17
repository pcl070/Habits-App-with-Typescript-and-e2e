import { test, expect } from '@playwright/test';

test('Add a new category and verify it in the dropdown', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('http://localhost:5173/');

  // Step 2: Go to the "Edit Categories" page
  await page.getByRole('button', { name: 'Edit Categories' }).click();

  // Step 3: Add a new category "Family"
  await page.getByPlaceholder('Enter new category').fill('Family');
  await page.getByRole('button', { name: 'Add Category' }).click();

  // Step 4: Verify "Family" appears in the list
  const newCategory = page.locator('li', { hasText: 'Family' });
  await expect(newCategory).toBeVisible();
});
