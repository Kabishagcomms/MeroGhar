describe('Admin KYC Request Verification', () => {
    beforeEach(() => {
        // Login as admin
        cy.visit('/Home/login');
        cy.get('input#userId').type('admin');
        cy.get('input#password').type('admin123');
        cy.get('button[type="submit"]').click();

        // Wait for login to complete
        cy.wait(2000);

        cy.visit('/en/Home');
        cy.wait(2000);

        // Navigate to admin dashboard
        cy.visit('/Admin');
        cy.wait(1000);

        // Click on KYC Requests in sidebar
        cy.contains('Kyc Requests').click();
        cy.wait(3000);
        // Verify we're on the KYC requests page

    });

    it('should display KYC requests list', () => {
        // Check if the page title is visible
        cy.contains('User KYC Requests').should('be.visible');

        // Check if the user cards are displayed
        cy.get('[data-testid="user-card"]').should('exist');
    });

    it('should be able to verify a KYC request', () => {
        // Get the first KYC request card
        cy.get('[data-testid="user-card"]').first().within(() => {
            // Click the verify button
            cy.contains('Verify').click();
        });

        // Handle confirmation modal if it exists
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="confirm-modal"]').length > 0) {
                cy.contains('Confirm').click();
            }
        });


    });

    it('should show empty state when no requests', () => {
        // This test will only run if there are no KYC requests
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="user-card"]').length === 0) {
                cy.contains('No KYC Requests To Verify').should('be.visible');
                cy.get('.fa-clipboard-check').should('be.visible');
            }
        });
    });

    it('should handle pagination if more than 10 requests', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="user-card"]').length >= 10) {
                cy.contains('Next').should('be.visible');
                cy.contains('Previous').should('be.visible');
            }
        });
    });
});