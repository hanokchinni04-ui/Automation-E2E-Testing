class CartPage 
{
    constructor(page)
    {
        this.page  = page


        //cart-title

        this.cartHeading = page.getByText('Shopping Cart');

        //cart-box
        this.cartRows            = page.locator('#cart_info_table tbody tr');
        this.productNames        = page.locator('.cart_description h4').getByRole('link');
        this.productPrices       = page.locator('.cart_price p');
        this.productQuantity     = page.locator('.cart_quantity button');
        this.productTotal        = page.locator('.cart_total_price');
        this.deleteProductBtn    = page.locator('a.cart_quantity_delete');
        this.productImages       = page.locator('.cart_item img');


        //  Checkout 
        this.proceedToCheckoutBtn  = page.locator('.check_out');
        this.registerLoginLink = page.locator('.modal-body').getByRole('link', { name: 'Register / Login' });

        // Empty Cart 
        this.emptyCartMsg          = page.locator('b:has-text("Cart is empty!")');
        this.continueShoppingBtn   = page.getByRole('link', { name: 'here' });
       
        // ── Subscription ─────────────────────────────────────────
        this.subscriptionHeading   = page.locator('h2:has-text("Subscription")');
        this.subscribeEmail        = page.locator('#susbscribe_email');
        this.subscribeBtn          = page.locator('#subscribe');
        this.subscribeSuccess      = page.locator('#success-subscribe');

    
        }


        async goto()
        {
            await this.page.goto('/view_cart');
        }

        //delete- products

        async removeProduct (index)
        {
            await this.deleteProductBtn.nth(index).click()
        }

        //get-product-details

        async getProductName(index) {
            return await this.productNames.nth(index).innerText();
        }
        async getProductQuantity(index) {
            return await this.productQuantity.nth(index).innerText();
        }
        async getProductPrice(index) {
            return await this.productPrices.nth(index).innerText();
        }
        async getProductTotal(index) {
            return await this.productTotal.nth(index).innerText();
        }

        //checkout
        async proceedToCheckout() {
            await this.proceedToCheckoutBtn.click();
        }

        //click register/login

        async clickRegisterLogin() {
            await this.registerLoginLink.waitFor({ state: 'visible' });
            await this.registerLoginLink.click();
        }

        //subscription
        async subscribeWithEmail(email)
        {
           // await this.page.evalute(() => window.scrollTo(0, document.body.scrollHeight));
            await this.subscribeEmail.fill(email);
            await this.subscribeBtn.click();
        }
}

module.exports = { CartPage}