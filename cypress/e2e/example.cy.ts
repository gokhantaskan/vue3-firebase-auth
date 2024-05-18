// https://on.cypress.io/api

describe("My First Test", () => {
  it("visits the app root url and redirects to `/auth/login`", () => {
    cy.visit("/");
    cy.url().should("include", "/auth/login");
  });
});
