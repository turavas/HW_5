import { faker } from "@faker-js/faker";

const baseURL = Cypress.env("baseUrl");

before(() => {
  cy.request({
    method: "POST",
    url: `${baseURL}/api/authenticate`,
    body: {
      username: Cypress.env("adminLogin"),
      password: Cypress.env("adminPassword"),
      rememberMe: true,
    },
  }).then((response) => {
    Cypress.env("accessToken", response.body.id_token);
  });
});

describe("Lesson 4.2.1 - Tasks API Tests", () => {
  it("Get a list of tasks", () => {
    cy.request({
      method: "GET",
      url: `${baseURL}/api/tasks`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const tasks = response.body;
      Cypress.env("taskID", tasks[0].id);
    });
  });

  it("Get an info about task", () => {
    cy.request({
      method: "GET",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").and.to.be.a("number");
      expect(response.body).to.have.property("text").and.to.be.a("string");
      expect(response.body).to.have.property("answer").and.to.be.a("string");
      expect(response.body).to.have.property("title").and.to.be.a("string");
    });
  });

  it("Create a Task", () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api/tasks`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: {
        text: faker.lorem.sentence(),
        answer: faker.lorem.words(),
        title: faker.lorem.sentence(),
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id").and.to.be.a("number");
      expect(response.body).to.have.property("text").and.to.be.a("string");
      expect(response.body).to.have.property("answer").and.to.be.a("string");
      expect(response.body).to.have.property("title").and.to.be.a("string");
    });
  });

  it("Create a Task without body", () => {
    cy.request({
      method: "POST",
      url: `${baseURL}/api/tasks`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Update a Task", () => {
    cy.request({
      method: "PUT",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: {
        id: Cypress.env("taskID"),
        text: faker.lorem.sentence(),
        answer: faker.lorem.words(),
        title: faker.lorem.sentence(),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").and.to.be.a("number");
      expect(response.body).to.have.property("text").and.to.be.a("string");
      expect(response.body).to.have.property("answer").and.to.be.a("string");
      expect(response.body).to.have.property("title").and.to.be.a("string");
    });
  });

  it("Update a Task without body", () => {
    cy.request({
      method: "PUT",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Update a text of task", () => {
    cy.request({
      method: "PATCH",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: {
        id: Cypress.env("taskID"),
        text: faker.lorem.sentence(),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").and.to.be.a("number");
      expect(response.body).to.have.property("text").and.to.be.a("string");
      expect(response.body).to.have.property("answer").and.to.be.a("string");
      expect(response.body).to.have.property("title").and.to.be.a("string");
    });
  });

  it("Update an answer of task", () => {
    cy.request({
      method: "PATCH",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: {
        id: Cypress.env("taskID"),
        answer: faker.lorem.words(),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").and.to.be.a("number");
      expect(response.body).to.have.property("text").and.to.be.a("string");
      expect(response.body).to.have.property("answer").and.to.be.a("string");
      expect(response.body).to.have.property("title").and.to.be.a("string");
    });
  });

  it("Update a title of task", () => {
    cy.request({
      method: "PATCH",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      body: {
        id: Cypress.env("taskID"),
        title: faker.lorem.sentence(),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id").and.to.be.a("number");
      expect(response.body).to.have.property("text").and.to.be.a("string");
      expect(response.body).to.have.property("answer").and.to.be.a("string");
      expect(response.body).to.have.property("title").and.to.be.a("string");
    });
  });

  it("Update a task without body", () => {
    cy.request({
      method: "PATCH",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(415);
    });
  });

  it("Delete a Task", () => {
    cy.request({
      method: "DELETE",
      url: `${baseURL}/api/tasks/${Cypress.env("taskID")}`,
      headers: {
        Authorization: `Bearer ${Cypress.env("accessToken")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
