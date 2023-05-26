const { test, expect } = require("@playwright/test");
const dotenv = require("dotenv");
dotenv.config();

test.describe("Registration Testing", () => {
  test("with hardcoded email and password", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      await page.locator('input[type="email"]').click();
      await page.locator('input[type="email"]').press("Control+a");
      await page.locator('input[type="email"]').fill(process.env.USER_EMAIL);
      await page.locator('input[type="password"]').click();
      await page.locator('input[type="password"]').press("Control+a");
      await page
        .locator('input[type="password"]')
        .fill(process.env.USER_PASSWORD);

      await page.getByRole("checkbox").check();
      await page.getByRole("button", { name: "Register" }).click();

      await page.waitForTimeout('networkidle'); // Adjust the delay time as needed
      const message = await dialog.defaultValue();
      console.log("Alert message:", message);

      if (message === "User already registered.") {
        console.log("You Already register !.. you will be redirected to login page");
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
      } else {
        console.log("Successfully registered!...");
      }

      await dialog.dismiss();
    });
  });
});
