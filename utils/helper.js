export class Helper {

    constructor(page) {
        this.page = page;
        this.handleDialog(page);
    }
   async generateEmail() {
        const randomString = Math.random().toString(36).substring(2, 10); // Generates a random string
        return `user${randomString}@example.com`;  // Combine it with a domain to create an email
    }
    async generatePassword(minLength) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < minLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }
    async handleDialog(page) {
        page.on('dialog', async (dialog) => {
            const alertMessage = dialog.message();
            console.log('Alert Message:', alertMessage);

            // Verify if the error message appears in the dialog
            if (alertMessage.includes('Account creation failed. You entered invalid information.')) {
                await dialog.accept(); // Accept the dialog (close it)
                console.log('Dialog error message verified.');

                // Assert that the alert message contains the expected error message
                expect(alertMessage).to.include('Account creation failed. You entered invalid information.');
            } else {
                console.log('No error message displayed. Account creation may be successful.');
            }
        });
    }
}
