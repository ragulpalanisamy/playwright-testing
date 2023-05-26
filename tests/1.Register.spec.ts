import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
// Registration Testing
test.describe("Registration Testing", () => {
  test("with hardcoded email and password", async ({ page }) => {
    // Path for registration
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/register`);
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').press("Control+a");
    await page.locator('input[type="email"]').fill(`${process.env.USER_EMAIL}`);
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').press("Control+a");
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.USER_PASSWORD}`);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Register" }).click();
    
    const navigationPromise = page.waitForNavigation();
    const dialogPromise = page.waitForEvent('dialog');

    await Promise.race([navigationPromise, dialogPromise]);

    // Check if a dialog event occurred
    const dialog = await dialogPromise.catch(() => null);
    if (dialog) {
      await dialog.accept();
    }

    // Wait for registration response
    await navigationPromise;

    // Check if user is already registered
    try {
      await page.waitForSelector('.error-message', { state: 'visible' });

      const errorMessageText = await page.textContent('.error-message');
      if (errorMessageText === 'User already registered.') {
        console.log('You are already registered');
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
        return; // Return to exit the test function after redirecting
      }
    } catch (error) {
      console.log('Error occurred while waiting for error message:', error);
    }

    // Continue with the test if no error or not already registered
    console.log('Successfully registered! Check your email');

  });
});
