import { test, expect } from '@playwright/test';

test('Add a new habit and verify it appears', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('/');

  // Step 2: Fill in the habit name
  await page.getByPlaceholder('Enter new habit name').fill('Workout');

  // Step 3: Select a category from the correct dropdown
  // Use the second dropdown for "Select Category" (add a habit)
  const addHabitDropdown = page.getByTestId('category-select').nth(1);
  await addHabitDropdown.selectOption('Health');

  // Step 4: Check that the 'Add' button is visible and enabled
  const addButton = page.getByTestId('add-habit-btn');
  await expect(addButton).toBeVisible();
  await expect(addButton).toBeEnabled();

  // Step 5: Click the 'Add' button
  await addButton.click();

  // Step 6: Verify the new habit "Workout" appears in the list
  const habitItem = page
    .locator('div')
    .filter({ hasText: /^Workout$/ }) // Find a div with the text "Workout"
    .first();

  await expect(habitItem).toBeVisible();
});
