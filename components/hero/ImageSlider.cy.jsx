import React from 'react'
import ImageSlider from './ImageSlider'

describe('<ImageSlider />', () => {
  beforeEach('renders', () => {
    cy.mount(<ImageSlider />)
  })
  it('renders the image container', () => {
    cy.get('div').should('be.visible')
  })
})