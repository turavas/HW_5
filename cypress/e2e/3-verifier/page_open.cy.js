describe('Verifier Page Load Test', () => {
    beforeEach(() => {
        cy.visit('https://sqlverifier-live-6e21ca0ed768.herokuapp.com')
      });
  
      it('Displays tasks list by default', () => {
        cy.get('#task-heading').should('have.text', 'Tasks')
      });
    });