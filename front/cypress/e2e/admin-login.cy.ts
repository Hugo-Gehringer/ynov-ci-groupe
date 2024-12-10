/// <reference types="cypress" />
describe('Admin Login', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/login', (req) => {
      if (req.body.password === 'wrongpassword') {
        req.reply({
          statusCode: 401,
          body: {
            error: "Invalid email or password"
          }
        });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            "_id": "1",
            "firstName": "a",
            "lastName": "a",
            "email": "iiiii@iiii.com",
            "birthDate": "1990-01-01T00:00:00.000Z",
            "city": "Montpellier",
            "postalCode": "34000",
            "isAdmin": true
          }
        });
      }
    }).as('login');

    cy.intercept('GET', '**/users', {
      statusCode: 200,
      body: [
        {
          "_id": "1",
          "firstName": "Admin",
          "lastName": "Admin",
          "email": "admin@admin.com",
          "birthDate": "1990-01-01T00:00:00.000Z",
          "city": "Montpellier",
          "postalCode": "34000",
          "isAdmin": true
        },
        {
          "_id": "2",
          "firstName": "a",
          "lastName": "b",
          "email": "a@b.com",
          "birthDate": "2001-01-01T00:00:00.000Z",
          "city": "Montpellier",
          "postalCode": "34000",
          "isAdmin": false,
          "__v": 0
        }
      ]
    }).as('users');
  });

  it('should display an error message for incorrect credentials', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('input[id="email"]').type('admin@admin.com');
    cy.get('input[id="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    // Attendre l'interception avec une réponse 401
    cy.wait('@login');
    cy.get('#toast-container')
      .should('be.visible')
      .and('contain', 'Unauthorized');
  });

  it("Allows login and displays the logout option", () => {
    cy.visit('http://localhost:4200/login');
    cy.get('input[id=email]').type('toto@titi.com');
    cy.get('input[id=password]').type('abc');
    cy.get('button[type=submit]').click();

    cy.wait('@login');
    cy.wait('@users');
    cy.contains("Déconnexion");
  });
});
