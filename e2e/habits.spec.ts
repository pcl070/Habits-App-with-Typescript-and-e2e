import { test, expect } from '@playwright/test';

test('Add a new habit and verify it appears', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Enter new habit name').fill('Workout');

  const addHabitDropdown = page.getByTestId('category-select').nth(1);
  await addHabitDropdown.selectOption('Health');

  const addButton = page.getByTestId('add-habit-btn');
  await expect(addButton).toBeVisible();
  await expect(addButton).toBeEnabled();

  await addButton.click();

  const habitItem = page
    .locator('div')
    .filter({ hasText: /^Workout$/ })
    .first();

  await expect(habitItem).toBeVisible();
});
