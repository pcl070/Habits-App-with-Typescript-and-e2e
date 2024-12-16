import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('Date for the NASA picture of').fill('2024-12-12');
  await expect(page.getByRole('img', { name: "Phaethon's Brood" })).toBeVisible(
    {
      timeout: 10000,
    }
  ); // 10 seconds
});

test('other image', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('Date for the NASA picture of').fill('2024-12-02');
  await expect(
    page.getByRole('img', { name: 'NGC 300: A Galaxy of Stars' })
  ).toBeVisible({
    timeout: 10000,
  });
});
