//@ts-check
const { test, expect } = require('@playwright/test');

//registeration testing
test.describe('Registeration testing', () => {
  test('with hardcoded email and password', async ({ page }) => {
    //path for registeration
    await page.goto('https://dev-app.formzillion.com/register');

  })
  
});
