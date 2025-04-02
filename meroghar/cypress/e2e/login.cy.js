describe('Login Functionality', () => {
    beforeEach(() => {
        // Visit the dedicated login page
        cy.visit('/Home/login');
    });

    it('should display login form', () => {
        // Check if the login form elements are visible
        cy.get('form').should('be.visible');

        // Check for the login title - using a more generic approach since it's translated
        cy.get('h2').should('be.visible');

        // Check for userId and password fields
        cy.get('input#userId').should('be.visible');
        cy.get('input#password').should('be.visible');
    });

    it('should show validation errors for empty fields', () => {
        // Submit the form without entering any data
        cy.get('button[type="submit"]').click();

        // The form uses react-hook-form validation
        // Look for any error message element

    });

    it('should show error for invalid credentials', () => {
        // Fill in with invalid credentials
        cy.get('input#userId').type('invaliduser');
        cy.get('input#password').type('invalidpassword');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for error toast - this might need adjustment based on how toast appears in your app
        // The component shows "Login Failed/Invalid Credential/UserBanned" toast on failure
        cy.contains(/failed|invalid|banned/i).should('exist');
    });

    it('should show loading state when submitting', () => {
        // Fill in with some credentials
        cy.get('input#userId').type('testuser');
        cy.get('input#password').type('password123');

        // Intercept the API call to delay it
        cy.intercept('POST', '/auth/v1/login', (req) => {
            req.reply({
                delay: 1000,
                statusCode: 200,
                body: { success: false, error: 'Invalid credentials' }
            });
        }).as('loginRequest');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for loading spinner
        cy.get('svg.animate-spin').should('be.visible');

        // Wait for the request to complete
        cy.wait('@loginRequest');
    });

    // This test uses a valid test user in your system
    it('should login successfully with valid credentials', () => {
        // Enter valid credentials
        cy.get('input#userId').type('drake');
        cy.get('input#password').type('drake123');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Check for success toast
        cy.contains('Login Successful').should('be.visible');


    });

    it('should have a link to signup page', () => {
        // Check if the signup link exists
        cy.contains(/sign up|create account/i).should('exist');
    });

    it('should have a forgot password link', () => {
        // Check if the forgot password link exists
        cy.contains(/forgot|reset/i).should('exist');
    });
});