/// <reference types="cypress" />
describe('Admin Login', () => {
  it('should display an error message for incorrect credentials', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('input[id="email"]').type('admin@admin.com');
    cy.get('input[id="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    cy.get('#toast-container')
      .should('be.visible')
      .and('contain', 'Unauthorized');
  });
});
describe('Home page authentication,access and logout', () => {
  it("Allows login and displays the logout option", () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('admin@admin.com');
    cy.get('input[id=password]').type('a');
    cy.get('button[type=submit]').click();
    cy.contains("Déconnexion");
    cy.get('button[id=disconnect]').click();
    cy.contains("Se connecter");
  });
});
