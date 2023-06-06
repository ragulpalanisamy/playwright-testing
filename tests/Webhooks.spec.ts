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
    
    await page.goto(`${process.env.NEXT_PUBLIC_WEBHOOKS_URL}/integrations`);

    // Check if the connection is already established
    const isConnected = await page.locator('xpath=/html/body/div[2]/div[2]/main/div/div/div[2]/div/div[1]/div/section/div[1]/div[1]').innerText() === 'Connected';
    
    if (isConnected) {
      // Disconnect the connection
      await page.locator('xpath=/html/body/div[2]/div[2]/main/div/div/div[2]/div/div[1]/div/section/div[3]/div/button').click();
      await page.locator('xpath=/html/body/div[3]/div/div/div[1]/span').click();
      //reconnect
      await page.getByRole('menuitem', { name: 'Reconnect' }).click();
    } else {
      // Connect the connection
      await page.locator('xpath=/html/body/div[2]/div[2]/main/div/div/div[2]/div/div[1]/div/section/div[3]/div/button').click();
      await page.getByRole('menuitem', { name: 'Reconnect' }).click();
      await page.getByLabel('Connection Name').fill('demo-formzillion');
      await page.getByLabel('Webhooks Endpoint').fill('https://demo-formzillion.free.beeceptor.com');
      await page.getByRole('button', { name: 'Add' }).click();
      await page.setDefaultNavigationTimeout(20000);
       // Test case for disconnect
      await page.getByRole('menuitem', { name: 'Disconnect' }).click();
    }
    
    await page.goto(`${process.env.NEXT_PUBLIC_WEBHOOKS_URL}/integrations`);
    await page.reload();
    
  });
});
