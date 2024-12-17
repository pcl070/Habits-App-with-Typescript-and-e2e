import { test, expect } from '@playwright/test';

test('Check if the dark mode toggle works', async ({ page }) => {
  await page.goto('/');

  // Click the dark mode toggle button
  const darkModeToggle = page.getByRole('banner').locator('label span');
  await darkModeToggle.click();

  // Check if the 'dark' class is applied to the HTML element
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);

  // Select the specific button with 'data-testid="add-habit-btn"'
  const button = page.getByTestId('add-habit-btn');

  // Verify the background color in dark mode
  await expect(button).toHaveCSS('background-color', 'rgb(68, 68, 68)'); // #444444 in RGB format

  // Click the dark mode toggle again
  await darkModeToggle.click();

  // Verify the 'dark' class is removed from the HTML element
  await expect(html).not.toHaveClass(/dark/);

  // Verify the button background color returns to regular mode
  await expect(button).toHaveCSS('background-color', 'rgb(243, 218, 223)'); // Light mode color
});
