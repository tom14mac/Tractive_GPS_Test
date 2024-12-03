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
            firstName: 'Test_data1',      // Ensure this is properly set
            lastName: 'Test_data2',
            email: 'macwantejash@gmail.com',
            password: password
        };
    }

    Invalid_signup_data() {
        return {
            firstName: '#@@#!@#;12!!!;',      // Ensure this is properly set
            lastName: '@$%^$##$%%^^',
            email: 'test@example.com AND 1=1 -- ',
            password: 'password -- '
        };
    }
    Valid_new_signup_data(){
        const email = `user${Date.now()}@gmail.com`; // Dynamic email generation
        const password = this.generatePassword(8);    // Password generation

        return {
            firstName: 'Alexa',      // Ensure this is properly set
            lastName: 'muller',
            email: email,
            password: password
        };
    }
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
