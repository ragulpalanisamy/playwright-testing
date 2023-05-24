import { test } from '@playwright/test';

test.describe('Navigation testing', () => {
  test('nav section', async ({ page }) => {
    await page.goto('https://dev-app.formzillion.com/login');
    await page.locator('input[type="email"]').fill('demo10956@gmail.com');
    await page.locator('input[type="password"]').fill('Qwerty@123');
    await page.getByText('Remember me').check();
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
    try {
      await page.getByText('Apps').click({ timeout: 20000 });
      await page.getByText('Usage').click({ timeout: 5000 });
      await page.waitForLoadState('networkidle');
      await page.getByText('Activity').click();
      await page.waitForLoadState('networkidle');
      await page.getByText('Settings').click();

    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!")
    }



    // Setting links testing
    await page.getByText('General');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Teams');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Password');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Billing');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Invoices');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Tokens');
    // await page.waitForLoadState('networkidle');
  });
});

