/* eslint-disable no-undef */
import user from '../../fixtures/user.json';

describe('Home Page', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('#email').should('be.visible').type(user.email);

    // # Enter user password in input field
    cy.get('#password').should('be.visible').type(user.password);

    // # Click Submit button (Login)
    cy.get('#submitButton').should('be.visible').click();
  });

  it('should render', () => {
    // * The input field in the Home component should be visible after logging in successfully
    cy.get('Input').should('be.visible');
  });

  it('should display the logged in user\'s chat messages on the left hand side', () => {
    // * The message input field in the Home component should be visible
    // # Type 'Test Message' in the input field
    cy.get('#msgInput').should('be.visible').type('Test Message');

    // # Click the plane send icon
    cy.get('.fa-paper-plane').click();

    // * The left hand side chat message container should exist
    cy.get('#leftChat').should('exist');

    // * The chat span should contain the text message that was sent in the step above
    cy.get('#leftMsg').should('contain', 'Test Message');
  });
});
