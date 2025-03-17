import React from 'react'
import Contact from './page'

describe('<Contact />', () => {
  beforeEach('renders', () => {
    cy.mount(<Contact />)
  })

  it('contact section renders without crashing', () => {
    cy.get('section').should('exist')
  })

  it('displays the correct heading',()=> {
    cy.get('h2').contains('Contact Us').should('exist')
  })
  it('displays the description text', () => {
    cy.get('p').contains('Explore our Exclusive Sofa Collection. Contact Us To Get Your Sofas').should('exist')
  })
  it('displays the form', () => {
    cy.get('form').should('exist')
  })
  it('displays the form fields', () => {
    cy.get('input').should('have.length', 4)
  })
  it('displays the message textarea', () => {
    cy.get('textarea').should('exist')
  })
  it('displays the terms and conditions', () => {
    cy.get('p').contains('By submitting this form you agree to our').should('exist')
  })
  it('displays the submit button', () => {
    cy.get('div[type="submit"]').should('exist')
  })
})