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
