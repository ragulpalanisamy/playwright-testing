import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
// Registration Testing
test.describe("Registration Testing", () => {
  test("with hardcoded email and password", async ({ page }) => {
    // Path for registration
    // Listen for the 'dialog' event
    page.on("dialog", async (dialog) => {
      const message = dialog.message();
      console.log("Alert message:", message);

      if (message === "User already registered.") {
        // Perform actions when the expected alert message appears
        console.log("The expected alert message is displayed.");
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
      } else {
        // Perform actions when the expected alert message does not appear
        console.log("The expected alert message is not displayed.");
      }

      // Close the dialog
      await dialog.dismiss();
    });
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
    //await page.waitForLoadState('networkidle');
  });
});
