import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();
test.describe("Login Testing", () => {
  test("USER_C", async ({ page }) => {
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
   
    await page.waitForNavigation();

    const url = await page.url();
    console.log(url);

    const expectedURL = `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.USER_NAME}`;
    expect(url).toBe(expectedURL);

    if (url === expectedURL) {
      console.log("Successfully logged in!");
      // If the URL matches the expected URL, you can navigate to the expectedURL
      await page.goto(expectedURL);
    } else {
      console.log("Check whether you have entered the correct login credentials.");
    }
  });
});
