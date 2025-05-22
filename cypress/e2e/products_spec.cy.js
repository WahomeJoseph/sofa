describe('Shopping Cart functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/shop')
  })
  it('renders the shop page without crashing', () => {
    cy.get('header').should('exist')
  })
  it('renders the all the sofa products', ()=> {
    cy.get('main').should('exist')
  })
  it('renders and display the product tiles', ()=> {
    cy.get('ul').should('exist')
  })
  it('renders and display product tile', () => {
    cy.get('li').should('exist')
  })
  it('renders and display the product details', () => {
    cy.get('img').should('exist')
    cy.get('h2').should('exist')
    cy.get('p').should('exist')
    cy.get('span').should('exist')
    cy.get('button').should('exist')
  })

  it('adds the product to the cart when clicked', () => {
    cy.get('button')
    .contains('Add to Cart')
    .should('be.enabled')
    .click()
    // cy.url().should('include', '/cart')
  })
})