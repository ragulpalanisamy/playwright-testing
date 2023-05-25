import { expect } from "@playwright/test";
import { test } from "@playwright/test";
const playwright = require("@playwright/test");

test.describe("deleting the form testing", async () => {
  test("personal forms deletion", async ({ page }) => {
    try {
        await page.goto("https://dev-app.formzillion.com/login");
        await page.locator('input[type="email"]').fill("demo10956@gmail.com");
        await page.locator('input[type="password"]').fill("Qwerty@123");
        await page.getByText("Remember me").check();
        await page.locator('button[type="submit"]').click({ timeout: 10000 });
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveURL(
          "https://dev-app.formzillion.com/demo-10956-gmail"
        );
        await page.goto('https://dev-app.formzillion.com/demo-10956-gmail/qckSH1Pm', { timeout: 1000});
        await page.waitForLoadState('networkidle');
        await page.getByText('Settings').click( { timeout: 10000 });
        await page.waitForLoadState('networkidle');
        await page.getByRole("listitem").filter({ hasText: "General" }).click({ timeout: 10000 });
        await page.waitForLoadState('networkidle');
        await page.getByRole('button',{name: "Delete Form"}).click({ timeout: 10000 });
        await page.locator('input[name="name",id="name"]').fill('Demo Form');
        await page.getByRole('button', {name: 'Continue'});
        await page.waitForLoadState('networkidle');
    }
    catch (error) {
        if (error instanceof playwright.error.name)
          console.log("please check your form name..");
      }
  });
});
