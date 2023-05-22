// @ts-check
const { test, expect } = require('@playwright/test');

//Title testing
test.describe('Title testing', () => {
  test('title as mention in the title tag', async ({ page }) => {
    await page.goto('https://dev-app.formzillion.com/login');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Formzillion - Instant backend for all your forms/);
  });
})



//regiter testing
test.describe('Register form', () => {
  test('regiteration test', async ({ page }) => {
    await page.goto('https://dev-app.formzillion.com/register');
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').press('Control+a');
    await page.locator('input[type="email"]').fill('ragulpalanisamy1001@gmail.com');
    await page.locator('input[type="password"]').click();
    await page.locator('input[type="password"]').press('Control+a');
    await page.locator('input[type="password"]').fill('Ragul1432@');
    await page.getByRole('checkbox').check();
    await page.locator('button[type="submit"]').click();
  })
});

test.describe('Login Testing', () => {
 test.beforeEach(async ({page}) => {
    await page.goto('https://dev-app.formzillion.com/login');
    await page.locator('input[type="email"]').click({ timeout: 10000 });
    await page.locator('input[type="email"]').press('Control+a');
    await page.locator('input[type="email"]').fill('ragulpalanisamy1001@gmail.com');
    await page.locator('input[type="password"]').click({ timeout: 10000 });
    await page.locator('input[type="password"]').press('Control+a');
    await page.locator('input[type="password"]').fill('Ragul1432@');
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
  });

  test('nav section', async ({page}) => {
    await page.getByText('Apps').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Usage').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Activity').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Settings').click();

    // Setting links testing
    await page.getByText('General');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Teams');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Password');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Billing');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Invoices');
    // await page.waitForLoadState('networkidle');
    await page.getByText('Tokens');
    // await page.waitForLoadState('networkidle');
   });
});

test.describe('Forms',()=>{
//users forms 
  test('form filltering in the search bar',async({page})=>{
    await page.goto("https://dev-app.formzillion.com/ragulpalanisamy-1001-gmail");
    await page.locator('input[type="email"]').fill('ragulpalanisamy1001@gmail.com');
    await page.locator('input[type="password"]').fill('Ragul1432@');
    await page.locator('button[type="submit"]').click({ timeout: 10000 });

    await page.getByText("Forms");
    await page.locator('input[id="search"]').clear();
    await page.locator('input[id="search"]').fill('Zillion Stack');
    await page.locator('input[id="search"]').clear();
    await page.locator('input[id="search"]').fill('Zilliofnn');
    await page.locator('input[id="search"]').clear();
    await page.locator('input[id="search"]').fill('Customer Feedback');
    await page.locator('input[id="search"]').clear();
  })
  //forms filtering for teams
  test('teams-1 forms filtering', async({page})=>{
    await page.goto("https://dev-app.formzillion.com/zillion-stack");
    await page.locator('input[type="email"]').fill('ragulpalanisamy1001@gmail.com');
    await page.locator('input[type="password"]').fill('Ragul1432@');
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
    //filtering forms in the search bar
    await page.getByText("Forms");
    await page.locator('input[id="search"]').clear();
    await page.locator('input[id="search"]').fill('Zillion Stack');
  });
  test('teams-2 forms filtering', async({page})=>{
    await page.goto("https://dev-app.formzillion.com/web-development");
    await page.locator('input[type="email"]').fill('ragulpalanisamy1001@gmail.com');
    await page.locator('input[type="password"]').fill('Ragul1432@');
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
    //filtering forms in the search bar
    await page.getByText("Forms");
    await page.locator('input[id="search"]').clear();
    await page.locator('input[id="search"]').fill('Zillion Stack');
  });
});

test.describe('Teams Testing', () => {
  test('teams testing', async ({ page }) => {
    await page.goto("https://dev-app.formzillion.com/zillion-stack");
    await page.locator('input[type="email"]').fill('ragulpalanisamy1001@gmail.com');
    await page.locator('input[type="password"]').fill('Ragul1432@');
    await page.locator('button[type="submit"]').click({ timeout: 10000 });
//navigation of the teams
    await page.getByText('Apps').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Usage').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Activity').click();
    await page.waitForLoadState('networkidle');
    await page.getByText('Settings').click();

    await page.getByText('General');
    //await page.waitForLoadState('networkidle');
    await page.getByText('Members');
    //await page.waitForLoadState('networkidle');
    await page.getByText('Billing');
    //await page.waitForLoadState('networkidle');
    await page.getByText('Invoices');
    //await page.waitForLoadState('networkidle');
  })
});
