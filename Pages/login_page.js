// /pages/LoginPage.js
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.url = 'https://my-stage.tractive.com/#/'; // Target URL
        this.emailField = '//input[@type="email"]';
        this.passwordField = '//input[@type="password"]';
        this.submitButton = '//button[@type="submit"]';
        this.createAccountLink = '//strong[@class="ng-scope"]';
        this.errorMessage = '//div[@aria-label="Looks like you entered a wrong email or password. Signed up with Google or Apple? Log in using one of the buttons."]'; // Error alert selector
    }

    // Open the target URL
    async open() {
        await this.page.goto(this.url, { waitUntil: 'load' });
    }

    // Method to enter the email
    async enterEmail(email) {
        await this.page.fill(this.emailField, email);
    }

    // Method to enter the password
    async enterPassword(password) {
        await this.page.fill(this.passwordField, password);
    }

    // Method to check if the submit button is visible
    async isSubmitButtonVisible() {
        return await this.page.isVisible(this.submitButton);
    }

    // Method to click the create account link
    async clickCreateAccount() {
        await this.page.click(this.createAccountLink);
    }

    // Method to click the submit button
    async clickSubmitButton() {
        if (await this.isSubmitButtonVisible()) {
            await this.page.click(this.submitButton);
        } else {
            throw new Error('Submit button is not visible.');
        }
    }
    // Reusable Dialog Handler Function
    async handleDialog(page, expectedMessage) {
        let alertMessage = '';
        page.once('dialog', async (dialog) => {
            alertMessage = dialog.message();
            console.log(`Dialog received: ${alertMessage}`);
            await dialog.accept();
        });
        try {
            await page.waitForTimeout(2000);
            console.log('Waiting for the dialog...');
        } catch (error) {
            console.error('Dialog did not appear within the expected timeframe.');
            throw new Error('No dialog was triggered.');
        }

        // Assert the dialog message
        if (!alertMessage) {
            throw new Error('Dialog message was not captured.');
        }
        if (!alertMessage.includes(expectedMessage)) {
            throw new Error(`Expected dialog message to include "${expectedMessage}", but received "${alertMessage}".`);
        }
    }
    // Method to verify login success
    async isLoginSuccessful() {
        try {
            // Wait for either success or error state
            const isErrorVisible = await this.page.isVisible(this.errorMessage);

            if (isErrorVisible) {
                const errorText = await this.page.textContent(this.errorMessage);
                throw new Error(`Login failed with error: ${errorText}`);
            }

            console.log('Login successful.');
            return true; // No error means login is successful
        } catch (error) {
            console.error('Error checking login status:', error.message);
            throw error;
        }
    }
}
