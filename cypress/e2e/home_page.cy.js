describe('Home Page', () => {
    beforeEach('successfully loads', () => {
      cy.visit('http://localhost:3000')
    })
    it('renders all page elements without crashing', () => {
      cy.get('header').should('be.visible')
    })
    it('renders the description text', () => {
      cy.get('h1').contains('Discover the comfort and style your living room')
    })
    it('navigates to pricing page when button is clicked',() => {
      cy.get('a').contains('Get Started').click()
      cy.url().should('include', '/pricing')
    })
    it('navigates to services page when button is clicked',() => {
      cy.get('a').contains('Our Services').click()
      cy.url().should('include', '/services')
    })
    it('renders and displays the navbar', () => {
      cy.get('nav').should('be.visible')
    })
    it('renders and displays the social icons', () => {
      cy.get('a').contains('Twitter').should('be.visible')
      cy.get('a').contains('Instagram').should('be.visible')
      cy.get('a').contains('Pinterest').should('be.visible')
      cy.get('a').contains('Facebook').should('be.visible')
      cy.get('a').contains('Tiktok').should('be.visible')
    })
  })