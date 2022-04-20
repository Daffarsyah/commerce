describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('/')

    cy.getBySel('product-tag')
      .eq(0)
      .within(() => {
        cy.getBySel('product-name').should(
          'contain',
          'New Short Sleeve T-Shirt'
        )
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(1)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Lightweight Jacket')
        cy.getBySel('product-price').should('contain', '$249.99 USD')
      })

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Shirt')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })
  })
})
