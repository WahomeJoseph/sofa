import React from 'react'
import Navigation from './Navigation'
import * as Icons from 'react-icons';

console.log(Icons);

describe('<Navigation />', () => {
  it('renders', () => {
    cy.mount(<Navigation />)
    Cypress.on('uncaught:exception', (err, runnable) => {
      // return false to prevent Cypress from failing the test
      return false;
    });
    // cy.visit('/')
  })
})