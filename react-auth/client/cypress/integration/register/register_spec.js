/* eslint-disable no-undef */
describe('Register page', () => {
  before(() => cy.visit('localhost:3000/register'));

  it('should render', () => {
    // # Enter user email in input field
    cy.get('#styledHeading').should('be.visible').and('contain', 'Sign Up');

    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#password2').should('be.visible');
    cy.get('#submitButton').should('be.visible').click().and('contain', 'Submit');
  });

  it('shuld show an error alert when fields are empty', () => {
    cy.get('#submitButton').should('be.visible').click();
    cy.get('#alert').should('be.visible');
  });
});
