const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");
dotenv.config();

test.describe("Registration Testing", () => {
  test("with hardcoded email and password", async ({ page }) => {
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/register`.replace(/"/g, ""));
      await page.locator('input[type="email"]').click();
      await page.locator('input[type="email"]').press("Control+a");
      await page.locator('input[type="email"]').fill(`${process.env.USER_EMAIL}`.replace(/"/g, ""));
      await page.locator('input[type="password"]').click();
      await page.locator('input[type="password"]').press("Control+a");
      await page.locator('input[type="password"]').fill(`${process.env.USER_PASSWORD}`.replace(/"/g, ""));

      await page.getByRole("checkbox").check();
      await page.getByRole("button", { name: "Register" }).click();

      // Wait for an alert dialog
    const dialog = await page.waitForEvent('dialog');

    // Extract the alert message
    const alertMessage = dialog.message();

    // Check the alert message
    if (alertMessage.includes("User already registered.")) {
      console.log("User is already registered.");
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
      // Perform the necessary actions if the user is already registered
    } else {
      console.log("User registration successful.");
      console.log('check your mail to verify the registration!..');
      // Perform the necessary actions if the user registration is successful
    }

     
  });
});
