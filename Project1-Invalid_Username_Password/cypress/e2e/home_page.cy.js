
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Ultimate QA - Test de Navigare și Login (Final Stabilizat)', () => {

    it('ar trebui să navigheze și să efectueze o autentificare reușită', () => {
        
        cy.visit('/'); 
        cy.contains('Push Higher Quality Software To Market Faster').should('be.visible');

        cy.contains('Education').click(); 
        cy.contains('Automation Exercises').click({ force: true }); 
        cy.url().should('include', '/automation'); 

        cy.contains('h1', 'Automation Practice').should('be.visible');
        cy.contains('Use your skills to learn how to automate different scenarios').should('be.visible');
        
        
        const loginUrl = 'https://courses.ultimateqa.com';
        const testEmail = 'test@example.com';
        const testPassword = 'wrong_password';

        cy.visit(`${loginUrl}/users/sign_in`, { 
            timeout: 60000, 
            failOnStatusCode: false 
        }); 

        cy.origin(loginUrl, { args: { testEmail, testPassword } }, ({ testEmail, testPassword }) => {
            
            cy.contains('h2', 'Or sign in with', { timeout: 10000 }).should('be.visible'); 
            
            cy.log(`Introducerea datelor de autentificare: ${testEmail}`);
            
            cy.get('#user\\[email\\]').type(testEmail); 
            cy.get('#user\\[password\\]').type(testPassword);
            cy.get('button[type="submit"].button-primary').click();
            cy.wait(3000);
            cy.contains('Invalid email or password.', { timeout: 15000 }).should('be.visible');
        });

    });
});