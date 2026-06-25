class HomePage
{
    constructor(page)
    {
        this.page = page

        //navbar

        this.home       = page.locator('a[href="/"]').first()
        this.signupLoginBtn  = page.locator('a[href="/login"]')
        this.productsBtn  = page.locator('a[href="/products"]')
        this.cartBtn = page.locator('#header a[href="/view_cart"]')
        this.logoutBtn    = page.locator('a[href="/logout"]')
        this.delete     = page.locator('a[href="/delete_account"]')
        this.contactUsBtn    = page.locator('a[href="/contact_us"]')
       this.loggedUser = page.locator('#header a:has-text("Logged in as")');

        //home
        this.logo       = page.locator('#header .logo')
        this.slider     = page.locator('#slider-carousel')
        this.subHeading = page.getByText('Full-Fledged practice website for Automation Engineers');
        this.prevArrow  = page.locator('[data-slide="prev"]')
        this.nextArrow  = page.locator('[data-slide="next"]')



        //category 

        this.categorySection    = page.locator('.left-sidebar');
        this.womenSection       = page.getByRole('link', { name: 'Women', exact: true })
        this.womenDress         = page.getByRole('link', { name: 'Dress', exact: true }).first()
        this.womenTops          = page.getByRole('link', { name: 'Tops', exact: true }).first()
        this.womenSaree         = page.getByRole('link', { name: 'Saree', exact: true })
        this.menSection         = page.getByRole('link', { name: 'Men', exact: true })
        this.menTshirts         = page.getByRole('link', { name: 'Tshirts', exact: true })
        this.menJeans           = page.getByRole('link', { name: 'Jeans', exact: true }).first()
        this.kidsSection        = page.getByRole('link', { name: 'Kids', exact: true })
        this.kidsDress          = page.getByRole('link', { name: 'Dress', exact: true }).last()
        this.kidsTopsShirts     = page.getByRole('link', { name: 'Tops & Shirts' })
        

        //brands

        this.brandsSidebar      = page.locator('.brands_products');
        this.brandPolo          = page.getByRole('link', { name: 'Polo' })
        this.brandHM            = page.getByRole('link', { name: 'H&M' })
        this.brandMadame        = page.getByRole('link', { name: 'Madame' })
        this.brandMastHarbour   = page.getByRole('link', { name: 'Mast & Harbour' })
        this.brandBabyhug       = page.getByRole('link', { name: 'Babyhug' })
        this.brandAllenSolly    = page.getByRole('link', { name: 'Allen Solly Junior' })
        this.brandKookieKids    = page.getByRole('link', { name: 'Kookie Kids' })
        this.brandBiba          = page.getByRole('link', { name: 'Biba' })


        //featured products

        this.featuredHeading    = page.locator('h2.title.text-center');
        this.productCards       = page.locator('.productinfo');
        this.addToCartBtns      = page.locator('.productinfo .add-to-cart');
        this.viewProductLinks   = page.locator('a:has-text("View Product")');


        //cart- modal

        this.addedModal         = page.locator('#cartModal')
        this.modalText          = page.locator('#cartModal .modal-title')
        this.modalViewCartBtn   = page.locator('#cartModal').getByRole('link', { name: 'View Cart' })
        this.modalContinueBtn   = page.locator('#cartModal').getByRole('button', { name: 'Continue Shopping' })

        //recommended items
         this.recommendedSection    = page.locator('h2:has-text("recommended items")');
        this.recommendedCarousel   = page.locator('#recommended-item-carousel');
        this.recommendedAddToCart  = page.locator('#recommended-item-carousel .add-to-cart');

        //subscribe
         this.subscribeHeading   = page.locator('h2:has-text("Subscription")');
         this.subscribeEmail     = page.locator('#susbscribe_email');
         this.subscribeBtn       = page.locator('#subscribe');
         this.subscribeSuccess   = page.locator('#success-subscribe');

         //scroll-up
         this.scrollUpBtn        = page.locator('#scrollUp');


         //footer

         this.footer             = page.locator('footer');
         this.copyrightText      = page.locator('footer p');

    }


    //navigation---------------------------------

    async goto()
    {
        await this.page.goto('/')
    }

   

    async navigateToLogin() {
    await this.signupLoginBtn.click();
    }

    async navigateToProducts() {
    await this.productsBtn.click();
    }

    async navigateToCart() {
    await this.cartBtn.click();
    }

    async navigateToContactUs() {
    await this.contactUsBtn.click();
    }

    //user actions------------------------------

     async logout() {
    await this.logoutBtn.click();
    }

     async deleteAccount() {
    await this.delete.click();
    }


    // ── Category Actions ----------------
    async clickWomenCategory() {
        await this.womenCategory.click();
    }

    async clickMenCategory() {
        await this.menCategory.click();
    }

    async clickKidsCategory() {
        await this.kidsCategory.click();
    }


    //brand
    async clickBrand(brandName)
    {
        await this.page.locator(`[href="/brand_products/${brandName}"]`).click()  //dynamically looping the same type
    }


    //addproduct

    async addProductToCart(index)
    {
        await this.productCards.nth(index).hover()            //dynamically using the index for the products
        await this.addToCartBtns.nth(index).click();
    }

    // continue shopping in modal
    async continueShopping() {
    await this.addedModal.waitFor({ state: 'visible' });
    await this.modalContinueBtn.click();
    }


    
   async viewCartFromModal() {
    await this.addedModal.waitFor({ state: 'visible' });
    await this.modalViewCartBtn.click();
    }

    //recommended items
     async addRecommendedProductToCart(index) {
    await this.recommendedAddToCart.nth(index).click();
    }

    //subscription

    async subscribeWithEmail(email) {
    //await this.scrollToBottom();
    await this.subscribeEmail.fill(email);
    await this.subscribeBtn.click();
    }

    //scroll up
     async scrollToTop() {
    await this.scrollUpBtn.click();
    }

    async closeAdIfPresent() {
    try {
        // IMPORTANT: this must NEVER match our own Bootstrap modals
        // (#cartModal "Continue Shopping"/"View Cart", quickview modal, etc.).
        // Only look for close buttons that live OUTSIDE our known app modals,
        // and explicitly exclude #cartModal / .modal so we never close our
        // own "Added to cart" popup by mistake.
        const closeSelectors = [
            'button[id*="close" i]:not(#cartModal *)',
            'a[id*="close" i]:not(#cartModal *)',
            '[aria-label*="dismiss" i]:not(.modal *)',
        ];

        for (const selector of closeSelectors) {
            const btn = this.page.locator(selector).first();
            if (await btn.isVisible({ timeout: 800 }).catch(() => false)) {
                await btn.click({ timeout: 2000 }).catch(() => {});
                return;
            }
        }

        // ── Third-party ad iframes (Google ads, etc.) ─────
        const frames = this.page.frames();
        for (const frame of frames) {
            if (frame === this.page.mainFrame()) continue;
            const url = frame.url();
            if (!/doubleclick|googlesyndication|googleadservices|adservice|ads\./i.test(url)) continue;
            try {
                const frameClose = frame.locator('button, a, div[id*="close" i]')
                    .filter({ hasText: /close|dismiss|skip/i }).first();
                if (await frameClose.isVisible({ timeout: 800 })) {
                    await frameClose.click();
                    return;
                }
            } catch {
                continue; // frame may have detached — skip it
            }
        }
        // No ad found — do nothing. Deliberately NOT pressing Escape here,
        // since Escape can also close Bootstrap modals we still need open.
    } catch {
        // No ad — continue
    }
}


}

module.exports ={HomePage}