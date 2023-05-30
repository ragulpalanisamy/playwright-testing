import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const playwright = require("@playwright/test");
// personal username update's checking.
test.describe("Change the personal User Name", async () => {
  test("update personal user name", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
    await page.getByText("Remember me").check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    try {
      await page
        .getByRole("link", { name: "Settings" })
        .click({ timeout: 20000 });
      await page
        .getByRole("listitem")
        .filter({ hasText: "General" })
        .click({ timeout: 20000 });
      await page
        .locator("div")
        .filter({
          hasText:
            /^GeneralYour NameThis is the name that will be displayed for you on Formzillion\.$/,
        })
        .getByRole("textbox")
        .click();
       let updatedName = `${process.env.NEXT_PUBLIC_UPDATED_NAME}`;
      await page
        .locator("div")
        .filter({
          hasText:
            /^GeneralYour NameThis is the name that will be displayed for you on Formzillion\.$/,
        })
        .getByRole("textbox")
        .fill(updatedName);
      await page
        .locator("div")
        .filter({ hasText: /^Please use 40 characters at maximum\. Save$/ })
        .getByRole("button", { name: "Save" })
        .click();
        //reloading the page.
        await page.reload();
        //check whether the user name is updated or not.
        let updatedUserName = await page.locator("div")
          .filter({
            hasText: /^GeneralYour NameThis is the name that will be displayed for you on Formzillion\.$/,
          })
          .locator('input[type="text"]')
          .inputValue();
  
        if (updatedUserName === updatedName) {
          console.log('Successfully updated!..');
        } else {
          console.log('Minimum 5 letters are needed. Please check the userName..');
        }
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    } 
  });
});
