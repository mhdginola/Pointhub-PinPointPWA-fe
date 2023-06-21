// https://docs.cypress.io/api/introduction/api.html

describe('Home/Dashboard', () => {    
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/')
    })

    it('1.1 create attendance failed, user not login, redirect login page', () => {
      cy.location('pathname').should('eq', '/login')
    })
  })
  describe('user login', () => {
    beforeEach(()=>{
      cy.visit('/login')
      cy.get('button.login-google').click()
      cy.visit('/')
      cy.visit('/attendances')
    })
  
    it('visits home/dashboard page, without data', () => {
      cy.visit('/')
      cy.contains('No Activity')
    })
    it('visits home/dashboard page, data', () => {
      cy.visit('/')
      cy.contains('No Activity').should('not.exist')
    })

  })
})
