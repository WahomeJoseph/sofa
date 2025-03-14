describe('Sofa Lux Test', () => {
  it('Visit Sofa Lux!', () => {
    expect(true).to.equal(true)
    cy.visit('http://localhost:3001/')
  })
})