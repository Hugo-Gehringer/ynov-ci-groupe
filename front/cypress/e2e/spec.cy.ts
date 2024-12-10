import cypressConfig from '../../cypress.config';

describe('Login page', () => {
  it("Displays the login page", () => {
    cy.visit('http://localhost:4200/login');
    cy.contains("Se connecter");
  });
});

describe('Register page', () => {
  it("Displays the register page", () => {
    cy.visit('http://localhost:4200/register');
    cy.contains("S'inscrire");
  });
});


describe('Redirect to login page by default', () => {
  it("Redirects to the login page when accessing the root URL", () => {
    cy.visit('http://localhost:4200/');
    cy.contains("Se connecter");
  });
});

describe('Invalid url handling -> redirection', () => {
  it("Redirects to the login page for an invalid URL", () => {
    cy.visit('http://localhost:4200/bad-url');
    cy.contains("Se connecter");
  });
});
