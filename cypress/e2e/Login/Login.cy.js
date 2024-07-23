beforeEach(() => {
  cy.visit("/login");
});

describe("Checks For Login", () => {
  it("successful login", () => {
    cy.get("#username").type(Cypress.env("student_username"));
    cy.get("#password").type(Cypress.env("student_password"));
    cy.clickElement(
      "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
    );
    cy.checkText("#task-heading > span", "Tasks");
  });

  it("unsuccessful login with wrong username", () => {
    cy.get("#username").type("test-31");
    cy.get("#password").type(Cypress.env("student_password"));
    cy.clickElement(
      "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
    );
    cy.checkText(
      "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span",
      "Failed to sign in! Please check your credentials and try again."
    );
  });

  it("unsuccessful login with wrong password", () => {
    cy.get("#username").type(Cypress.env("student_username"));
    cy.get("#password").type(12345);
    cy.clickElement(
      "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
    );
    cy.checkText(
      "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span",
      "Failed to sign in! Please check your credentials and try again."
    );
  });

  it("unsuccessful login with empty fields", () => {
    cy.get("#username").type(" ");
    cy.get("#password").type(" ");
    cy.clickElement(
      "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
    );
    cy.checkText(
      "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span",
      "Failed to sign in! Please check your credentials and try again."
    );
  });
});
