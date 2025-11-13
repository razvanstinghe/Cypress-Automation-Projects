📄 Ultimate QA Test Project: Stable & Secure E2E Flow
This project contains a robust End-to-End (E2E) test suite, written in Cypress, designed to validate critical navigation and the secure login form functionality on the Ultimate QA platform.
________________________________________
Test Objectives & Scope
The test aims to confirm the integrity of the login form and ensure test stability when facing common cross-origin and third-party script blocking challenges. The final assertion validates the form's ability to correctly process and reject invalid data, adhering to security best practices.
End-to-End Test Flow
The test successfully executes the following sequence:
1.	Navigation: Visits the main domain (https://ultimateqa.com/).
2.	Sequential Clicks: Navigates to the Automation Exercises page.
3.	Critical Cross-Origin Bypass: Safely switches to the login subdomain (courses.ultimateqa.com) using cy.visit() and cy.origin().
4.	Form Interaction: Inputs intentionally invalid credentials (e.g., securitate.test@nu-exista.com).
5.	Action: Clicks the final submit button using the specific selector button[type="submit"].button-primary.
6.	Assertion (Security): Successfully asserts the presence of the expected error message: Invalid email or password.
________________________________________
Key Technical Solutions Implemented
This test was stabilized by implementing a dual strategy to mitigate external interference:
1. Cross-Domain Management (cy.origin)
•	Challenge: Simple command chaining failed when switching from https://ultimateqa.com/ to https://courses.ultimateqa.com (a different subdomain), causing a Cypress Cross-Origin error.
•	Solution: All commands interacting with the login form are wrapped within the cy.origin('https://courses.ultimateqa.com', () => { ... }) block, allowing seamless interaction with the separate domain.
2. Network Isolation (blockHosts)
•	Challenge: The initial navigation and page loads were prone to timeout errors caused by external tracking and analytics scripts (e.g., Facebook, Hotjar).
•	Solution: The test environment was stabilized by explicitly blocking non-essential third-party requests in the Cypress configuration:
JavaScript
[
    'www.google-analytics.com', 
    'region1.analytics.google.com',
    '*.facebook.com', 
    'google.com/recaptcha', 
    '*.hotjar.io'
]
3. Selector Specificity
•	Challenge: Ambiguity arose between the header link and the submit button, and the button contained invisible whitespace.
•	Solution: The final button click was targeted using a highly specific CSS selector: button[type="submit"].button-primary, resolving the failure caused by generic text searching (cy.contains).
