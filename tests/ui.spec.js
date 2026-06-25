const { test, expect } = require('@playwright/test');
const { HomePage }     = require('../Pages/homePage');
const { CartPage }     = require('../Pages/cartPage');
const { ContactPage }  = require('../Pages/contactPage');
const userData         = require('../test-data/users.json');

test.describe('UI', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.closeAdIfPresent();
    await expect(homePage.logo).toBeVisible();
  });


  
   
  test('TC7: Verify Test Cases Page', async ({ page }) => {
    const homePage = new HomePage(page);

    // Step 1 - Click Test Cases button
    await page.getByRole('link', { name: 'Test Cases', exact: true }).click();
    await homePage.closeAdIfPresent();

    // Step 2 - Verify user navigated to test cases page
    await expect(page).toHaveURL('/test_cases');
    await expect(page.locator('h2.title.text-center')).toBeVisible();
    });

    test('TC10: Verify Subscription in Home Page', async ({ page }) => {
    const homePage = new HomePage(page);
    const subscription = userData.subscription;

    

    // Step 2 - Verify SUBSCRIPTION text visible
    await expect(homePage.subscribeHeading).toBeVisible();

    // Step 3 - Enter email and click subscribe
    await homePage.subscribeWithEmail(subscription.email);

    // Step 4 - Verify success message
    await expect(homePage.subscribeSuccess).toBeVisible();
    });

    test('TC11: Verify Subscription in Cart Page', async ({ page }) => {
      const homePage   = new HomePage(page);
      const cartPage   = new CartPage(page);
      const subscription = userData.subscription;

      // Step 1 - Click Cart button
      await homePage.navigateToCart();
      await homePage.closeAdIfPresent();

      // Step 2 - Verify cart page displayed
      await expect(page).toHaveURL('/view_cart');

      // Step 3 - Scroll down to footer
      await cartPage.subscribeWithEmail(subscription.email);

      // Step 4 - Verify SUBSCRIPTION text visible
      await expect(cartPage.subscriptionHeading ).toBeVisible();

      // Step 5 - Verify success message
      await expect(cartPage.subscribeSuccess).toBeVisible();
      });
  

});