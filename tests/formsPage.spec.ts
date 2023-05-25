import { expect } from "@playwright/test";
import { test } from "@playwright/test";

test.describe("Forms page", async () => {
  test("search bar and add new button", async ({ page }) => {
    await page.goto("https://dev-app.formzillion.com/login");
    await page.locator('input[type="email"]').fill("demo10956@gmail.com");
    await page.locator('input[type="password"]').fill("Qwerty@123");
    await page.getByText("Remember me").check();
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL('https://dev-app.formzillion.com/demo-10956-gmail');
  });
});
