export class ChangePasswordPage {
    elements = {
      loginField: () => cy.get("#username"),
      passwordField: () => cy.get("#password"),
      loginButton: () =>
        cy.get(
          "#login-page > div > form > div.modal-footer > button.btn.btn-primary > span"
        ),
      accountMenu: () => cy.get("#account-menu > a > span"),
      passwordMenu: () => cy.get('[data-cy="passwordItem"]'),
      currentPasswordField: () => cy.get("#currentPassword"),
      newPasswordField: () => cy.get("#newPassword"),
      newPasswordFieldConfirmation: () => cy.get("#confirmPassword"),
      saveButton: () => cy.get("#password-form > button > span"),
    };
  
    changePassword(username, oldPassword, newPassword) {
      this.elements.loginField().type(username);
      this.elements.passwordField().type(oldPassword);
      this.elements.loginButton().click();
      this.elements.accountMenu().click();
      this.elements.passwordMenu().click();
      this.elements.currentPasswordField().type(oldPassword);
      this.elements.newPasswordField().type(newPassword);
      this.elements.newPasswordFieldConfirmation().type(newPassword);
      this.elements.saveButton().type(newPassword);
    }
  }