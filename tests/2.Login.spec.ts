import { test, expect } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

test.describe("Login Testing", () => {
  test("USER_LOGIN", async ({ page }) => {
    console.log("USER_EMAIL:", process.env.USER_EMAIL);
    console.log("USER_PASSWORD:", process.env.USER_PASSWORD);
    console.log("USER_NAME:", process.env.USER_NAME);

    await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/login`);
    await page.fill('input[type="email"]', `${process.env.USER_EMAIL}`);
    await page.fill('input[type="password"]', `${process.env.USER_PASSWORD}`);
    await page.check('input[type="checkbox"][name="rememberMe"]');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]'),
    ]);

    const url = page.url();
    console.log(url);

    const expectedURL = `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.USER_NAME}`;
    expect(url).toBe(expectedURL);

    if (url === expectedURL) {
      console.log("Successfully logged in!");
      // If the URL matches the expected URL, you can navigate to the expectedURL
      await page.goto(expectedURL);
      await page.waitForLoadState('networkidle');
    } else {
      console.log("Check whether you have entered the correct login credentials.");
    }
  });
});
