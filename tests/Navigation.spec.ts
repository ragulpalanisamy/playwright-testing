import { test } from "@playwright/test";
const playwright = require("@playwright/test");

test.describe("Navigation testing", () => {
  test("user nav section", async ({ page }) => {
    await page.goto("https://dev-app.formzillion.com/login");
    await page.locator('input[type="email"]').fill("demo10956@gmail.com");
    await page.locator('input[type="password"]').fill("Qwerty@123");
    await page.getByText("Remember me").check();
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
    try {
      await page.getByText("Apps").click({ timeout: 20000 });
      await page.getByText("Usage").click({ timeout: 5000 });
      await page.waitForLoadState("networkidle");
      await page.getByText("Activity").click();
      await page.waitForLoadState("networkidle");
      await page.getByText("Settings").click();
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }

    await page.waitForLoadState("networkidle");
    // Setting links testing
    await page
      .getByRole("listitem")
      .filter({ hasText: "General" })
      .click({ timeout: 1000 });
    // await page.waitForLoadState('networkidle');
    await page
      .getByRole("listitem")
      .filter({ hasText: "Teams" })
      .click({ timeout: 1000 });
    // await page.waitForLoadState('networkidle');
    await page
      .getByRole("listitem")
      .filter({ hasText: "Password" })
      .click({ timeout: 1000 });
    // await page.waitForLoadState('networkidle');
    await page
      .getByRole("listitem")
      .filter({ hasText: "Billing" })
      .click({ timeout: 1000 });
    // await page.waitForLoadState('networkidle');
    await page
      .getByRole("listitem")
      .filter({ hasText: "Invoices" })
      .click({ timeout: 1000 });
    // await page.waitForLoadState('networkidle');
    await page
      .getByRole("listitem")
      .filter({ hasText: "Tokens" })
      .click({ timeout: 1000 });
    // await page.waitForLoadState('networkidle');
  });

  test("forms navigation testing", async ({ page }) => {
    await page.goto('https://dev-app.formzillion.com/login');
    await page.locator('input[type="email"]').fill("demo10956@gmail.com");
    await page.locator('input[type="password"]').fill("Qwerty@123");
    await page.getByText("Remember me").check();
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
    await page.goto('https://dev-app.formzillion.com/demo-10956-gmail/2-YBx5GZ?formName=Central+Identity+Agent');
    try {
      await page.getByText("Submissions").click();
      await page.waitForLoadState("networkidle");
      await page.getByText("Reports").click();
      await page.waitForLoadState("networkidle");
      await page.getByText("Setup").click();
      await page.waitForLoadState("networkidle");
      await page.getByText("Workflows").click();
      await page.waitForLoadState("networkidle");
      await page.getByText("Settings").click();
      await page.waitForLoadState("networkidle");
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
});