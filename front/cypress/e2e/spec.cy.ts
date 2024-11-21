describe('Home page spec', () => {
  it('deployed react app to localhost', () => {
    cy.visit('http://localhost:4200/login')
    cy.contains("S'inscrire")
  })
})
