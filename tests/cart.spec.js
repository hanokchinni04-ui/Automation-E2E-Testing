const { test, expect } = require('@playwright/test');
const { HomePage }     = require('../Pages/homePage');
const { ProductPage }  = require('../Pages/productPage');
const { CartPage }     = require('../Pages/cartPage');
const { LoginPage }    = require('../Pages/loginPage');
const userData         = require('../test-data/users.json');


test.describe('test',()=>{
    test.beforeEach(async({page})=>{
        await page.context().clearCookies();
        const homePage = new HomePage(page);
        await homePage.goto();
        await homePage.closeAdIfPresent();
        await expect(homePage.logo).toBeVisible();
    })
    
    test('Tc12: Add products to cart', async ({page})=>{
        const homePage    = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage    = new CartPage(page);

        // Navigate to products page
        await homePage.navigateToProducts();
        await homePage.closeAdIfPresent();

        // Hover over first product and add to cart
        await productPage.hoverAndAddToCart(0);
        await productPage.continueShopping();

        // Hover over second product and add to cart
        await productPage.hoverAndAddToCart(1);
        await productPage.viewCartFromModal();

        // Verify two products are added to cart
        await expect(cartPage.cartRows).toHaveCount(2);

        // Verify names
        const product1Name = await cartPage.getProductName(0);
        const product2Name = await cartPage.getProductName(1);
        expect(product1Name).toBeTruthy();
        expect(product2Name).toBeTruthy();

        // Verify prices
        const product1Price = await cartPage.getProductPrice(0);
        const product2Price = await cartPage.getProductPrice(1);
        expect(product1Price).toBeTruthy();
        expect(product2Price).toBeTruthy();

        // Verify quantities
        const product1Qty = await cartPage.getProductQuantity(0);
        const product2Qty = await cartPage.getProductQuantity(1);
        expect(product1Qty).toBe('1');
        expect(product2Qty).toBe('1');

        // Verify totals
        const product1Total = await cartPage.getProductTotal(0);
        const product2Total = await cartPage.getProductTotal(1);
        expect(product1Total).toBeTruthy();
        expect(product2Total).toBeTruthy();
    });

    test('TC13: verify product quantity', async ({page})=>{
        const homePage    = new HomePage(page);
        const cartPage    = new CartPage(page);
        const productPage = new ProductPage(page);

        // Click view product
        await productPage.viewProduct(0);
        await homePage.closeAdIfPresent();

        // Verify product detail page is opened
        await expect(page).toHaveURL(/product_details/);

        // Set quantity to 4
        await productPage.setQuantity(4);

        // Click add to cart
        await productPage.addToCartFromDetail();
        await productPage.viewCartFromModal();

        // Verify quantity in cart
        const qty = await cartPage.getProductQuantity(0);
        expect(qty).toBe('4');
    });

    test('TC17: Remove Products From Cart', async ({ page }) => {
        const homePage    = new HomePage(page);
        const productPage = new ProductPage(page);
        const cartPage    = new CartPage(page);

        // Navigate to Products page
        await homePage.navigateToProducts();
        await homePage.closeAdIfPresent();

        // Add a product to cart
        await productPage.hoverAndAddToCart(0);
        await productPage.viewCartFromModal();

        // Verify product is in cart
        await expect(cartPage.cartRows).toHaveCount(1);

        // Remove product
        await cartPage.removeProduct(0);

        // Verify cart is empty
        await expect(cartPage.emptyCartMsg).toBeVisible();
    });

  test('TC20: Search Products and Verify Cart After Login', async ({ page }) => {
    const homePage    = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage    = new CartPage(page);
    const search      = userData.searchProduct;

    // Navigate to Products page
    await homePage.navigateToProducts();
    await homePage.closeAdIfPresent();

    // Search for a product
    await productPage.searchProduct(search.name);
    await homePage.closeAdIfPresent();
    await expect(productPage.searchedHeading).toBeVisible();

    //  actually add a searched product to cart so cart has data
    await productPage.hoverAndAddToCart(0);
    await productPage.viewCartFromModal();

    // Verify products visible in cart
    await expect(cartPage.cartRows.first()).toBeVisible();
});

    test('TC22: Add to Cart from Recommended Items', async ({ page }) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        // Verify Recommended Items section is visible
        await expect(homePage.recommendedSection).toBeVisible();

        // Add first recommended product to cart
        await homePage.addRecommendedProductToCart(0);
        await homePage.viewCartFromModal();

        // Verify product is in cart
        await expect(cartPage.cartRows).toHaveCount(1);
        await expect(cartPage.productNames.first()).toBeVisible();
    });
});