describe("The redirection after clicking header's menu elements", () => {
    beforeEach(() => {
      cy.visit(""), cy.get("#account-menu > a > span").click();
      cy.get("#login-item > span").click();
      cy.get("#username").type(Cypress.env('student_username'));
      cy.get("#password").type(Cypress.env('student_password'));
      cy.get(
        "#login-page > div > form > div.modal-footer > button.btn.btn-primary > span"
      ).click();
    });
  
    it('Redirection to task page after clicking "Task" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#entity-menu > a > span").click();
      cy.get("#entity-menu > div > a:nth-child(1)").click();
      cy.get("#task-heading > div > button > span").should(
        "have.text",
        "Refresh list"
      );
      cy.url().should(
        "eq",
        baseUrl + "/task?page=1&sort=id,asc"
      );
    });
  
    it('Redirection to a user tasks page after clicking "User task" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#entity-menu > a > span").click();
      cy.get("#entity-menu > div > a:nth-child(2) > span").click();
      cy.get("#user-task-heading > span").should("have.text", "User Tasks");
      cy.url().should(
        "eq",
        baseUrl + "/user-task"
      );
    });
  
    it('Redirection to home page after clicking "Home" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#entity-menu > a > span").click();
      cy.get("#entity-menu > div > a:nth-child(1)").click();
      cy.get("#header-tabs > li:nth-child(1) > a > span > span").click();
      cy.get("#task-heading > span").should("have.text", "Tasks");
      cy.url().should(
        "eq",
        baseUrl + "/?page=1&sort=id,asc"
      );
    });
  
    it('Redirection to api page after clicking "API" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#docs-menu > a > span").click();
      cy.get("#docs-menu > div > a > span").click();
      cy.get("#app-view-container > div.jh-card.card").should("be.visible");
      cy.url().should(
        "eq",
        baseUrl + "/docs/docs"
      );
    });
  
    it('Localization to french after clicking "Français" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#header-tabs > li:nth-child(4) > a > span").click();
      cy.get(
        "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(2)"
      ).click();
      cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
        "have.text",
        "Accueil"
      );
      cy.url().should(
        "eq",
        baseUrl + "/?page=1&sort=id,asc"
      );
    });
  
    it('Localization to englsh after clicking "English" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#header-tabs > li:nth-child(4) > a > span").click();
      cy.get(
        "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(2)"
      ).click();
      cy.get("#header-tabs > li:nth-child(4) > a > span").click();
      cy.get(
        "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(1)"
      ).click();
      cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
        "have.text",
        "Home"
      );
      cy.url().should(
        "eq",
        baseUrl + "/?page=1&sort=id,asc"
      );
    });
  
    it('Localization to russian after clicking "Русский" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#header-tabs > li:nth-child(4) > a > span").click();
      cy.get(
        "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(3)"
      ).click();
      cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
        "have.text",
        "Главная"
      );
      cy.url().should(
        "eq",
        baseUrl + "/?page=1&sort=id,asc"
      );
    });
  
    it('Localization to ukrainian after clicking "Українська" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#header-tabs > li:nth-child(4) > a > span").click();
      cy.get(
        "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(4)"
      ).click();
      cy.get("#header-tabs > li:nth-child(1) > a > span > span").should(
        "have.text",
        "Головна"
      );
      cy.url().should(
        "eq",
        baseUrl + "/?page=1&sort=id,asc"
      );
    });
  
    it('Redirection to a settings page after clicking "Settings" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#account-menu > a > span").click();
      cy.get("#account-menu > div > a:nth-child(1) > span").click();
      cy.get("#firstNameLabel").should("have.text", "First Name");
      cy.url().should(
        "eq",
        baseUrl + "/account/settings"
      );
    });
  
    it('Redirection to a password page after clicking "Password" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#account-menu > a > span").click();
      cy.get("#account-menu > div > a:nth-child(2) > span").click();
      cy.get("#currentPasswordLabel").should("have.text", "Current password");
      cy.url().should(
        "eq",
        baseUrl + "/account/password"
      );
    });
  
    it('Signing out after clicking "Sign out" button', () => {
      const baseUrl = Cypress.config('baseUrl');
      cy.get("#account-menu > a > span").click();
      cy.get("#account-menu > div > a:nth-child(3) > span").click();
      cy.get("#app-view-container > div.jh-card.card > div > div > h4").should(
        "have.text",
        "Logged out successfully!"
      );
      cy.url().should(
        "eq",
        baseUrl + "/logout"
      );
    });
  });