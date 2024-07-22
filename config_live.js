const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "j4fe4d",
  watchForFileChanges: true,
  e2e: {
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    env: {
      student_username: "ola277",
      student_password: "123456",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
