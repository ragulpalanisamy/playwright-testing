import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Integration testing", async () => {
  test("integration: Webhooks", async ({ page }) => {
    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`.replace(/"/g, ""));
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

    await page.getByRole('link', { name: 'Forms' }).click();
    await page.getByRole("button", { name: "Add New" }).click();
    await page
      .locator('input[name="name"], input[id="name"]');
    await page
      .locator('input[name="name"], input[id="name"]')
      .fill("formzillion-webhooks");
    await page.locator('input[type="email"][name="sendToEmail"]').fill(`${process.env.NEXT_PUBLIC_USER_EMAIL}`.replace(/"/g, ""));
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole("button", { name: "Create" }).click(),
    ]);
    //await page.reload();
    await page.locator('.absolute > a').first().click();
    //await page.getByRole('link', { name: 'Integrations' }).click();
    await page.goto(`${process.env.NEXT_PUBLIC_WEBHOOKS_URL}/integrations`);
    //await page.reload();
    await page.locator('xpath=/html/body/div[2]/div[2]/main/div/div/div[2]/div/div[1]/div/section/div[3]/div/button').click();
    await page.locator('xpath=/html/body/div[3]/div/div/div[1]/span').click();
    await page.getByLabel('Connection Name').fill('demo-formzillion');
    await page.getByLabel('Webhooks Endpoint').fill('https://demo-formzillion.free.beeceptor.com');
    await page.getByRole('button', { name: 'Add' }).click();

    await page.goto(`${process.env.NEXT_PUBLIC_WEBHOOKS_URL}/integrations`);
    
    });
});
