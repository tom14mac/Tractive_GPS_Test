export class TestData {

    valid_login() {
        return { email: 'macwantejash@gmail.com', password: 'TEjavac@14' };
    }

    invalid_login() {
        return { email: 'invalid@example.com', password: 'wrongPassword' };
    }
    invalid_Email_password(){
        return{ email:'test.11111111111111111111111',
                password:'123@'  }
    }
    // Generate dynamic signup data
    valid_signup_data() {
        const email = `user${Date.now()}@gmail.com`; // Dynamic email generation
        const password = this.generatePassword(8);    // Password generation

        return {
            firstName: 'Test213213',      // Ensure this is properly set
            lastName: '12321',
            email: 'macwantejash@gmail.com',
            password: password
        };
    }
    // Utility function to generate a password of the desired length
    generatePassword(minLength) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < minLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }
}
