describe('KYC Form Submission', () => {
    beforeEach(() => {
        // Login before testing KYC functionality
        cy.visit('/Home/login');
        cy.get('input#userId').type('adin');
        cy.get('input#password').type('adin123');
        cy.get('button[type="submit"]').click();

        // Wait for login to complete and redirect
        cy.url().should('include', '/Home');

        // Wait for page load
        cy.wait(2000);

        // Navigate to Account page with locale prefix
        cy.visit('/en/Home/Account');

        // Wait for the page to load
        cy.wait(1000);

        // Click on Account Settings button
        cy.contains('Account Settings').click();

        // Wait for the account settings to load
        cy.wait(500);

        // Click on Add Kyc button
        cy.contains('Add Kyc').click();

        // Wait for KYC form to appear
        cy.wait(500);
    });

    it('should display KYC form', () => {
        // Verify form elements are visible
        cy.get('form').within(() => {
            cy.contains('First Name').should('be.visible');
            cy.contains('Last Name').should('be.visible');
            cy.contains('Gender').should('be.visible');
            cy.contains('Country').should('be.visible');
            cy.contains('Upload Image').should('be.visible');
        });
    });

    it('should show validation errors for empty fields', () => {
        // Open KYC form if needed
        cy.contains('Add Kyc').click();

        // Clear any pre-filled fields
        cy.get('input[placeholder="First Name"]').clear();
        cy.get('input[placeholder="Last Name"]').clear();

        // Try to submit the form without filling required fields
        cy.contains('Submit Kyc').click();

        // Check for validation errors
        cy.contains('Please Enter Valid firstName').should('be.visible');
        cy.contains('Please Enter Valid lastName').should('be.visible');
    });

    it('should allow selecting country, state, and city', () => {
        // Open KYC form
        cy.contains('Add Kyc').click();

        // Select country
        cy.get('select').eq(1).select(1); // Select first country in dropdown

        // Verify state dropdown is populated
        cy.get('select').eq(2).should('not.be.disabled');
        cy.get('select').eq(2).select(1); // Select first state

        // Verify city dropdown is populated
        cy.get('select').eq(3).should('not.be.disabled');
        cy.get('select').eq(3).select(1); // Select first city
    });

    it('should allow image upload', () => {
        // Open KYC form
        cy.contains('Add Kyc').click();

        // Upload test image
        cy.fixture('test-image.jpg', 'base64').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent,
                fileName: 'test-image.jpg',
                mimeType: 'image/jpeg'
            });
        });

        // Verify image preview is shown
        cy.get('img[alt="ImagePreviewHere"]').should('be.visible');
    });

    it('should submit KYC form with valid data', () => {
        // Open KYC form
        cy.contains('Add Kyc').click();

        // Fill in the form
        cy.get('input[placeholder="First Name"]').clear().type('Test');
        cy.get('input[placeholder="Last Name"]').clear().type('User');
        cy.get('select').eq(0).select('Male');

        // Select country, state, city
        cy.get('select').eq(1).select(1);
        cy.get('select').eq(2).select(1);
        cy.get('select').eq(3).select(1);

        // Upload test image
        cy.fixture('test-image.jpg', 'base64').then(fileContent => {
            cy.get('input[type="file"]').attachFile({
                fileContent,
                fileName: 'test-image.jpg',
                mimeType: 'image/jpeg'
            });
        });

        // Submit the form
        cy.contains('Submit Kyc').click();

        // Confirm submission in the confirmation modal
        cy.contains('Are You Sure To Submit Kyc?').should('be.visible');
        cy.contains('Submit').click();

        // Verify success message

    });
});