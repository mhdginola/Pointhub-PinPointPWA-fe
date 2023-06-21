// https://docs.cypress.io/api/introduction/api.html

describe('Filter report', () => {
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/report')
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
      cy.visit('/report')
    })
  
    it('Admin Filter report by Date', () => {
      cy.get('button.filter-date-attendance').click()
      cy.get('.modal-filter-date-attendance').should('be.visible')
      cy.get('input[name="startDate"]').type('2023-01-01'); 
      cy.get('input[name="endDate"]').type('2023-01-30'); 
      cy.get('form.filter-date-attendance').submit()
      cy.get('.modal-filter-date-attendance-success').should('be.visible')
      cy.contains('Filter Applied')
    })
  
    it('Admin Filter report by Person', () => {
      cy.get('button.filter-person-attendance').click()
      cy.get('.modal-filter-person-attendance').should('be.visible')
      cy.get('#filter-person').check()
      cy.get('#filter-person').should('be.checked')
      cy.get('form.filter-person-attendance').submit()
      cy.get('.modal-filter-person-attendance-success').should('be.visible')
      cy.contains('Filter Applied')
    })
  
    it('User Filter report by Date', () => {
      cy.get('button.filter-date-attendance').click()
      cy.get('.modal-filter-date-attendance').should('be.visible')
      cy.get('input[name="startDate"]').type('2023-01-01'); 
      cy.get('input[name="endDate"]').type('2023-01-30'); 
      cy.get('form.filter-date-attendance').submit()
      cy.get('.modal-filter-date-attendance-success').should('be.visible')
      cy.contains('Filter Applied')
    })
  
    it('User Filter report by Person', () => {
      cy.get('button.filter-person-attendance').click()
      cy.get('.modal-filter-person-attendance').should('be.visible')
      cy.get('#filter-person').check()
      cy.get('#filter-person').should('be.checked')
      cy.get('form.filter-person-attendance').submit()
      cy.get('.modal-filter-person-attendance-success').should('be.visible')
      cy.contains('Filter Applied')
    })
  })  
})
