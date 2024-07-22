describe('Verifier Page Load Test', () => {
    beforeEach(() => {
        cy.visit('/')
      });
  
      it('Displays tasks list by default', () => {
        cy.checkText("#task-heading", "Tasks")
      });
    });