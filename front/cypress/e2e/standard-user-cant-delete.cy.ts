/// <reference types="cypress" />

describe('Standard User Cannot See Delete Button', () => {
  it('should not display the delete button for a non-logged-in user', () => {
    cy.visit('http://localhost:4200/users-list');

    cy.get('button.delete-user').should('not.exist');
  });
});
