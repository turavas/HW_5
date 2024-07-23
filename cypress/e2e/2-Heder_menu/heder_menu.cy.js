beforeEach(() => {
  cy.visit("/");
  cy.clickElement("#account-menu > a > span");
  cy.clickElement("#login-item > span");
  cy.get("#username").type(Cypress.env("student_username"));
  cy.get("#password").type(Cypress.env("student_password"));
  cy.clickElement(
    "#login-page > div > form > div.modal-footer > button.btn.btn-primary > span"
  );
});

describe("The redirection after clicking header's menu elements", () => {
  it('Redirection to task page after clicking "Task" button', () => {
    cy.clickElement("#entity-menu > a > span");
    cy.clickElement("#entity-menu > div > a:nth-child(1)");
    cy.checkText("#task-heading > div > button > span", "Refresh list");
    cy.checkUrl("/task?page=1&sort=id,asc");
  });

  it('Redirection to a user tasks page after clicking "User task" button', () => {
    cy.clickElement("#entity-menu > a > span");
    cy.clickElement("#entity-menu > div > a:nth-child(2) > span");
    cy.checkText("#user-task-heading > span", "User Tasks");
    cy.checkUrl("/user-task");
  });

  it('Redirection to home page after clicking "Home" button', () => {
    cy.clickElement("#entity-menu > a > span");
    cy.clickElement("#entity-menu > div > a:nth-child(1)");
    cy.clickElement("#header-tabs > li:nth-child(1) > a > span > span");
    cy.checkText("#task-heading > span", "Tasks");
    cy.checkUrl("/?page=1&sort=id,asc");
  });

  it('Redirection to api page after clicking "API" button', () => {
    cy.clickElement("#docs-menu > a > span");
    cy.clickElement("#docs-menu > div > a > span");
    cy.checkElement("#app-view-container > div.jh-card.card");
    cy.checkUrl("/docs/docs");
  });

  it('Localization to french after clicking "Français" button', () => {
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(2)"
    );
    cy.checkText("#header-tabs > li:nth-child(1) > a > span > span", "Accueil");
    cy.checkUrl("/?page=1&sort=id,asc");
  });

  it('Localization to englsh after clicking "English" button', () => {
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(2)"
    );
    cy.wait(1000);
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(1)"
    );
    cy.checkText("#header-tabs > li:nth-child(1) > a > span > span", "Home");
    cy.checkUrl("/?page=1&sort=id,asc");
  });

  it('Localization to russian after clicking "Русский" button', () => {
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(3)"
    );
    cy.checkText("#header-tabs > li:nth-child(1) > a > span > span", "Главная");
    cy.checkUrl("/?page=1&sort=id,asc");
  });

  it('Localization to ukrainian after clicking "Українська" button', () => {
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(4)"
    );
    cy.checkText("#header-tabs > li:nth-child(1) > a > span > span", "Головна");
    cy.checkUrl("/?page=1&sort=id,asc");
  });

  it('Redirection to a settings page after clicking "Settings" button', () => {
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(1)"
    );
    cy.clickElement("#account-menu > a > span");
    cy.clickElement("#account-menu > div > a:nth-child(1) > span");
    cy.checkText("#firstNameLabel", "First Name");
    cy.checkUrl("/account/settings");
  });

  it('Redirection to a password page after clicking "Password" button', () => {
    cy.clickElement("#header-tabs > li:nth-child(4) > a > span");
    cy.clickElement(
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(1)"
    );
    cy.clickElement("#account-menu > a > span");
    cy.clickElement("#account-menu > div > a:nth-child(2) > span");
    cy.checkText("#currentPasswordLabel", "Current password");
    cy.checkUrl("/account/password");
  });

  it('Signing out after clicking "Sign out" button', () => {
    cy.clickElement("#account-menu > a > span");
    cy.clickElement("#account-menu > div > a:nth-child(3) > span");
    cy.checkText(
      "#app-view-container > div.jh-card.card > div > div > h4",
      "Logged out successfully!"
    );
    cy.checkUrl("/logout");
  });
});
