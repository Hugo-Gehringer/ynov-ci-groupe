import cypressConfig from '../../cypress.config';

describe('Login page spec', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:4200/login')
    cy.contains("Se connecter")
  })
})
describe('Register page spec', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:4200/register')
    cy.contains("S'inscrire")
  })
})
describe('Home page spec', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:4200/login')
    cy.get('input[id=email]').type('admin@admin.com')
    cy.get('input[id=password]').type('a')
    cy.get('button[type=submit]').click()
    cy.contains("Déconnexion")
  })
})
describe('Redirect to login page', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:4200/')
    cy.contains("Se connecter")
  })
})
describe('Redirect to login bad url', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:4200/bad-url')
    cy.contains("Se connecter")
  })
})
describe('Inscription', () => {
  it('deployed react app to localhost', () => {
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
describe('Delete user', () => {
  it('deployed react app to localhost', () => {
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
