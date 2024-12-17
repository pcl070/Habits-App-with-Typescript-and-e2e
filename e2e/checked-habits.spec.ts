import { test, expect } from '@playwright/test';

test('Mark habits as done and verify persistence across days', async ({
  page,
}) => {
  // Step 1: Go to the specific day
  await page.goto('http://localhost:5173/day/2024-12-04');

  // Step 2: Locate and mark habits as done by clicking on their label
  await page.locator('label').filter({ hasText: 'Exercise' }).click();
  await page.locator('label').filter({ hasText: 'Read' }).click();
  await page.locator('label').filter({ hasText: 'Meditate' }).click();

  // Step 3: Navigate to a different day and back
  await page.goto('http://localhost:5173/day/2024-12-06');
  await page.goto('http://localhost:5173/day/2024-12-04');

  // Step 4: Verify that the 'checked' indicator (path inside SVG) is visible for each habit
  const exercisePath = page
    .locator('label')
    .filter({ hasText: 'Exercise' })
    .locator('svg path');
  await expect(exercisePath).toBeVisible();

  const readPath = page
    .locator('label')
    .filter({ hasText: 'Read' })
    .locator('svg path');
  await expect(readPath).toBeVisible();

  const meditatePath = page
    .locator('label')
    .filter({ hasText: 'Meditate' })
    .locator('svg path');
  await expect(meditatePath).toBeVisible();
});
