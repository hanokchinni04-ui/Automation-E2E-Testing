const {test,expect } = require("@playwright/test");

test('smoke_testing',async ({page})=>{

    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/)
})