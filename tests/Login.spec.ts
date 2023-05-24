import { test, expect } from '@playwright/test';

// Login Testing
test.describe('Login Testing', () => {
    test('HardCoded email and password',async ({ page }) => {
        await page.goto('https://dev-app.formzillion.com/login');
        await page.locator('input[type="email"]').click({ timeout: 10000 });
        await page.locator('input[type="email"]').press('Control+a');
        await page.locator('input[type="email"]').fill('demo10956@gmail.com');
        await page.locator('input[type="password"]').click({ timeout: 10000 });
        await page.locator('input[type="password"]').press('Control+a');
        await page.locator('input[type="password"]').fill('Qwerty@123');
        await page.getByText('Remember me').check();
        await page.locator('button[type="submit"]').click({ timeout: 10000 });
    });
});

export { test };
