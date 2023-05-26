import { test, expect } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();
// Registration Testing
test.describe('Registration Testing', () => {
    test('with hardcoded email and password', async ({ page }) => {
        // Path for registration
        await page.goto(`${process.env.NEXT_PUBLIC_APP_URL}/register`);
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').press('Control+a');
        await page.locator('input[type="email"]').fill(`${process.env.USER_EMAIL}`);
        await page.locator('input[type="password"]').click();
        await page.locator('input[type="password"]').press('Control+a');
        await page.locator('input[type="password"]').fill(`${process.env.USER_PASSWORD}`);
        await page.getByRole('checkbox').check();
        await page.locator('button[type="submit"]').click();
    });
});


export { test };
