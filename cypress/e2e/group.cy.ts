// https://docs.cypress.io/api/introduction/api.html


describe('Create Group', () => {
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/groups')
    })

    it('1.1 create group failed, user not login, redirect login page', () => {
      cy.location('pathname').should('eq', '/login')
    })
  })
  describe('user login', () => {
    beforeEach(()=>{
      cy.visit('/login')
      cy.get('button.login-google').click()
      cy.visit('/')
      cy.visit('/groups')
    })

    it('1.1 chosee/show group list show', () => {
      cy.get('button.show-group').click()
      cy.get('.modal-show-group').should('be.visible')
    })

    it('1.2 create group failed, field required', () => {
      cy.get('button.create-group').click()
      cy.get('.modal-create-group').should('be.visible')
      cy.get('input[name="name"]').type('')
      cy.get('form.add-group').submit()
      cy.contains('.error-message', 'This field is required').should('be.visible');
    })

    it('1.3 create group failed, name unique', () => {
      cy.get('button.create-group').click()
      cy.get('.modal-create-group').should('be.visible')
      cy.get('input[name="name"]').type('test')
      cy.get('form.add-group').submit()
      cy.contains('.error-message', 'Name is unique').should('be.visible');
    })

    it('1.4 create group success', () => {
      cy.get('button.create-group').click()
      cy.get('.modal-create-group').should('be.visible')
      cy.get('input[name="name"]').type('test')
      cy.get('form.add-group').submit()
      cy.get('.modal-create-group-success').should('be.visible')
      cy.contains('Create Group Success')
    })

    it('1.5 edit group failed, field required', () => {
      cy.get('button.edit-group').click()
      cy.get('.modal-edit-group').should('be.visible')
      cy.get('input[name="name"]').type('')
      cy.get('form.edit-group').submit()
      cy.contains('.error-message', 'This field is required').should('be.visible');
    })

    it('1.6 edit group failed, name unique', () => {
      cy.get('button.edit-group').click()
      cy.get('.modal-edit-group').should('be.visible')
      cy.get('input[name="name"]').type('test')
      cy.get('form.edit-group').submit()
      cy.contains('.error-message', 'Name is unique').should('be.visible');
    })

    it('1.7 edit group success', () => {
      cy.get('button.edit-group').click()
      cy.get('.modal-edit-group').should('be.visible')
      cy.get('input[name="name"]').type('test')
      cy.get('form.edit-group').submit()
      cy.get('.modal-edit-group-success').should('be.visible')
      cy.contains('Edit Group Success')
    })

    it('1.8 delete group failed, wrong pass', () => {
      cy.get('button.delete-group').click()
      cy.get('.modal-delete-group').should('be.visible')
      cy.get('input[name="password"]').type('')
      cy.get('form.delete-group').submit()
      cy.get('.modal-delete-group-success').should('be.visible')
      cy.contains('.error-message', 'Wrong pass').should('be.visible');
    })

    it('1.9 delete group success', () => {
      cy.get('button.delete-group').click()
      cy.get('.modal-delete-group').should('be.visible')
      cy.get('input[name="password"]').type('test')
      cy.get('form.delete-group').submit()
      cy.get('.modal-delete-group-success').should('be.visible')
      cy.contains('Delete Group Success')
    })
  })
})
