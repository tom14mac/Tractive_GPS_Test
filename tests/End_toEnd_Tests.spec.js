import { firefox } from 'playwright';
import { LoginPage } from "../Pages/login_page.js";
import { HomePage } from "../Pages/Homepage.js";
import { SignUpPage } from '../Pages/Signup_page.js';
import { TestData } from '../testdata/TestData.js';
import { expect } from 'chai';

describe('End-to-End Tests', function() {
    let browser, context, page;
    let loginPage, homePage, signUpPage, testData;

    before(async function () {
        this.timeout(30000);  // Increase timeout for async operations
        browser = await firefox.launch({headless: false});
        context = await browser.newContext();

        // Add cookies
        await context.addCookies([{
            name: 'interview',
            value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl',
            domain: '.tractive.com',
            path: '/',
            secure: true,
        }]);

        page = await context.newPage();
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        signUpPage = new SignUpPage(page);
        testData = new TestData();  // Corrected instantiation
    });

    after(async function () {
        this.timeout(5000);  // Increase timeout for after hook if needed
        if (page) await page.close();
        if (browser) await browser.close();
    });

    it('should verify URL and login page', async function () {
        this.timeout(30000);  // Increase timeout for this test
        await loginPage.open();
        await page.waitForSelector('button[type="submit"]');  // Ensure the login button is visible
        await page.evaluate(() => {
            window.moveTo(0, 0);
            window.resizeTo(window.screen.availWidth, window.screen.availHeight);
        });

        const currentUrl = await page.url();
        expect(currentUrl).to.include(loginPage.url);

        await homePage.verifyPageTitle();
    });


    it('should log in with valid credentials', async function () {
        this.timeout(30000);  // Increase timeout for this test
        const loginData = testData.valid_login();  // Use valid login data
        await loginPage.enterEmail(loginData.email);
        await loginPage.enterPassword(loginData.password);
        await loginPage.clickSubmitButton();

        const isLoginSuccessful = await loginPage.isLoginSuccessful();
        expect(isLoginSuccessful).to.true();

        await homePage.signOut();
    });

    it('should show an error for invalid login credentials', async function () {
        this.timeout(90000);  // Increase timeout for this test
        const loginData  = testData.invalid_login();  // Use invalid login data
        await loginPage.enterEmail(loginData.email);
        await loginPage.enterPassword(loginData.password);
        await loginPage.clickSubmitButton();
        let alertMessage = '';
        page.on('dialog', async (dialog) => {
            alertMessage = dialog.message();
            await dialog.accept();  // Accept the alert (close the alert)
        })

        await page.waitForTimeout(1000);  // Give the alert time to appear

        // Validate the error message
       expect(alertMessage).to.include('Invalid username or password');
    });

    it('should validate and submit the sign-up form', async function () {
        this.timeout(80000);  // Increase timeout for this test
        await signUpPage.open();  // Now it will open the sign-up page correctly
        const currentUrl = await page.url();
        expect(currentUrl).to.include(signUpPage.url);
        await signUpPage.EmptyFieldFocus();
        await signUpPage.assertFirstNameValidation();
        await signUpPage.assertLastNameValidation();
        await signUpPage.assertEmailValidation();
        await signUpPage.assertPasswordValidation();
    });

    it('should validate invalid email format', async function () {
        const invalidData = testData.invalid_Email_password(); // Retrieve invalid email from test data

        // Enter invalid email and verify validation message
        await signUpPage.enterInvalidEmail(invalidData.email);
        await signUpPage.assertInvalidEmailValidation();
    });

    it('should validate password length', async function () {
        const invalidData = testData.invalid_Email_password(); // Retrieve invalid password from test data

        // Enter invalid password and verify validation message
        await signUpPage.enterInvalidPassword(invalidData.password);
        await signUpPage.assertPasswordLengthValidation();
    });

    it('should successfully submit the form with valid data', async function () {
        this.timeout(70000);
        const validData = testData.valid_signup_data(); // Retrieve valid signup data from test data
        // Enter valid data into the form fields
        await signUpPage.enterFirstName(validData.firstName);
        await signUpPage.enterLastname(validData.lastName);
        await signUpPage.enterEmail(validData.email);
        await signUpPage.enterPassword(validData.password);
        // If there is a checkbox, click it
        await signUpPage.clickCheckbox();
        // Submit the form if the submit button is visible
        await signUpPage.clickSubmitButtonIfVisible();
        // Wait for a moment for the submission to process
        console.log('Waiting for ...');
        await page.waitForTimeout(30000);  // Pause execution for 30 seconds
        // Check for any dialog box (in case of success or failure)
        page.on('dialog', async (dialog) => {
            const alertMessage = dialog.message();
            console.log('Alert Message:', alertMessage);
            if (alertMessage.includes('Account creation failed. You entered invalid information.')) {
                await dialog.accept();  // Close the dialog
                console.log('Dialog error message verified.');
                expect(alertMessage).to.include('Account creation failed. You entered invalid information.');
            }
        });
        console.log('Account creation failed.!');
        const currentUrl = await page.url();
        expect(currentUrl).to.include(signUpPage.url);
    });
});
