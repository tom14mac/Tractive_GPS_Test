import { expect } from '@playwright/test';

export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://my-stage.tractive.com/#/signup'; // Target URL
        this.firstNameField = page.locator('input[name="firstName"]');
        this.lastNameField = page.locator('input[name="lastName"]');
        this.emailField = page.locator('input[name="email"]');
        this.passwordField = page.locator('input[name="password"]');
        this.checkbox = page.locator('//div[@class=\'tcommon-check__mask\']')
        this.pageTitleOptions = [
            'Tractive GPS - Create Account - Find your lost dog and cat',
        ];
        this.submitButton = page.locator('//button[@type=\'submit\']');

        // Validation messages locators
        this.firstNameValidation = page.locator("//tcommon-form-field[@label='login.signUp.firstName']//em[normalize-space()='This field is required.']");
        this.lastNameValidation = page.locator("//tcommon-form-field[@label='login.signUp.lastName']//em[normalize-space()='This field is required.']");
        this.emailValidation = page.locator("//tcommon-form-field[@icon-left='/img/login/ic-email.svg']//em[normalize-space()='This field is required.']");
        this.passwordValidation = page.locator("//tcommon-form-field[@icon-left='/img/login/ic-password.svg']//em[normalize-space()='This field is required.']");
        this.emailFieldInvalid = page.locator("//em[normalize-space()='The email address is invalid.']");
        this.passwordlenght=page.locator("//em[normalize-space()='Minimum length is 8 characters.']");
        this.googleSignInButton = page.locator("//tcommon-google-signin-button[@class='ng-isolate-scope']");

        // iframe locators
        this.iframe = page.locator("//iframe[contains(@src, 'accounts.google.com')]");
        this.email_google = page.locator("//input[@type='email']");
        this.next_button = page.locator("//span[normalize-space()='Next']");
        this.password_google = page.locator("//input[@type='password']");
    }

    // This method will navigate to the SignUp page
    submitButton;
    page;
    async open() {
        await this.page.goto(this.url, { waitUntil: 'load' }); // Replace with your actual sign-up page URL
    }
    async verifyPageTitle() {
        try {
            const title = await this.page.title();
            console.log('Actual Page Title:', title);

            // Check if the title matches any of the expected options
            const isTitleValid = this.pageTitleOptions.some(expectedTitle =>
                title.includes(expectedTitle)
            );

            if (!isTitleValid) {
                throw new Error(`Expected page title to include one of ${JSON.stringify(this.pageTitleOptions)}, but found "${title}"`);
            }

            console.log('Page title verified successfully.');
        } catch (error) {
            console.error('Error verifying page title:', error.message);
            throw error;
        }
    }

    async assertFirstNameValidation() {
        const isVisible = await this.firstNameValidation.isVisible();  // Check visibility using isVisible()
        expect(isVisible).toBe(true);  // Assert that the element is visible
        const text = await this.firstNameValidation.textContent();
        expect(text).toBe(' This field is required. ');
    }

    async assertLastNameValidation() {
        const isVisible = await this.lastNameValidation.isVisible();  // Check visibility using isVisible()
        expect(isVisible).toBe(true);  // Assert that the element is visible
        const text = await this.lastNameValidation.textContent();
        expect(text).toBe(' This field is required. ');
    }
    async assertEmailValidation() {
        const isVisible = await this.emailValidation.isVisible();  // Check visibility using isVisible()
        expect(isVisible).toBe(true);  // Assert that the element is visible
        const text = await this.emailValidation.textContent();
        expect(text).toBe(' This field is required. ');
    }

    async assertInvalidEmailValidation() {
        await this.page.waitForSelector('//em[normalize-space()=\'The email address is invalid.\']', { state: 'visible' });
        const isVisible = await this.emailFieldInvalid.isVisible();
        expect(isVisible).toBe(true);  // Assert that the element is visible
        const text = await this.emailFieldInvalid.textContent();
        expect(text.trim()).toBe('The email address is invalid.');
    }
    async assertPasswordLengthValidation() {
        const isVisible = await this.passwordlenght.isVisible();
        expect(isVisible).toBe(true);  // Assert that the element is visible
        const text = await this.passwordlenght.textContent();
        expect(text.trim()).toBe('Minimum length is 8 characters.');
    }
    async assertPasswordValidation() {
        const isVisible = await this.passwordValidation.isVisible();  // Check visibility using isVisible()
        expect(isVisible).toBe(true);  // Assert that the element is visible
        const text = await this.passwordValidation.textContent();
        expect(text).toBe(' This field is required. ');
    }

    async EmptyFieldFocus(){
        await this.firstNameField.focus();
        await this.page.keyboard.press('Tab'); // Simulates pressing Tab to change focus
        this.timeout(30000);
        await this.lastNameField.focus();
        await this.page.keyboard.press('Tab');
        this.timeout(30000);
        await this.emailField.focus();
        await this.page.keyboard.press('Tab');
        this.timeout(30000);
        await this.passwordField.focus();
        await this.page.keyboard.press('Tab');
    }
    async enterFirstName(firstName) {
        if (!firstName) throw new Error('First name is undefined');
        const isVisible = await this.firstNameField.isVisible();
        console.log('First Name Field Visible:', isVisible); // Log visibility status
        await this.firstNameField.fill(firstName);
    }
    async enterLastname(lastName) {
        if (!lastName) throw new Error('Last name is undefined');
        const isVisible = await this.lastNameField.isVisible();
        console.log('First Name Field Visible:', isVisible); // Log visibility status
        await this.lastNameField.fill(lastName);
    }
    async enterEmail(email) {
        if (!email) throw new Error('Email name is undefined');
        const isVisible = await this.emailField.isVisible();
        console.log('First Name Field Visible:', isVisible); // Log visibility status
        await this.emailField.fill(email);
    }
    async enterInvalidEmail(email) {
        if (!email) throw new Error('InvalidEmail is undefined');
        const isVisible = await this.emailField.isVisible();
        console.log('First Name Field Visible:', isVisible); // Log visibility status
        await this.emailField.fill(email);
    }
    async enterPassword(password) {
        if (!password) throw new Error('Password is undefined');
        const isVisible = await this.passwordField.isVisible();
        console.log('First Name Field Visible:', isVisible); // Log visibility status
        await this.passwordField.fill(password);
    }
    async enterInvalidPassword(password){
        if (!password) throw new Error('Invalid Password is undefined');
        const isVisible = await this.passwordField.isVisible();
        console.log('First Name Field Visible:', isVisible); // Log visibility status
        await this.passwordField.fill(password);
    }
    async clickCheckbox() {
        const isVisible = await this.checkbox.isVisible();
        if (isVisible) {
            await this.checkbox.click();
            console.log("Checkbox clicked successfully.");
        } else {
            console.log("Checkbox is not visible.");
        }
    }

    async handleGoogleSignInProcess() {
        try {
            // Check if the "Sign In with Google" button is visible and click it
            if (await this.googleSignInButton.isVisible()) {
                await this.googleSignInButton.click();
                console.log("Clicked on 'Sign In with Google' button.");
            } else {
                throw new Error("'Sign In with Google' button not found.");
            }

            // Wait for the Google Sign-In iframe to load
            await this.page.waitForSelector(this.iframe, { state: 'attached', timeout: 150000 });
            console.log("Google Sign-In iframe appeared.");

            const iframe = this.page.frameLocator(this.iframe);
            if (!iframe) {
                throw new Error("Google Sign-In iframe not found or failed to load.");
            }
            console.log("Switched to Google Sign-In iframe.");
            const emailInput = iframe.locator(this.email_google);
            await emailInput.waitFor({ state: 'visible', timeout: 15000 });
            await emailInput.fill('macwantejaskumar@gmail.com');
            console.log("Email entered successfully.");
            const nextButton = iframe.locator(this.next_button);
            await nextButton.waitFor({ state: 'visible', timeout: 10000 });
            console.log("Found 'Next' button, clicking it.");
            await nextButton.click();
            const password_Input = iframe.locator(this.password_google);
            await password_Input.waitFor({ state: 'visible', timeout: 15000 });
            await password_Input.fill('Test@123');
            console.log("password entered successfully.");
            await nextButton.click();
        } catch (error) {
            console.error("Error during Google Sign-In process:", error.message);
            throw error;
        }
    }
    async isGoogleSignInSuccessful() {
        try {
            const profilePic = this.page.locator("//img[@class='profile-pic']"); // Replace with the actual class or selector
            await profilePic.waitFor({ state: 'visible', timeout: 20000 });
            console.log("Google sign-in successful: Profile picture is visible.");
            return true;
        } catch (error) {
            console.error("Google sign-in failed: " + error.message);
            return false;
        }
    }

    async clickSubmitButtonIfVisible() {
        const isVisible = await this.submitButton.isVisible();
        if (isVisible) {
            await this.submitButton.click();
            console.log("Submit button clicked successfully.");
        } else {
            console.log("Submit button is not visible.");
        }

    }

    async clickSubmitButtonIfNotVisible() {
        const isVisible = await this.submitButton.isVisible();

        if (!isVisible) {
            console.log("Submit button is not visible, attempting to click.");
            await this.submitButton.click();
            console.log("Submit button clicked successfully.");
        } else {
            const isHidden = await this.submitButton.isHidden();
            if (isHidden) {
                console.log("Submit button is hidden using CSS.");
            } else {
                console.log("Submit button is visible, skipping click.");
            }
        }
    }

    timeout(number) {
        
    }
}
