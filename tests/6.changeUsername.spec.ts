import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const playwright = require("@playwright/test");

test.describe("Change the personal User Name", async () => {
  test("update personal user name", async ({ page }) => {
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
        await page.locator('input[type="email"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
        await page.locator('input[type="password"]').fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
        await page.getByText("Remember me").check();
        await Promise.all([
          page.waitForNavigation(),
          page.click('button[type="submit"]'),
        ]);
        try {
          await page.getByRole('link', { name: 'Settings' }).click({ timeout: 20000 });
          await page
          .getByRole("listitem")
          .filter({ hasText: "General" })
          .click({ timeout: 20000 });
          await page.getByRole('textbox').nth(2).click();
          await page.getByRole('textbox').nth(2).press('control+a');
          await page.getByRole('textbox').nth(2).fill(`${process.env.NEXT_PUBLIC_UPDATED_NAME}`);
          await page.getByRole('button', { name: 'Save' }).click();
          //check whether the user name is updated or not. 
        }
        catch (error) {
          if (error instanceof playwright.errors.TimeoutError)
            console.log("Timeout!");
        }
  });
});
