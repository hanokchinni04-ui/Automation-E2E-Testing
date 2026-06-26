# Automation-E2E-Testing


This is my end-to-end UI test automation project for automationexercise.com,
built with Playwright using the Page Object Model. It covers product
browsing, cart, checkout, authentication, and general site UI flows.

## Tech Stack

- Playwright Test (@playwright/test)
- Node.js
- JavaScript (CommonJS)

## Project Structure

project/
├── Pages/                  Page Object classes (one per site area)
│   ├── homePage.js
│   ├── productPage.js
│   ├── cartPage.js
│   ├── checkoutPage.js
│   ├── loginPage.js
│   ├── registerPage.js
│   └── contactPage.js
├── tests/                  Test specs, grouped by feature
│   ├── auth.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── ui.spec.js
│   └── smoke.spec.js
├── test-data/
│   └── users.json          Test fixtures (users, payment info, etc.)
├── playwright.config.js
└── .github/workflows/playwright.yml   CI pipeline (GitHub Actions)

## Setup

1. Install dependencies:
   npm install

2. Install Playwright browsers:
   npx playwright install

## Running Tests

Run the full suite:
   npx playwright test

Run a single file:
   npx playwright test tests/cart.spec.js

Run a single browser:
   npx playwright test --project=chromium

Run headed (so I can see the browser):
   npx playwright test --headed

Run a specific test by name:
   npx playwright test -g "TC14"

View the HTML report after a run:
   npx playwright show-report

## CI/CD

My tests run automatically on push and pull request to main/master via
.github/workflows/playwright.yml. The pipeline:
- Installs dependencies (npm ci)
- Installs Playwright browsers (with OS deps)
- Runs the full test suite
- Uploads the HTML report as a build artifact

Note to self: forbidOnly is enabled when CI=true, so if I leave a
test.only() in the code, CI will fail on purpose. Always remove .only()
before pushing.

## Notes on Test Stability

This site serves real third-party ads (Google ad iframes, sticky bottom
banners) that can overlay or shift page content. I call
closeAdIfPresent() in homePage.js before interactions to reduce this
risk, but it's not foolproof — an ad can still load in the moment
between the check and the click. If a test fails with a click timeout
but the locator clearly exists on the page, I check the test-results
screenshot/trace for an ad overlay before assuming the locator itself
is wrong.

Some of my tests depend on fixture accounts already existing on the
live site (see test-data/users.json — registeredUser, existingUser).
I don't create these through the test suite itself, so if a login-based
test fails, I need to confirm these accounts still exist and the
password hasn't changed.

## Known External Dependencies

- TC2, TC4, TC16 (login flows) need `registeredUser` to already exist
  on automationexercise.com.
- TC5 (auth.spec.js) needs `existingUser` to already exist.
- TC14 (checkout.spec.js) generates a unique email per run, so it has
  no external dependency and I can re-run it safely anytime.

## Notes to Myself for Future Edits

- Keep locators scoped to their container when multiple elements share
  the same attributes (e.g. nav links vs. modal links with identical
  hrefs) — otherwise I'll hit Playwright strict-mode violations.
- Prefer getByRole() where I've confirmed the element's accessible name;
  fall back to data-qa/CSS selectors where I haven't verified the role
  or name, instead of guessing.
- Avoid force: true as a fix for timing issues — add a proper wait
  instead. Force clicks just hide real problems rather than solving
  them, and I've been burned by this before.
