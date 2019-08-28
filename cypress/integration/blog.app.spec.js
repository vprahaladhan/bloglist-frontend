describe('Bloglist App ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Oracle',
      username: 'oracle',
      password: 'tiger'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.get('#username').type('oracle')
    cy.get('#password').type('tiger')
    cy.contains('Submit').click()
  })

  describe('when logged in', function() {
    it('shows user logged in when valid credentials are input', function() {
      cy.contains('Oracle logged in')
    })

    it('shows logged in user in the list of users', function() {
      cy.contains('users').click()
      cy.contains('Oracle')
    })
  })

  describe('creating a new blog post', function() {
    beforeEach(function() {
      cy.contains('Show Form').click()
      cy.get('#title').type('Chennai')
      cy.get('#author').type('OPS')
      cy.get('#url').type('www.chennai.co.in')
      cy.contains('Create Blog').click()
    })

    it('shows the new blog post', function() {
      cy.contains('Chennai')
    })

    it('shows new blog in list of blogs of logged in user', function() {
      cy.contains('users').click()
      cy.get('a').eq(2).click()
      cy.contains('Chennai')
    })
  })
})