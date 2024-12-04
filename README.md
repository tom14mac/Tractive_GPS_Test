Tractive GPS webAutomation Testing

This project automates the registration and login functionality of the Tractive System (https://my-stage.tractive.com) using Playwright, Mocha, and Page Object Model (POM). The tests validate various scenarios for both login and registration features and include meaningful assertions for error handling and form validation.

Project Structure (POM)
The project is structured as follows:

/tractive-automation
|-- /node_modules          # Node.js modules
|-- /Pages                 # Page Object Models
|   |-- login_page.js      # Login page object
|   |-- homepage.js        # Homepage page object
|   |-- signup_page.js     # Signup page object
|-- /testdata              # Test data for various scenarios
|   |-- testData.js        # Test data file
|-- /test                  # Mocha test scripts
|   |-- login_signup_test.js # Tests for login and signup
|-- package.json           # NPM package file
|-- README.md              # This README file


Prerequisites
Before running the tests, make sure you have the following installed:

Node.js (>= 14.0.0)
npm (Node Package Manager)


Here is an example of how you can write a README.md file for your GitHub repository:

Tractive Automation Testing
This project automates the registration and login functionality of the Tractive System (https://my-stage.tractive.com) using Playwright, Mocha, and Page Object Model (POM). The tests validate various scenarios for both login and registration features and include meaningful assertions for error handling and form validation.

Project Structure (POM)

/tractive-automation
|-- /node_modules          # Node.js modules
|-- /Pages                 # Page Object Models
|   |-- login_page.js      # Login page object
|   |-- homepage.js        # Homepage page object
|   |-- signup_page.js     # Signup page object
|-- /testdata              # Test data for various scenarios
|   |-- testData.js        # Test data file
|-- /test                  # Mocha test scripts
|   |-- login_signup_test.js # Tests for login and signup
|-- package.json           # NPM package file
|-- README.md              # This README file
Prerequisites
Before running the tests, make sure you have the following installed:

Node.js (>= 14.0.0)
npm (Node Package Manager)
Installation
Clone the repository:
git clone  'https://github.com/tom14mac/Tractive_GPS_Test.git
Change to the project directory:

cd tractive-automation
Install the necessary dependencies:

npm install
Configuration
No configuration is required for this test suite, but you can adjust test data in the testdata/testData.js file for different test scenarios (e.g., valid and invalid login credentials).

Running the Tests
To run the tests, use the following command:
npx mocha --timeout 60000 --recursive

Test Scenarios Included
Login Tests:

Verify successful login with valid credentials.
Verify error message when using invalid credentials.
Signup Tests:

Verify successful registration with valid data.
Verify error message for invalid email format.
Verify error message for short password length.
Tests Breakdown
LoginPage Class: Contains methods for interacting with the login page, including filling out the email and password fields, clicking the submit button, and verifying error messages.

SignUpPage Class: Contains methods for interacting with the sign-up page, including filling out the registration form and verifying error messages.

HomePage Class: Contains methods to validate the homepage after login and perform actions like signing out.


Libraries and Tools
Playwright: For browser automation and interaction.
Mocha: Testing framework used for running and structuring the tests.
Chai: Assertion library for making assertions in the tests.
Contributing
If you wish to contribute to this project, feel free to fork the repository, create a branch for your changes, and open a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.


<img src="https://t.bkit.co/w_67507a428fa11.gif" />
