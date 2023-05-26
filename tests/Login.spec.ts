import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
test.describe("Login Testing", () => {
  test("HardCoded email and password", async ({ page }) => {
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    await page.locator('input[type="email"]').click({ timeout: 10000 });
    await page.locator('input[type="email"]').press("Control+a");
    await page.locator('input[type="email"]').fill(`${process.env.USER_EMAIL}`);
    await page.locator('input[type="password"]').click({ timeout: 10000 });
    await page.locator('input[type="password"]').press("Control+a");
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.USER_PASSWORD}`);
    await page.getByText("Remember me").check();
    await page.locator('button[type="submit"]').click({ timeout: 10000 });

    // Add your assertions here using the expect function
    // For example:
    const url = await page.url();
    expect(url).toBe(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
  });
});
