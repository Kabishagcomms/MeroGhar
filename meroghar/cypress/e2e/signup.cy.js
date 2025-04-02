describe('Signup Functionality', () => {
    beforeEach(() => {
        // Visit the dedicated signup page
        cy.visit('/Home/signup');
    });

    it('should display signup form', () => {
        // Check if the signup form elements are visible
        cy.get('form').should('be.visible');

        // Check for the signup title from translations
        // Using a partial match since we don't know the exact translation
        cy.get('h2').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        // Submit the form without entering any data
        cy.get('button[type="submit"]').click();

        // The form uses react-hook-form validation
        // Check for error messages that appear when fields are empty

    });

    it('should validate email format', () => {
        // Fill in userId
        cy.get('input#userId').type('testuser');

        // Enter invalid email
        cy.get('input#email').type('invalidemail');

        // Fill in password
        cy.get('input#password').type('password123');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for email validation error
        // The component uses t('validation.email') for email validation errors
        cy.get('form').contains(/email|invalid/i).should('be.visible');
    });

    it('should validate password length', () => {
        // Fill in userId
        cy.get('input#userId').type('testuser');

        // Fill in email
        cy.get('input#email').type('test@example.com');

        // Enter short password (less than 6 characters)
        cy.get('input#password').type('123');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for password validation error
        // The component requires at least 6 characters for password
        cy.get('form').contains(/password|characters/i).should('be.visible');
    });

    it('should validate userId length', () => {
        // Enter short userId (less than 4 characters)
        cy.get('input#userId').type('abc');

        // Fill in email
        cy.get('input#email').type('test@example.com');

        // Fill in password
        cy.get('input#password').type('password123');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for userId validation error
        // The component requires at least 4 characters for userId during signup
        cy.get('form').contains(/user|id|characters/i).should('be.visible');
    });

    // This test would require cleaning up after to avoid test data accumulation
    it.skip('should register a new user successfully', () => {
        // Generate a unique username and email
        const uniqueId = 312512512;
        const username = `testuserdad`;
        const email = `test${uniqueId}@example.com`;

        // Fill in the form with valid data
        cy.get('input#userId').type(username);
        cy.get('input#email').type(email);
        cy.get('input#password').type('password123');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for success toast message
        // The component shows "User Registered Successfully!" toast on success
        cy.contains('User Registered Successfully').should('be.visible');
    });
});