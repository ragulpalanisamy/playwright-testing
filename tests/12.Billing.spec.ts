import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

let playwright = require('@playwright/test'); 
test.describe("test for Invoices", async () => {
  test("Invoices Testing", async ({ page }) => {
    await page.goto(
      `${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, "")
    );
    await page
      .locator('input[type="email"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await page
      .locator('input[type="password"]')
      .fill(`${process.env.NEXT_PUBLIC_USER_PASSWORD}`.replace(/"/g, ""));
    await page.locator('input[type="checkbox"]').check();
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);
    try {
      await page.getByRole('link', { name: 'Settings' }).click();
      await page.getByRole("link", { name: "Billing" }).click();
      await page
        .getByText(
          "Demo 10956 GmailFreeDocsToggle themeDemo 10956 GmailFreeToggle themeOpen menudem"
        )
        .click();
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });

  test("billing page", async ({ page }) => {
    try {
      await page
        .locator(".FullscreenContent > div > div:nth-child(2) > div")
        .click();
      await page.locator('[data-test="update-subscription"]').click();
      await page
        .locator("div")
        .filter({ hasText: /^Basic\$5\.00 per monthSelect$/ })
        .getByRole("button", { name: "Select" })
        .click();
      await page.getByTestId("confirm").click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("1234 1234 1234 1234")
        .click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("1234 1234 1234 1234")
        .fill("4242 4242 4242 4242");
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("MM / YY")
        .click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("MM / YY")
        .fill("06 / 24");
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("CVC")
        .click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("CVC")
        .fill("345");
      await page.getByTestId("confirm").click();
      await page.goto(
        "https://billing.stripe.com/p/session/test_YWNjdF8xTWV0OE5JVWIzV3FKU0lzLF9Oemdua05rNzhWU2toNDVtTktXMTZqcWpMMWozVTVk01001YdJvl5K"
      );
      await page.goto(
        "https://dev-app.formzillion.com/demo-10956-gmail/settings/billing"
      );
    } catch (error) {
      if (error instanceof playwright.errors.TimeoutError)
        console.log("Timeout!");
    }
  });
});
