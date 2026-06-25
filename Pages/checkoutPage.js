class CheckoutPage
{
    constructor(page)
    {
        this.page = page

        // ── Address Details ──────────────────────────────────────
        this.deliveryAddressHeading  = page.locator('#address_delivery h3');
        this.deliveryFullName        = page.locator('#address_delivery .address_firstname');
        this.deliveryCompany         = page.locator('#address_delivery .address_company');
        this.deliveryAddress1        = page.locator('#address_delivery .address_address1').nth(0);
        this.deliveryAddress2        = page.locator('#address_delivery .address_address1').nth(1);
        this.deliveryCity            = page.locator('#address_delivery .address_city');
        this.deliveryCountry         = page.locator('#address_delivery .address_country_name');
        this.deliveryPhone           = page.locator('#address_delivery .address_phone');

        this.billingAddressHeading   = page.locator('#address_invoice h3');
        this.billingFullName         = page.locator('#address_invoice .address_firstname');
        this.billingCompany          = page.locator('#address_invoice .address_company');
        this.billingAddress1         = page.locator('#address_invoice .address_address1').nth(0);
        this.billingAddress2         = page.locator('#address_invoice .address_address1').nth(1);
        this.billingCity             = page.locator('#address_invoice .address_city');
        this.billingCountry          = page.locator('#address_invoice .address_country_name');
        this.billingPhone            = page.locator('#address_invoice .address_phone');



        // ── Order Review ─────────────────────────────────────────
        this.orderReviewHeading  = page.locator('h2:has-text("Review Your Order")');
        this.cartProductNames    = page.locator('.cart_description h4').getByRole('link');
        this.cartProductPrices   = page.locator('.cart_price p');
        this.cartProductQty      = page.locator('.cart_quantity button');
        this.cartProductTotal    = page.locator('.cart_total_price');

        // ── Comment & Place Order ─────────────────────────────────
        this.commentBox          = page.locator('textarea.form-control');
        this.placeOrderBtn       = page.getByRole('link', { name: 'Place Order' });

        // ── Payment Form ─────────────────────────────────────────
        this.paymentHeading      = page.locator('h2:has-text("Payment")');
        this.nameOnCard          = page.locator('input[data-qa="name-on-card"]');
        this.cardNumber          = page.locator('input[data-qa="card-number"]');
        this.cvc                 = page.locator('input[data-qa="cvc"]');
        this.expiryMonth         = page.locator('input[data-qa="expiry-month"]');
        this.expiryYear          = page.locator('input[data-qa="expiry-year"]');
        this.payConfirmBtn       = page.getByRole('button', { name: 'Pay and Confirm Order' }).or(page.locator('button[data-qa="pay-button"]'));

        // ── Order Confirmation ────────────────────────────────────
        this.orderPlacedHeading = page.getByRole('heading', { name: 'Order Placed!' });
        this.orderSuccessMsg    = page.getByText('Congratulations! Your order has been confirmed!');
        this.downloadInvoiceBtn  = page.getByRole('link', { name: 'Download Invoice' });
        this.continueBtn         = page.locator('a[data-qa="continue-button"]');



    }

     // ── Navigation ───────────────────────────────────────────
        async goto() {
        await this.page.goto('/checkout');
        }

    // ── Address Getters ───────────────────────────────────────
        async getDeliveryFullName() {
        return await this.deliveryFullName.innerText();
        }

        async getDeliveryAddress1() {
        return await this.deliveryAddress1.innerText();
        }

        async getDeliveryCity() {
        return await this.deliveryCity.innerText();
        }

        async getDeliveryCountry() {
        return await this.deliveryCountry.innerText();
        }

        async getBillingFullName() {
        return await this.billingFullName.innerText();
        }

        async getBillingAddress1() {
        return await this.billingAddress1.innerText();
        }

        // ── Order Review Actions ──────────────────────────────────
        async getProductName(index) {
        return await this.cartProductNames.nth(index).innerText();
        }

        async getProductPrice(index) {
        return await this.cartProductPrices.nth(index).innerText();
        }

        async getProductQty(index) {
        return await this.cartProductQty.nth(index).innerText();
        }

        async getProductTotal(index) {
        return await this.cartProductTotal.nth(index).innerText();
        }

    // ── Comment & Place Order ─────────────────────────────────
        async addComment(comment) {
        await this.commentBox.fill(comment);
        }

        async placeOrder() {
        await this.placeOrderBtn.click();
        }

    // ── Payment Actions ───────────────────────────────────────
        async fillPaymentDetails(data) {
        await this.nameOnCard.fill(data.nameOnCard);
        await this.cardNumber.fill(data.cardNumber);
        await this.cvc.fill(data.cvc);
        await this.expiryMonth.fill(data.expiryMonth);
        await this.expiryYear.fill(data.expiryYear);
        }

        async confirmPayment() {
        await this.payConfirmBtn.click();
        }

        async downloadInvoice() {
        await this.downloadInvoiceBtn.click();
        }

        async clickContinue() {
        await this.continueBtn.click();
        }


}

module.exports = { CheckoutPage };