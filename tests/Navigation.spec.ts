import {test} from '@playwright/test';

test.describe('Navigation testing', () => {
test('nav section', async ({ page }) => {
    await page.getByText('Apps').click();
    await page.getByText('Usage').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Activity').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Settings').click();

 
  });
});
