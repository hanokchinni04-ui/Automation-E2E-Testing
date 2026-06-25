class LoginPage
{
    constructor(page) {
        this.page = page;

        //login

       this.loginHeading    = page.locator('h2:has-text("Login to your account")');
       this.loginEmail = page.locator('[data-qa="login-email"]')
       this.loginPass  = page.locator('[data-qa="login-password"]')
       this.loginBtn   = page.getByRole('button', { name: 'Login' })
       this.loginError = page.locator('p:has-text("Your email or password is incorrect!")');

       //sign up

        this.signupHeading   = page.locator('h2:has-text("New User Signup!")');
        this.signupName      = page.locator('[data-qa="signup-name"]');
        this.signupEmail     = page.locator('[data-qa="signup-email"]');
        this.signupBtn       = page.getByRole('button', { name: 'Signup' });
        this.signupError     = page.locator('p:has-text("Email Address already exist!")');

    }


    async goto()
    {
        await this.page.goto('/login')
    }

    async login(email,password)
    {

        await this.loginEmail.fill(email);
        await this.loginPass.fill(password);
        await this.loginBtn.click();
    }

    async signup(name,email)
    {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupBtn.click();

    }

}

module.exports = { LoginPage };