import { LoginPage } from "../../pages/LoginPage";
import { ChangePasswordPage } from "../../pages/ChangePassordPage";

import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.visit("/account/login");
});

describe.only("Verifier - Login UI", () => {
  it.only("user cannot login with old password", () => {
    let loginPage = new LoginPage();
    let changePasswordPage = new ChangePasswordPage();
    let username = Cypress.env("student_username");
    let oldPassword = Cypress.env("student_password");
    let newPassword = faker.internet.password();
    cy.log(newPassword);

    loginPage.login(username, oldPassword);
    cy.contains("Swagger").should("be.visible");
    cy.logout();

    cy.visit("/account/login");
    changePasswordPage.changePassword(username, oldPassword, newPassword);
    cy.logout();

    cy.visit("/account/login"); // user can login with a new passord
    loginPage.login(username, newPassword);
    cy.contains("Swagger").should("be.visible");
    cy.logout();

    cy.visit("/account/login"); // user cann't login with an old passord
    loginPage.login(username, oldPassword);
    cy.checkText(
      "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span > strong",
      "Failed to sign in!"
    );
  });
});