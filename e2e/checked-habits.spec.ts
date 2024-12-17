import { test, expect } from '@playwright/test';

test('Mark habits as done and verify persistence across days', async ({
  page,
}) => {
  await page.goto('/day/2024-12-04');

  await page.locator('label').filter({ hasText: 'Exercise' }).click();
  await page.locator('label').filter({ hasText: 'Read' }).click();
  await page.locator('label').filter({ hasText: 'Meditate' }).click();

  await page.goto('/day/2024-12-06');
  await page.goto('/day/2024-12-04');

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
