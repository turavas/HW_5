describe('Verifier Page Load Test', () => {
    beforeEach(() => {
        cy.visit('')
      });
  
      it('Displays tasks list by default', () => {
        cy.get('#task-heading').should('have.text', 'Tasks')
      });
    });