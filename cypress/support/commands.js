// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("clickElement", (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add("enterText", (selector, text) => {
  cy.get(selector).type(text);
});

Cypress.Commands.add("checkText", (selector, text) => {
  cy.get(selector).should("have.text", text);
});

Cypress.Commands.add("clearText", (selector) => {
  cy.get(selector).clear();
});

Cypress.Commands.add("checkElement", (selector) => {
  cy.get(selector).should("be.visible");
});

Cypress.Commands.add("checkUrl", (text) => {
  const baseUrl = Cypress.config("baseUrl");
  cy.url().should("eq", baseUrl + text);
});

Cypress.Commands.add("checkClass", (selector, classValue) => {
    cy.get(selector).should('have.class', classValue);
});

Cypress.Commands.add("checkAriaInvalid", (selector) => {
  cy.get(selector).should('have.attr', 'aria-invalid', 'true');
});

Cypress.Commands.add("checkValid", (selector) => {
  cy.get(selector).should('not.have.attr', 'aria-invalid', 'true');
});

Cypress.Commands.add("checkCSS", (selector, property, value) => {
  cy.get(selector).should("have.css", property, value);
});

Cypress.Commands.add("checkFieldValidation", (selector, errorMessage) => {
  cy.get(selector).should('have.attr', 'aria-invalid', 'true');
  cy.get(selector).siblings('.invalid-feedback').should('contain', errorMessage);
  });

Cypress.Commands.add("checkFieldValid", (selector) => {
  cy.get(selector).should('not.have.attr', 'aria-invalid', 'true');
  cy.get(selector).siblings('.invalid-feedback').should('not.exist');
});

Cypress.Commands.add("logout", () => {
  cy.contains("Account").click();
  cy.contains("Sign out").click();
});