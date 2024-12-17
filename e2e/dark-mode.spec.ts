import { test, expect } from '@playwright/test';

test('Check if the dark mode toggle works', async ({ page }) => {
  await page.goto('/');

  const darkModeToggle = page.getByRole('banner').locator('label span');
  await darkModeToggle.click();

  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  const button = page.getByTestId('add-habit-btn');

  await expect(button).toHaveCSS('background-color', 'rgb(68, 68, 68)'); // #444444 in RGB format

  await darkModeToggle.click();

  await expect(html).not.toHaveClass(/dark/);

  await expect(button).toHaveCSS('background-color', 'rgb(243, 218, 223)'); // Light mode color
});
