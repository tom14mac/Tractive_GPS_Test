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

        // Validation messages locators
        this.firstNameValidation = page.locator("//tcommon-form-field[@label='login.signUp.firstName']//em[normalize-space()='This field is required.']");
        this.lastNameValidation = page.locator("//tcommon-form-field[@label='login.signUp.lastName']//em[normalize-space()='This field is required.']");
        this.emailValidation = page.locator("//tcommon-form-field[@icon-left='/img/login/ic-email.svg']//em[normalize-space()='This field is required.']");
        this.passwordValidation = page.locator("//tcommon-form-field[@icon-left='/img/login/ic-password.svg']//em[normalize-space()='This field is required.']");
        this.emailFieldInvalid = page.locator("//em[normalize-space()='The email address is invalid.']");
        this.passwordlenght=page.locator("//em[normalize-space()='Minimum length is 8 characters.']");
    }

    // This method will navigate to the SignUp page
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
        // Wait for the element to become visible
        await this.page.waitForSelector('//em[normalize-space()=\'The email address is invalid.\']', { state: 'visible' });

        // Check if the element is visible
        const isVisible = await this.emailFieldInvalid.isVisible();
        expect(isVisible).toBe(true);  // Assert that the element is visible

        // Check the text content
        const text = await this.emailFieldInvalid.textContent();
        expect(text.trim()).toBe('The email address is invalid.');
    }
    async assertPasswordLengthValidation() {
        // Wait for the element to become visible
        await this.page.waitForSelector('//em[normalize-space()=\'Minimum length is 8 characters.\']', { state: 'visible' });

        // Define a locator for the element
        const locator = this.page.locator('//em[normalize-space()=\'Minimum length is 8 characters.\']');

        // Check if the element is visible
        const isVisible = await locator.isVisible();
        expect(isVisible).toBe(true);  // Assert that the element is visible

        // Check the text content
        const text = await locator.textContent();
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
    async clickSubmitButtonIfVisible() {
        const submitButton = this.page.locator("//button[@type='submit']");
        const isVisible = await submitButton.isVisible();
        if (isVisible) {
            await submitButton.click();
            console.log("Submit button clicked successfully.");
        } else {
            console.log("Submit button is not visible.");
        }

    }

    timeout(number) {
        
    }
}
