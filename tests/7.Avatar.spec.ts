import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import playwright from "@playwright/test";
dotenv.config();

//Avatar adding to personal Account
test.describe("personal Avatar Updating", async () => {
  test("Avatar testing ", async ({ page }) => {
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

    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_USER_NAME}/settings`.replace(
        /"/g,
        ""
      )
    );
    await page.reload();
    await page
      .getByRole("link", { name: "Settings" })
      .click({ timeout: 20000 });
    await page
      .getByRole("listitem")
      .filter({ hasText: "General" })
      .click({ timeout: 20000 });
    await page.locator('input[type="file"]').click({ timeout: 3000 });
    await page.getByRole('button',{name: "Save"}).nth(2).click();
  });
});
