class ContactPage {
  constructor(page) {
    this.page = page;

    // ── Page Heading ─────────────────────────────────────────
    this.getInTouchHeading   = page.locator('h2:has-text("Get In Touch")');

    // ── Contact Form ─────────────────────────────────────────
    this.nameInput           = page.locator('input[data-qa="name"]');
    this.emailInput          = page.locator('input[data-qa="email"]');
    this.subjectInput        = page.locator('input[data-qa="subject"]');
    this.messageInput        = page.locator('textarea[data-qa="message"]');

    // ── File Upload ───────────────────────────────────────────
    this.uploadFileBtn       = page.locator('input[name="upload_file"]');

    // ── Submit ────────────────────────────────────────────────
    this.submitBtn           = page.getByRole('button', { name: 'Submit' });

    // ── Success Message ───────────────────────────────────────
   this.successMsg = page.locator('div.alert-success', { hasText: 'You have been successfully submitted' });

    // ── Home Button ───────────────────────────────────────────
    this.homeBtn             = page.getByRole('link', { name: 'Home', exact: true });
  }

  // ── Navigation ───────────────────────────────────────────────
  async goto() {
    await this.page.goto('/contact_us');
  }

  // ── Form Actions ─────────────────────────────────────────────
  async fillContactForm(data) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  // ── File Upload Action ────────────────────────────────────────
  async uploadFile(filePath) {
    await this.uploadFileBtn.setInputFiles(filePath);
  }

  // ── Submit Action ─────────────────────────────────────────────
  async submitForm() {
    // automationexercise.com shows a native confirm() dialog on submit.
    // The handler must be registered BEFORE the click that triggers it,
    // otherwise Playwright auto-dismisses the dialog and the form never submits.
    this.page.once('dialog', dialog => dialog.accept());
    await this.submitBtn.click();
  }

  // ── Home Navigation ───────────────────────────────────────────
  async clickHome() {
    await this.homeBtn.click();
  }
}

module.exports = { ContactPage };