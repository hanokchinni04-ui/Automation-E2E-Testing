const {test,expect}  = require('@playwright/test')
const {HomePage}     = require('../Pages/homePage');
const {LoginPage}    = require('../Pages/loginPage');
const {RegisterPage} = require('../Pages/registerPage');
const  userData      = require('../test-data/users.json');

test.describe('Authentication',()=>{

    test.beforeEach(async ({page})=>{

        const homePage = new HomePage(page)
        await homePage.goto()
        await homePage.closeAdIfPresent()
        await expect(homePage.logo).toBeVisible()

    })


    test('Tc1:Register user',async ({page}) =>{
           
          const loginPage    = new LoginPage(page)
          const registerPage = new RegisterPage(page)
          const homePage     = new HomePage(page)
          
          const user = { ...userData.validUser, email: `testuser_${Date.now()}@mailtest.com` };


          //step1 - go to login page
          await homePage.navigateToLogin();

          //step 2- veify user signup is visible or not
          await expect(loginPage.signupHeading).toBeVisible()

          //step-3 enter name and email
          await loginPage.signup(user.name,user.email);

          //8 -enter account visible
          await expect(registerPage.heading).toBeVisible()

          //9-fill details register page /10-checkbox/11

          await registerPage.fillAccountInfo(user)

          //12- fill details(address)
          await registerPage.fillAddressInfo(user)

          //submit-13
          await registerPage.submitForm() 

          //account created visible-14
          await expect(registerPage.accountCreatedMsg ).toBeVisible()

          //15-click continue
          await  registerPage.continueAfterCreation()

          //16  -logged in as visible

          await expect(homePage.loggedUser).toBeVisible()

          //17 -delete button
          await homePage.deleteAccount()

          //18-verify account deleted
          await expect(registerPage.accountDeletedMsg ).toBeVisible()

          //19 click continue
          await registerPage.continueAfterDelete()


        await page.waitForTimeout(3000)
     })

     test('TC2: Login User with correct credentials', async ({ page }) => {
    const homePage  = new HomePage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);
    const user      = userData.registeredUser;

        // Step 1 - Click Signup/Login
        await homePage.navigateToLogin();

        // Step 2 - Verify Login heading visible
        await expect(loginPage.loginHeading).toBeVisible();

        // Step 3 - Enter correct email and password
        await loginPage.login(user.email, user.password);

        // Step 4 - Verify Logged in as username
        await expect(homePage.loggedUser).toBeVisible();

        // Step 5 - Delete account
        // await homePage.deleteAccount();

        // Step 6 - Verify account deleted
        // await expect(registerPage.accountDeletedMsg).toBeVisible();

        
      });

      test('TC3: Login User with incorrect credentials', async ({ page }) => {
        const homePage  = new HomePage(page);
        const loginPage = new LoginPage(page);
        const user      = userData.invalidUser;

        // Step 1 - Click Signup/Login
        await homePage.navigateToLogin();

        // Step 2 - Verify Login heading visible
        await expect(loginPage.loginHeading).toBeVisible();

        // Step 3 - Enter incorrect email and password
        await loginPage.login(user.email, user.password);

        // Step 4 - Verify error message visible
        await expect(loginPage.loginError).toBeVisible();
      });

      test('TC4: Logout User', async ({ page }) => {
        const homePage  = new HomePage(page);
        const loginPage = new LoginPage(page);
        const user      = userData.registeredUser;

        // Step 1 - Click Signup/Login
        await homePage.navigateToLogin();

        // Step 2 - Verify Login heading visible
        // await expect(loginPage.loginHeading).toBeVisible();

        // Step 3 - Enter correct email and password
        await loginPage.login(user.email, user.password);

        // Step 4 - Verify Logged in as username
        await expect(homePage.loggedUser).toBeVisible();

        // Step 5 - Click Logout
        await homePage.logout();

        // Step 6 - Verify user navigated to login page
        await expect(page).toHaveURL('/login');
        await expect(loginPage.loginHeading).toBeVisible();

       });

       test('TC5: Register User with existing email', async ({ page }) => {
        const homePage  = new HomePage(page);
        const loginPage = new LoginPage(page);
        const user      = userData.existingUser;

        // Step 1 - Click Signup/Login
        await homePage.navigateToLogin();

        // Step 2 - Verify New User Signup visible
        await expect(loginPage.signupHeading).toBeVisible();

        // Step 3 - Enter name and already registered email
        await loginPage.signup(user.name, user.email);

        // Step 4 - Verify error message visible
        await expect(loginPage.signupError).toBeVisible();
    });
})





