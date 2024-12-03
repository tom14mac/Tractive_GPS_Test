// /pages/HomePage.js
export class HomePage {
    constructor(page) {
        this.page = page;
        this.pageTitleOptions = [
            'Welcome to the Tractive Web App | Activate Tracker | Sign in',
            'Tractive GPS - Sign In - Find your lost dog and cat',
        ];
        this.signOutButton = "//div[@class='sign-out-container']//tgps-sidebar-action-item[@class='ng-scope ng-isolate-scope']";
        this.checkBox_selectDevice = "//div[@class='tcommon-check__mask']";
        this.signoutAction = "//button[@class='tcommon-button tcommon-button--primary']";
        this.signOut_btn = "//tcommon-button[@class='ng-scope ng-isolate-scope']//button[@class='tcommon-button tcommon-button--primary']";
    }

    async setCookies() {
        await this.page.context().addCookies([{
            name: 'interview',
            value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl',
            domain: '.tractive.com',
            path: '/'
        }]);
        console.log('Cookies set successfully.');
    }

    async navigateToHomePage() {
        try {
            await this.page.goto('https://my-stage.tractive.com/#/', { timeout: 45000 });
            await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
            console.log('Navigated to home page successfully.');
        } catch (error) {
            console.error('Error navigating to home page:', error.message);
            throw error;
        }
    }

    async verifyPageTitle() {
        try {
            this.timeout(30000);
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

    async signOut() {
        try {
            console.log('Attempting to sign out...');
            // Wait for the "Sign Out" button to be visible
            await this.page. waitForSelector(this.signOutButton, { timeout: 15000 });

            // Click the "Sign Out" button
            await this.page.click(this.signOutButton);
            await this.page.click(this.checkBox_selectDevice);
            await this.page.click(this.signoutAction);
            await this.page.click(this.signOut_btn);

            // Wait for the sign-out process to complete (e.g., navigation to sign-in page)
            await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
            console.log('Successfully signed out.');
        } catch (error) {
            console.error('Error during sign out:', error.message);
            throw error;
        }
    }

    timeout(number) {
        
    }
}
