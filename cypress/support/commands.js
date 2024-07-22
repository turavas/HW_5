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

Cypress.Commands.add("checkElement", (selector) => {
  cy.get(selector).should("be.visible");
});

Cypress.Commands.add("checkUrl", (text) => {
  const baseUrl = Cypress.config("baseUrl");
  cy.url().should("eq", baseUrl + text);
});


