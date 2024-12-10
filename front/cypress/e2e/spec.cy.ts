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
