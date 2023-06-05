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
   
      await page.getByRole('link', { name: 'Settings' }).click();
      await page.getByRole("link", { name: "Billing" }).click();
      await page.getByRole('link', {name: "Billing Portal"}).click();
  
      await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/${process.env.NEXT_PUBLIC_BILLING_URL}`.replace(/"/g, ""));

      await page.locator('[data-test="update-subscription"]').click();
      await page.locator('div').filter({ hasText: /^Standard\$10\.00 per monthSelect$/ }).getByRole('button', { name: 'Select' }).click();
      await page.goto(`${process.env.NEXT_PUBLIC_BILLING_PLAN}`.replace(/"/g, ""));
      await page.getByTestId('confirm').click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("1234 1234 1234 1234")
        .click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("1234 1234 1234 1234")
        .fill(`${process.env.NEXT_PUBLIC_MASTER_CARD}`.replace(/"/g, ""));
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("MM / YY")
        .click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("MM / YY")
        .fill(`${process.env.NEXT_PUBLIC_MASTER_DATE}`.replace(/"/g, ""));
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("CVC")
        .click();
      await page
        .frameLocator('iframe[name="__privateStripeFrame32712"]')
        .getByPlaceholder("CVC")
        .fill(`${process.env.NEXT_PUBLIC_CVC}`);
      await page.getByTestId("confirm").click();
      await page.goto(
        "https://dev-app.formzillion.com/demo-10956-gmail/settings/billing"
      );
      await page.reload();
  });
});
