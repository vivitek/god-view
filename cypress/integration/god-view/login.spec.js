/// <reference types="cypress" />


context('Connectors', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/login')
    })

    it('email', () => {
        cy.get('#email')
          .type('fake@email.com').should('have.value', 'fake@email.com')
    
          .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
          .type('{del}{selectall}{backspace}')
    
          .type('{alt}{option}') 
          .type('{ctrl}{control}') 
          .type('{meta}{command}{cmd}')
          .type('{shift}')
      })

    it('password', () => {
        cy.get('#password')
          .type('test12').should('have.value', 'test12')
    
          .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
          .type('{del}{selectall}{backspace}')
    
          .type('{alt}{option}') 
          .type('{ctrl}{control}') 
          .type('{meta}{command}{cmd}') 
          .type('{shift}')
    })

    it('connect', () => {
        cy.get('#email')
            .type('remi@vincipit.com').should('have.value', 'remi@vincipit.com')
        cy.get('#password')
            .type('caca3000').should('have.value', 'caca3000')
        cy.get('.MuiButton-label').click()
        cy.url().should('eq', 'http://localhost:3001/')
    })
})