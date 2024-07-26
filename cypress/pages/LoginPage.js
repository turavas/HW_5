export class LoginPage {
  elements = {
    loginField: () => cy.get("#username"),
    passwordField: () => cy.get("#password"),
    loginButton: () =>
      cy.get(
        "#login-page > div > form > div.modal-footer > button.btn.btn-primary > span"
      ),
  };

  login(username, password) {
    this.elements.loginField().type(username);
    this.elements.passwordField().type(password);
    this.elements.loginButton().click();
  }
}