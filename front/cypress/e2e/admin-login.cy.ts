describe('Admin Login', () => {
  it('should display an error message for incorrect credentials', () => {
    // Visite la page de connexion
    cy.visit('http://localhost:4200/login');

    // Saisit des identifiants incorrects
    cy.get('input[id="email"]').type('admin@admin.com');
    cy.get('input[id="password"]').type('wrongpassword');

    // Soumet le formulaire de connexion
    cy.get('button[type="submit"]').click();

    // Vérifie que le message d'erreur est affiché

    cy.get('#toast-container')
      .should('be.visible')
      .and('contain', 'Unauthorized');
  });
});
