import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.visit("/account/register");
});

describe("General Checks For Registration", () => {
  it("successful registration of a new user", () => {
    const password = faker.internet.password();
    cy.enterText('[data-cy="username"]', faker.internet.userName());
    cy.enterText('[data-cy="email"]', faker.internet.email());
    cy.enterText('[data-cy="firstPassword"]', password);
    cy.enterText('[data-cy="secondPassword"]', password);
    cy.clickElement('[data-cy="submit"]');
  });
});

describe("Registration Form Validation", () => {
  it("should display validation messages for empty required fields", () => {
    cy.clickElement('[data-cy="submit"]');
    cy.checkFieldValidation(
      '[data-cy="username"]',
      "Your username is required."
    );
    cy.checkFieldValidation('[data-cy="email"]', 
      "Your email is required.");
    cy.checkFieldValidation(
      '[data-cy="firstPassword"]',
      "Your password is required."
    );
    cy.checkFieldValidation(
      '[data-cy="secondPassword"]',
      "Your confirmation password is required."
    );
  });
});

describe("Username Validation Tests", () => {
  it("should display validation message for username field if left empty", () => {
    const password = faker.internet.password();
    cy.enterText('[data-cy="email"]', faker.internet.email());
    cy.enterText('[data-cy="firstPassword"]', password);
    cy.enterText('[data-cy="secondPassword"]', password);
    cy.clickElement('[data-cy="submit"]');
    cy.checkFieldValidation(
      '[data-cy="username"]',
      "Your username is required."
    );
  });

  it("Should display an error message when requared field if left empty after focusing and blurring", () => {
    const password = faker.internet.password();
    cy.enterText('[data-cy="username"]', faker.internet.userName());
    cy.clickElement('[data-cy="email"]').blur();
    cy.clickElement('[data-cy="firstPassword"]');
    cy.enterText('[data-cy="firstPassword"]', password);
    cy.checkFieldValidation('[data-cy="email"]', "Your email is required.");
  });

  it("Should accept a correct username", () => {
    cy.enterText('[data-cy="username"]', "test");
    cy.clickElement('[data-cy="email"]');
    cy.checkFieldValid('[data-cy="username"]', "Your username is invalid.");
  });

  it("Should accept a numeric username", () => {
    cy.enterText('[data-cy="username"]', "1111");
    cy.clickElement('[data-cy="email"]');
    cy.checkFieldValid('[data-cy="username"]', "Your username is invalid.");
  });

  it("Should accept an alphanumeric username", () => {
    cy.enterText('[data-cy="username"]', "test1111");
    cy.checkFieldValid('[data-cy="username"]', "Your username is invalid.");
  });

  it("Should reject a username with special characters", () => {
    cy.enterText('[data-cy="username"]', "@$$");
    cy.get('[data-cy="username"]').blur();
    cy.checkFieldValidation('[data-cy="username"]', "Your username is invalid.");
    cy.clearText('[data-cy="username"]');
  });

  it("Should reject a username with mixed characters, numeric, special", () => {
    cy.enterText('[data-cy="username"]', "roma123$$$");
    cy.get('[data-cy="username"]').blur();
    cy.checkFieldValidation('[data-cy="username"]', "Your username is invalid.");
    cy.clearText('[data-cy="username"]');
  });

  it("Should reject a username with leading and trailing spaces", () => {
    cy.enterText('[data-cy="username"]', " ola ");
    cy.get('[data-cy="username"]').blur();
    cy.checkFieldValidation('[data-cy="username"]', "Your username is invalid.");
    cy.clearText('[data-cy="username"]');
  });
});

describe("Email Validation Tests", () => {
  it("Should accept a valid email", () => {
    cy.enterText('[data-cy="email"]', "test@test.com");
    cy.clickElement('[data-cy="username"]');
    cy.checkFieldValid('[data-cy="email"]', "Your email is invalid.");
  });

  it("Should accept another valid email with number", () => {
    cy.enterText('[data-cy="email"]', "test2@mail.ru");
    cy.clickElement('[data-cy="firstPassword"]');
    cy.checkFieldValid('[data-cy="email"]', "Your email is invalid.");
  });

  it("Should accept an email with an dot in the name", () => {
    cy.enterText('[data-cy="email"]', "test.2@test.com");
    cy.clickElement('[data-cy="secondPassword"]');
    cy.checkFieldValid('[data-cy="email"]', "Your email is invalid.");
  });

  it("Should reject an email with leading and trailing spaces", () => { //bug
    cy.enterText('[data-cy="email"]', " test@test.com ");
    cy.get('[data-cy="email"]').blur();
    cy.checkFieldValidation('[data-cy="email"]', "Your email is invalid.");
    cy.clearText('[data-cy="email"]');
  });
});

