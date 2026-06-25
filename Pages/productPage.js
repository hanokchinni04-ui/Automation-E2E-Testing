const { expect } = require('@playwright/test');

class ProductPage {
    constructor(page) {
        this.page = page;

        // Page Heading
        this.allProductsHeading = page.locator('h2.title.text-center:has-text("All Products")');

        // Search
        this.searchInput      = page.locator('#search_product');
        this.searchBtn        = page.locator('#submit_search');
        this.searchedHeading  = page.locator('h2:has-text("Searched Products")');
        this.searchedProducts = page.locator('.productinfo');

        // Product Cards
        this.productCards     = page.locator('.single-products');
        this.productImages    = page.locator('.productinfo img');
        this.productNames     = page.locator('.productinfo p');
        this.productPrices    = page.locator('.productinfo h2');
        this.addToCartBtns    = page.locator('.productinfo .add-to-cart');
        this.viewProductLinks = page.getByRole('link', { name: 'View Product' });

        // Cart Modal — all scoped inside #cartModal
        this.cartModal        = page.locator('#cartModal');
        this.modalTitle       = page.locator('#cartModal h4.modal-title');
        this.modalViewCartBtn = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
        this.modalContinueBtn = page.locator('#cartModal').getByRole('button', { name: 'Continue Shopping' });

        // Product Detail Page
        this.productDetailName        = page.locator('.product-information h2');
        this.productDetailCategory    = page.locator('.product-information p').first();
        this.productDetailPrice       = page.locator('.product-information span span');
        this.productDetailAvailability = page.locator('p:has-text("Availability")');
        this.productDetailCondition   = page.locator('p:has-text("Condition")');
        this.productDetailBrand       = page.locator('p:has-text("Brand")');
        this.quantityInput            = page.locator('#quantity');
        this.addToCartDetailBtn       = page.locator('button:has-text("Add to cart")');

        // Review Section
        this.writeReviewHeading = page.locator('a:has-text("Write Your Review")');
        this.reviewName         = page.locator('#name');
        this.reviewEmail        = page.locator('#email');
        this.reviewText         = page.locator('#review');
        this.reviewSubmitBtn    = page.locator('#button-review');
        this.reviewSuccessMsg   = page.locator('div.alert-success span');

        // Category Sidebar
        this.categorySection    = page.locator('.left-sidebar');

        this.womenCategory      = page.getByRole('link', { name: 'Women', exact: true });
        this.womenDress         = page.getByRole('link', { name: 'Dress', exact: true }).first();
        this.womenTops          = page.getByRole('link', { name: 'Tops', exact: true }).first();
        this.womenSaree         = page.getByRole('link', { name: 'Saree', exact: true });

        this.menCategory        = page.getByRole('link', { name: 'Men', exact: true });
        this.menTshirts         = page.getByRole('link', { name: 'Tshirts', exact: true });
        this.menJeans           = page.getByRole('link', { name: 'Jeans', exact: true }).first();

        this.kidsCategory       = page.getByRole('link', { name: 'Kids', exact: true });
        this.kidsDress          = page.getByRole('link', { name: 'Dress', exact: true }).last();
        this.kidsTopsShirts     = page.getByRole('link', { name: 'Tops & Shirts' });

        this.categoryPageHeading = page.locator('h2.title.text-center');

        // Brands Sidebar
        // NOTE: brand links render with a leading product count, e.g. "(6)Polo",
        // so we rely on getByRole's default substring match (no `exact: true`).
        this.brandsSidebar      = page.locator('.brands_products');
        this.brandsHeading      = page.locator('.brands_products h2');
        this.brandPolo          = page.getByRole('link', { name: 'Polo' });
        this.brandHM            = page.getByRole('link', { name: 'H&M' });
        this.brandMadame        = page.getByRole('link', { name: 'Madame' });
        this.brandMastHarbour   = page.getByRole('link', { name: 'Mast & Harbour' });
        this.brandBabyhug       = page.getByRole('link', { name: 'Babyhug' });
        this.brandAllenSolly    = page.getByRole('link', { name: 'Allen Solly Junior' });
        this.brandKookieKids    = page.getByRole('link', { name: 'Kookie Kids' });
        this.brandBiba          = page.getByRole('link', { name: 'Biba' });
        this.brandPageHeading   = page.locator('.features_items h2.title');

        // Subscription
        this.subscriptionHeading = page.locator('h2:has-text("Subscription")');
        this.subscribeEmail      = page.locator('#susbscribe_email'); // verify typo in DOM
        this.subscribeBtn        = page.locator('#subscribe');
        this.subscribeSuccess    = page.locator('#success-subscribe');
    }

    // Navigation
    async goto() {
        await this.page.goto('/products');
    }

    // Search
    async searchProduct(name) {
        await this.searchInput.fill(name);
        await this.searchBtn.click();
    }

    // Product Card Actions
    async hoverAndAddToCart(index) {
        await this.productCards.nth(index).hover();
        await this.addToCartBtns.nth(index).click();
    }

    async viewProduct(index) {
        await this.viewProductLinks.nth(index).click();
    }

    // Modal Actions — wait for the Bootstrap modal to finish its fade-in
    // (the "show" class is added to #cartModal itself once the animation completes)
    async continueShopping() {
        await this.cartModal.waitFor({ state: 'visible' });
        await expect(this.cartModal).toHaveClass(/show/);
        await this.modalContinueBtn.click();
    }

    async viewCartFromModal() {
        await this.cartModal.waitFor({ state: 'visible' });
        await expect(this.cartModal).toHaveClass(/show/);
        await this.modalViewCartBtn.click();
    }

    // Product Detail Actions
    async setQuantity(qty) {
        await this.quantityInput.clear();
        await this.quantityInput.fill(String(qty));
    }

    async addToCartFromDetail() {
        await this.addToCartDetailBtn.click();
    }

    // Review Actions
    async submitReview(name, email, review) {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.reviewName.fill(name);
        await this.reviewEmail.fill(email);
        await this.reviewText.fill(review);
        await this.reviewSubmitBtn.click();
    }

    // Category Actions
    async clickWomenCategory() {
        await this.womenCategory.click();
        await this.womenDress.waitFor({ state: 'visible' });
    }
    async clickMenCategory() {
        await this.menCategory.click();
        await this.menTshirts.waitFor({ state: 'visible' });
    }
    async clickKidsCategory() {
        await this.kidsCategory.click();
        await this.kidsDress.waitFor({ state: 'visible' });
    }

    // Brand Actions
    async clickBrand(brandName) {
        await this.page.locator(`a[href="/brand_products/${brandName}"]`).click();
    }

    // Subscription Actions
    async subscribeWithEmail(email) {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.subscribeEmail.fill(email);
        await this.subscribeBtn.click();
    }
}

module.exports = { ProductPage };