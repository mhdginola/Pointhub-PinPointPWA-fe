// https://docs.cypress.io/api/introduction/api.html

describe('Invitation', () => {
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/invitation')
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
      cy.visit('/invitation')
    })
  
    it('Accept invitation', () => {
      cy.get('button.accept').click()
      cy.visit('/')
      cy.get('.modal-invitation-accepted').should('be.visible')
      cy.contains('Success to join Group')
    })
  
    it('Reject invitation', () => {
      cy.get('button.reject').click()
      cy.visit('/')
      cy.get('.modal-invitation-rejected').should('be.visible')
      cy.contains('Success Reject invitation')
    })
    
  })
})
