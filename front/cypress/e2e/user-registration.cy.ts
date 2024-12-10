/// <reference types="cypress" />

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

    cy.get('input[id=postalCode]').type('1')
    cy.get('input[id=postalCode]').blur()
    cy.contains("Veuillez saisir un code postal valide avec 5 chiffres")
  })
})
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
