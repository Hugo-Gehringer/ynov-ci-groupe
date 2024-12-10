/// <reference types="cypress" />

describe('Standard user cannot see delete button', () => {
  it('should not display the delete button for a non-logged-in user', () => {
    cy.visit('http://localhost:4200/users-list');

    cy.get('button.delete-user').should('not.exist');
  });
});

describe('User registration process get errors validation', () => {
  it('Displays validation errors during the registration process', () => {
    cy.visit('http://localhost:4200/register')

    cy.get('input[id=firstName]').type('Toto')
    cy.get('input[id=firstName]').clear()
    cy.get('input[id=firstName]').blur()
    cy.contains("Veuillez saisir un prénom")

    cy.get('input[id=lastName]').type('Titi')
    cy.get('input[id=lastName]').clear()
    cy.get('input[id=lastName]').blur()
    cy.contains("Veuillez saisir un nom")

    cy.get('input[id=email]').type('toto.titi@')
    cy.get('input[id=email]').blur()
    cy.contains("Veuillez saisir un email valide")

    cy.get('input[id=password]').type('a')
    cy.get('input[id=password]').clear()
    cy.get('input[id=password]').blur()
    cy.contains("Veuillez saisir un mot de passe")

    cy.get('input[id=birthDate]').type('2022-01-01')
    cy.get('input[id=birthDate]').blur()
    cy.contains("Vous devez être majeur")

    cy.get('input[id=city]').type('VILLE')
    cy.get('input[id=city]').clear()
    cy.get('input[id=city]').blur()
    cy.contains("Veuillez saisir une ville")

    cy.get('input[id=postalCode]').type('123456789')
    cy.get('input[id=postalCode]').blur()
    cy.contains("Veuillez saisir un code postal valide avec 5 chiffres\n")
  })
})