describe("Password Validation Tests", () => {
  it("Should validate the strength for a simple password", () => {
    cy.enterText('[data-cy="firstPassword"]', "1234");
    cy.checkFieldValid(
      '[data-cy="firstPassword"]',
      "Your password is required to be at least 4 characters."
    );
    cy.checkCSS(
      "#strengthBar > li:nth-child(1)",
      "background-color",
      "rgb(255, 0, 0)"
    );
  });

  it("Should validate the strength for a medium password", () => {
    cy.enterText('[data-cy="firstPassword"]', "1234@@GG");
    cy.checkFieldValid(
      '[data-cy="firstPassword"]',
      "Your password is required to be at least 4 characters."
    );
    cy.checkCSS(
      "#strengthBar > li:nth-child(1)",
      "background-color",
      "rgb(255, 153, 0)"
    );
  });

  it("Should validate the strength for a strong password", () => {
    cy.enterText('[data-cy="firstPassword"]', "1234@@GG@@12GG@@BB22GG$$JJ");
    cy.checkFieldValid(
      '[data-cy="firstPassword"]',
      "Your password is required to be at least 4 characters."
    );
    cy.checkCSS(
      "#strengthBar > li:nth-child(1)",
      "background-color",
      "rgb(153, 255, 0)"
    );
  });

  it("Should validate the strength for a very strong password with special characters", () => {
    cy.enterText(
      '[data-cy="firstPassword"]',
      "cQ)Y0*dyg?LDbw@H+64M&SeE+y]l-rNA|!sRFBX:mOWQ_-o+"
    );
    cy.checkFieldValid(
      '[data-cy="firstPassword"]',
      "Your password is required to be at least 4 characters."
    );
    cy.checkCSS(
      "#strengthBar > li:nth-child(1)",
      "background-color",
      "rgb(0, 255, 0)"
    );
  });

  it("Should show an error for a password longer than 50 characters", () => {
    cy.enterText(
      '[data-cy="firstPassword"]',
      "1cQ)Y0*dyg?LDbw@H+64M&SeE+y]l-rNA|!sRFBX:mOWQ_-o+12"
    );
    cy.get('[data-cy="firstPassword"]').blur();
    cy.checkFieldValidation(
      '[data-cy="firstPassword"]',
      "Your password cannot be longer than 50 characters."
    );
  });

  it("Should require a password when empty", () => {
    cy.enterText('[data-cy="username"]', faker.internet.userName());
    cy.clickElement('[data-cy="email"]', faker.internet.email());
    cy.clickElement('[data-cy="firstPassword"]');
    cy.get('[data-cy="firstPassword"]').blur();
    cy.clickElement('[data-cy="secondPassword"]');
    cy.checkFieldValidation(
      '[data-cy="firstPassword"]',
      "Your password is required."
    );
  });

  it("Should validate matching passwords in both fields", () => {
    cy.enterText('[data-cy="firstPassword"]', "1234");
    cy.enterText('[data-cy="secondPassword"]', "1234");
    cy.checkFieldValid(
      '[data-cy="secondPassword"]',
      "The password and its confirmation do not match!"
    );
  });

  it("Should show an error for non-matching passwords", () => {
    cy.enterText('[data-cy="firstPassword"]', "1234");
    cy.enterText('[data-cy="secondPassword"]', "12345");
    cy.get('[data-cy="secondPassword"]').blur();
    cy.checkFieldValidation(
      '[data-cy="secondPassword"]',
      "The password and its confirmation do not match!"
    );
  });

  it("Should show an error when the confirmation password is empty", () => {
    cy.enterText('[data-cy="firstPassword"]', "1234");
    cy.get('[data-cy="secondPassword"]').focus().blur();
    cy.checkFieldValidation(
      '[data-cy="secondPassword"]',
      "Your confirmation password is required."
    );
  });
});
