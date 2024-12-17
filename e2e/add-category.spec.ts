import { test, expect } from '@playwright/test';

test('Add a new category and verify it in the dropdown', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('button', { name: 'Edit Categories' }).click();

  await page.getByPlaceholder('Enter new category').fill('Family');
  await page.getByRole('button', { name: 'Add Category' }).click();

  const newCategory = page.locator('li', { hasText: 'Family' });
  await expect(newCategory).toBeVisible();
});
