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
describe('Home page authentication and access', () => {
  it("Allows login and displays the logout option", () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('admin@admin.com');
    cy.get('input[id=password]').type('a');
    cy.get('button[type=submit]').click();
    cy.contains("Déconnexion");
  });
});
describe('User registration process', () => {
  it('Registers a new user and logs them in successfully', () => {
    cy.visit('http://localhost:4200/register')
    cy.get('input[id=firstName]').type('Toto')
    cy.get('input[id=lastName]').type('Titi')
    cy.get('input[id=email]').type('toto.titi@tt.a')
    cy.get('input[id=password]').type('a')
    cy.get('input[id=birthDate]').type('2000-01-01')
    cy.get('input[id=city]').type('VILLE')
    cy.get('input[id=postalCode]').type('12345')
    cy.get('button[type=submit]').click()
    cy.contains("Utilisateur ajouté avec succès")
    cy.contains("Se connecter")
    cy.get('input[id=email]').type('toto.titi@tt.a')
    cy.get('input[id=password]').type('a')
    cy.get('button[type=submit]').click()
    cy.contains("Déconnexion")
    cy.contains("toto.titi@tt.a")
    cy.get('button[id=disconnect]').click()
  })
})
describe('Admin deletion process', () => {
  it('Logs in as admin and deletes a user account', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('input[id=email]').type('admin@admin.com')
    cy.get('input[id=password]').type('a')
    cy.get('button[type=submit]').click()
    cy.contains("Déconnexion")
    cy.get('button[id=delete]').click()
    cy.get('button[id=disconnect]').click()
    cy.contains("Se connecter")
  })
})
