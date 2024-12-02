class helper{
    // Utility function to generate a realistic email
    async generateEmail() {
        const randomString = Math.random().toString(36).substring(2, 10); // Generates a random string
        return `user${randomString}@example.com`;  // Combine it with a domain to create an email
    }

// Utility function to generate a password of the desired length
    async generatePassword(minLength) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < minLength; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        return password;
    }

}