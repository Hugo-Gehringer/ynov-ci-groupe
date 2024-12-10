/// <reference types="cypress" />

/// <reference types="cypress" />

describe('User Registration, Login, and Admin Operations', () => {
  beforeEach(() => {
    // Mock API endpoints
    cy.intercept('POST', '**/users', {
      statusCode: 201,
      body: { id: '2a2a2a' },
    }).as('register');

    cy.intercept('POST', '**/login', (req) => {
      if (req.body.email === 'admin@admin.com') {
        req.reply({
          statusCode: 200,
          body: {
            _id: '1',
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@admin.com',
            isAdmin: true,
          },
        });
      } else if (req.body.email === 'a@b.com') {
        req.reply({
          statusCode: 200,
          body: {
            _id: '2',
            firstName: 'Toto',
            lastName: 'Titi',
            email: 'toto.titi@tt.a',
            isAdmin: false,
          },
        });
      } else {
        req.reply({
          statusCode: 401,
          body: { error: 'Invalid email or password' },
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
      ],
    }).as('getUsers');

    cy.intercept('DELETE', '**/users/*', {
      statusCode: 200,
      body: { message: 'Utilisateur supprimé avec succès' },
    }).as('deleteUser');
  });

  it('Displays validation errors during the registration process', () => {
    cy.visit('http://localhost:4200/register');

    cy.get('input[id=firstName]').type('a').clear().blur();
    cy.contains('Veuillez saisir un prénom');

    cy.get('input[id=lastName]').type('b').clear().blur();
    cy.contains('Veuillez saisir un nom');

    cy.get('input[id=email]').type('a@').blur();
    cy.contains('Veuillez saisir un email valide');

    cy.get('input[id=password]').type('a').clear().blur();
    cy.contains('Veuillez saisir un mot de passe');

    cy.get('input[id=birthDate]').type('2022-01-01').blur();
    cy.contains('Vous devez être majeur');

    cy.get('input[id=city]').type('VILLE').clear().blur();
    cy.contains('Veuillez saisir une ville');

    cy.get('input[id=postalCode]').type('1').blur();
    cy.contains('Veuillez saisir un code postal valide avec 5 chiffres');
  });

  it('Registers a new user and logs them in successfully', () => {
    cy.visit('http://localhost:4200/register');

    cy.get('input[id=firstName]').type('a');
    cy.get('input[id=lastName]').type('b');
    cy.get('input[id=email]').type('a@b.com');
    cy.get('input[id=password]').type('a');
    cy.get('input[id=birthDate]').type('2000-01-01');
    cy.get('input[id=city]').type('VILLE');
    cy.get('input[id=postalCode]').type('12345');
    cy.get('button[type=submit]').click();
    cy.wait('@register');

    cy.contains('Utilisateur ajouté avec succès');

    cy.get('input[id=email]').type('a@b.com');
    cy.get('input[id=password]').type('a');
    cy.get('button[type=submit]').click();

    cy.wait('@login');
    cy.contains('Déconnexion');
    cy.contains('a@b.com');

    cy.get('button[id=disconnect]').click();
    cy.contains('Se connecter');
  });

  it('Logs in as admin and deletes a user account', () => {
    cy.visit('http://localhost:4200/login');

    cy.get('input[id=email]').type('admin@admin.com');
    cy.get('input[id=password]').type('a');
    cy.get('button[type=submit]').click();

    cy.wait('@login');
    cy.contains('Déconnexion');

    cy.get('button[id=delete]').click();

    cy.wait('@deleteUser');
    cy.get('button[id=disconnect]').click();
    cy.contains('Se connecter');
  });
});
