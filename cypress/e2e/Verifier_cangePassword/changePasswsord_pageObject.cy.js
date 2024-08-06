const loginPageElements = require("../fixtures/pages/loginPageElements.json");
const changePasswordElements = require("../fixtures/pages/changePasswordElements.json");

import { faker } from "@faker-js/faker";

describe("Login UI", () => {
  it("user cannot login with old password", () => {
    let username = Cypress.env("student_username");
    let oldPassword = Cypress.env("student_password");
    let newPassword = faker.internet.password();

    cy.visit("/account/login");
    cy.login(username, oldPassword);
    cy.contains("Swagger").should("be.visible");
    cy.logout();

    cy.visit("/account/login");
    cy.changePassword(username, oldPassword, newPassword);
    cy.logout();

    cy.visit("/account/login");
    cy.login(username, newPassword);
    cy.contains("Swagger").should("be.visible");
    cy.logout();

    cy.visit("/account/login");
    cy.login(username, oldPassword);
    cy.checkText(
      "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span > strong",
      "Failed to sign in!"
    );

    cy.visit("/account/login");
    cy.changePassword(username, newPassword, oldPassword);
    cy.wait(5000);
    cy.logout();
  });
});