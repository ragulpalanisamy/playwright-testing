//@ts-check
//const { test,expect } = require('@playwright/test');
//login test
test.describe('Login Testing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev-app.formzillion.com/login');
        await page.locator('input[type="email"]').click({ timeout: 10000 });
        await page.locator('input[type="email"]').press('Control+a');
        await page.locator('input[type="email"]').fill('');
        await page.locator('input[type="password"]').click({ timeout: 10000 });
        await page.locator('input[type="password"]').press('Control+a');
        await page.locator('input[type="password"]').fill('Qwerty@123');
        await page.locator('button[type="submit"]').click({ timeout: 10000 });
    });
});