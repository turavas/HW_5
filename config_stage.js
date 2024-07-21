const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "j4fe4d",
  watchForFileChanges: false,
  e2e: {
    baseUrl: "https://sqlverifier-staging-08050d656f7a.herokuapp.com",
    env: {
      student_username: "uola277",
      student_password: "123456",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
