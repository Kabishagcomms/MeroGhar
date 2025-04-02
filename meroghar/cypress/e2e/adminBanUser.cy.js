describe('Admin Ban User Functionality', () => {
    beforeEach(() => {
        // Login as admin
        cy.visit('/Home/login');
        cy.get('input#userId').type('admin');
        cy.get('input#password').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.wait(3000);

        cy.visit('/en/Home');
        cy.wait(3000);

        cy.visit('/Admin');
        cy.wait(4000);

        cy.visit('/Admin/users');
        cy.wait(2000);
    });

    it('should display users list in AdminTable', () => {
        // Check if AdminTable exists and has user data
        cy.get('table').should('exist');
        cy.get('tbody tr').should('have.length.at.least', 1);

        // Check table structure based on AdminTable component

    });

    it('should be able to ban a user', () => {
        // Find an active user row and click ban
        cy.get('tbody tr').contains('Active')
            .parent('tr')
            .within(() => {
                cy.get('button').contains('Ban User').click();
            });


    });

    it('should be able to unban a user', () => {
        // Find a banned user row and click unban
        cy.get('tbody tr').contains('Banned')
            .parent('tr')
            .within(() => {
                cy.get('button').contains('Unban User').click();
            });

        cy.get('body').within(() => {
            cy.contains('Are You Sure Unban User').should('be.visible');
            cy.contains('button', 'Unban User').click();
        });

    });

    it('should handle empty users list', () => {
        // Only test this if we get no users response
        cy.get('body').then(($body) => {
            if ($body.text().includes('No Users To Display !!!')) {
                cy.contains('No Users To Display !!!').should('be.visible');
            }
        });
    });
});