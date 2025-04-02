import 'cypress-file-upload';

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('login', (userId, password) => {
  cy.visit('/Home/login');
  cy.get('input[name="userId"]').type(userId);
  cy.get('input[name="password"]').type(password);
  cy.contains('button', 'Sign In').click();
});

// Command to check if user is logged in
Cypress.Commands.add('isLoggedIn', () => {
  // This depends on your UI, but typically you'd check for user-specific elements
  cy.get('[data-testid="user-menu"]').should('exist');
});

// Command to logout
Cypress.Commands.add('logout', () => {
  // This depends on your UI, but typically you'd click a logout button
  cy.get('[data-testid="user-menu"]').click();
  cy.contains('Logout').click();
});