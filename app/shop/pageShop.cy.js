import React from 'react'
import Shop from './page'

describe('<Shop />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Shop />)
  })
})