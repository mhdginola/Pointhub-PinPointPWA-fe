// https://docs.cypress.io/api/introduction/api.html

describe('Invite user', () => {
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/invite')
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
      cy.visit('/invite')
    })

    it('Invite Failed, field required', () => {
      cy.get('button.invite-user').click()
      cy.get('.modal-invite-user').should('be.visible')
      cy.get('input[name="email"]').type('')
      cy.get('input[name="role"]').click()
      cy.get('select-item-role').contains('user').click();
      cy.get('form.invite-user').submit()
      cy.contains('.error-message', 'This field is required').should('be.visible');
    })
    
    it('Invite Failed, email is unique', () => {
      cy.get('button.invite-user').click()
      cy.get('.modal-invite-user').should('be.visible')
      cy.get('input[name="email"]').type('test')
      cy.get('input[name="role"]').click()
      cy.get('select-item-role').contains('user').click();
      cy.get('form.invite-user').submit()
      cy.contains('.error-message', 'Email is unique').should('be.visible');
    })
    
    it('Invite user Success', () => {
      cy.get('button.invite-user').click()
      cy.get('.modal-invite-user').should('be.visible')
      cy.get('input[name="email"]').type('test')
      cy.get('input[name="role"]').click()
      cy.get('select-item-role').contains('user').click();
      cy.get('form.invite-user').submit()
      cy.get('.modal-invite-user-success').should('be.visible')
      cy.contains('Invite Success')
    })

    it('Edit Failed, field required', () => {
      cy.get('button.edit-user').click()
      cy.get('.modal-edit-user').should('be.visible')
      cy.get('input[name="email"]').type('')
      cy.get('input[name="role"]').click()
      cy.get('select-item-role').contains('user').click();
      cy.get('form.edit-user').submit()
      cy.contains('.error-message', 'This field is required').should('be.visible');
    })

    it('Edit Failed, email is unique', () => {
      cy.get('button.edit-user').click()
      cy.get('.modal-edit-user').should('be.visible')
      cy.get('input[name="email"]').type('test')
      cy.get('input[name="role"]').click()
      cy.get('select-item-role').contains('user').click();
      cy.get('form.edit-user').submit()
      cy.contains('.error-message', 'Email is unique').should('be.visible');
    })

    it('Edit user Success', () => {
      cy.get('button.edit-user').click()
      cy.get('.modal-edit-user').should('be.visible')
      cy.get('input[name="email"]').type('test')
      cy.get('input[name="role"]').click()
      cy.get('select-item-role').contains('user').click();
      cy.get('form.edit-user').submit()
      cy.get('.modal-invite-user-edit-success').should('be.visible')
      cy.contains('Invite Success')
    })

    it('Remove user', () => {
      cy.get('button.remove-user').click()
      cy.get('.modal-remove-user').should('be.visible')
      cy.get('button.remove-user-confirm').click()
      cy.get('.modal-remove-user-Success').should('be.visible')
      cy.contains('Delete Success')
    })
  })
})
