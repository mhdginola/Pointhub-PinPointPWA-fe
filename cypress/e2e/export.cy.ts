// https://docs.cypress.io/api/introduction/api.html

describe('Export Attendance', () => {
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/export')
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
      cy.visit('/export')
    })

    it('Export Attendance', () => {
      cy.get('button.export-attendance').click()
      cy.get('.modal-export-attendance-progress').should('be.visible')
      cy.contains('Downloading... please wait')
    })
  })
})
