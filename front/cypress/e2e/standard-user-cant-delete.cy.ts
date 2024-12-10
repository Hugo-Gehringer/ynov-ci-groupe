/// <reference types="cypress" />

describe('Standard User Cannot See Delete Button', () => {
  it('should not display the delete button for a non-logged-in user', () => {
    // Visit the users page
    cy.visit('http://localhost:4200/users');

    // Verify that the delete button is not visible
    cy.get('button.delete-user').should('not.exist');
  });
});
