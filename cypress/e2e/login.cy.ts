// https://docs.cypress.io/api/introduction/api.html

describe('Login', () => {
  it('visits login page', () => {
    cy.visit('/login')
    cy.contains('Signin With Google')
  })
})
