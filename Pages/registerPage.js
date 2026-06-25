class RegisterPage
{
    constructor(page){

        this.page  = page;

        //heading
        this.heading = page.locator(
            'h2:has-text("Enter Account Information")'
        );

        //Gender
        this.titleMr = page.locator('#id_gender1')
        this.titleMrs = page.locator('#id_gender2')

        //Accountinfo
        this.name  = page.locator('#name')
        this.email = page.locator('#email')
        this.pass  = page.locator('#password')

        //dob

        this.dobDay  =page.locator('#days')
        this.dobMonth = page.locator('#months')
        this.dobYear = page.locator('#years')


        //checkboxes

        this.newsletterCheckbox  = page.locator('#newsletter')
        this.specialOffersCheckbox = page.locator('#optin')

        //address Info

        this.firstName           = page.locator('[data-qa="first_name"]')
        this.lastName            = page.locator('[data-qa="last_name"]')
        this.company             = page.locator('[data-qa="company"]')
        this.address1            = page.locator('[data-qa="address"]')
        this.address2            = page.locator('[data-qa="address2"]')
        this.country             = page.locator('[data-qa="country"]')
        this.state               = page.locator('[data-qa="state"]')
        this.city                = page.locator('[data-qa="city"]')
        this.zipcode             = page.locator('[data-qa="zipcode"]')
        this.mobileNumber        = page.locator('[data-qa="mobile_number"]')


        //submit
        this.createAccountBtn    = page.locator('[data-qa="create-account"]')

        //confirmation

        this.accountCreatedMsg   = page.locator('h2[data-qa="account-created"]');
        this.continueBtn         = page.locator('a[data-qa="continue-button"]');

        //account deleted

        this.accountDeletedMsg   = page.locator('h2[data-qa="account-deleted"]');
        this.accountDeletedContinueBtn = page.locator('a[data-qa="continue-button"]');


    }

    //fill account 
    async fillAccountInfo(data)
    {
        await this.titleMr.check();
        await this.pass.fill(data.password);
        await this.dobDay.selectOption(data.day);
        await this.dobMonth.selectOption(data.month);
        await this.dobYear.selectOption(data.year);
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();

    }

    //fill address
    async fillAddressInfo(data) {

        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.company.fill(data.company);
        await this.address1.fill(data.address1);
        await this.address2.fill(data.address2);
        await this.country.selectOption(data.country);
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zipcode.fill(data.zipcode);
        await this.mobileNumber.fill(data.mobile);
   }

   //Submit form
   async submitForm() {
        await this.createAccountBtn.click();
   }

   //continue After Account
   async continueAfterCreation() {
        await this.continueBtn.click();
   }

   async continueAfterDelete ()
   {
      await this.accountDeletedContinueBtn.click()
   }





}

 module.exports = { RegisterPage }