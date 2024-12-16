import { expect, test } from '@playwright/test';

test.skip('navigating through days', async ({ page }) => {
  // Exercise for E2E part:
  // 1. Make sure you are running the app locally.
  // 2. Focus on your test view in VS Code.
  //    - Using UI: Click on the test tube icon in the sidebar.
  //    - Using Command palette: Ctrl+Shift+P and search for "Focus on Playwright View"
  //      (or "Focus on Test Explorer View").
  //    You should see the Playwright section at the bottom of the sidebar.
  //    Note. If you do not see "e2e" or "favorites.spec.ts" in the sidebar, you might
  //    need to reload the window (Ctrl+Shift+P and run the "Reload Window" command).
  // 3. Make sure you have "Show browser" enabled in the Playwright section.
  // 4. Create a new line after this entire comment block and click "Record at cursor".
  //    You might need to scroll inside the Playwright section to see this button.
  //    You should see a new browser window open.
  // 5. Go through what you want to test in the new browser window.
  //    - This test is called "navigating through days" so you should test that you can
  //      navigate through different days and see different images.
  //    - Go to the homepage, click on the date input, pick a date, and click on the new image.
  // 6. Click the red button to stop recording (or "Cancel" in VS Code).
  // 7. A test should end with some sort of assertion - what we expect to see.
  //    Wrap what you want to be as an assertion inside an expect(...).toBeXXX() call.
  //    - For example await page.getByRole('img', { name: '...' }).click();
  //      would become await expect(page.getByRole('img', { name: '...' })).toBeVisible();
  // 8. Remove the `.skip` at the top of this test case. This will enable the test to run.
  // 9. Run the test in the following ways:
  //    - by clicking the play button beside the test name either in this file.
  //      This is very convenient when you are working on a single test.
  //    - in the Playwright section in the sidebar
  //      This is useful when you want to run multiple tests.
  //    - open a new terminal window and run `npm run test:e2e`.
  //      This is the fastest way to check if everything is working as expected.
  //      Also, it does not require you to have the Playwright VS Code extension installed.
  // 10. Your test should pass and you can now continue with the next test.
  //
  // Pro tip. You can use page.goto('/') instead of page.goto('http://localhost:5173/').
  // Note. Since the NASA APOD image is loaded over the internet, it might not load in time
  //       for Playwright to give up on waiting, especially if you have a slow internet connection.
  //       If that becomes an issue, you can increase the timeout for that particular expectation,
  //       i.e. toBeVisible({ timeout: 10000 }).
  //
  // Final test example:
  // await page.goto('/');
  // // additional step to wait until the today's image is loaded, this circumvents some issues
  // // where we are trying to switch to a different image before the first one is loaded
  // await expect(page.getByRole('img')).toBeVisible();
  // await page.getByLabel('Date for the NASA picture of').fill('2024-09-04');
  // await expect(
  //   page.getByRole('img', { name: 'NGC 6995: The Bat Nebula' })
  // ).toBeVisible();
});

test.skip('adding and removing favorite APOD image in the homepage', async ({
  page,
}) => {});

test.skip('seeing favorite APODs in the favorites list', async ({
  page,
}) => {});

test.skip('persisting favorite APOD images across page refreshes', async ({
  page,
}) => {});

// you can add additional tests
