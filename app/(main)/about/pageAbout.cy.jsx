import React from 'react'
import About from './page'

describe('<About />', () => {
  beforeEach(() => {
    cy.mount(<About />)
  })
  it('renders the about section without crashing', () => {
    cy.get('section').should('exist')
  })
  it('displays the correct heading', () => {
    cy.get('h2').contains('About Sofa Lux?').should('exist')
  })
  it('displays the description text', () => {
    cy.get('p').contains('Upgrade your home or office with our luxurious and functional sofas').should('exist');
  })
})