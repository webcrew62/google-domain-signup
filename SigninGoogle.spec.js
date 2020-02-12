import { getYear } from 'date-fns';

let timestamp = new Date().getTime();
let domain_name = `qa-auto-signup-regression-${timestamp}.qa`;
const username = Cypress.env('googleSocialLoginUsername');
const password = Cypress.env('googleSocialLoginPassword');
const loginUrl = Cypress.env('loginUrl');
const homepage = Cypress.env('homepage');
const socialLoginOptions = {
  username,
  password,
  loginUrl,
  headless: false,
  logs: true,
  loginSelector: '#identifierId',
  postLoginSelector: '.account-panel',
};

describe('Login', () => {
  it('Loads the signup_google_domains page', () => {
    cy.visit('/googledomains');
    //   cy.clearCookies();
  });
  it('click Get Started', () => {
    cy.get('.getting-started > .btn').click();
  });
  it('click Sign in with Google', () => {
    cy.get('.abcRioButtonContentWrapper').click();
  });
  // // it('google account login', () => {
  //   return cy.task('GoogleSocialLogin', socialLoginOptions).then(({ cookies }) => {
  //   });
  // });
  // it('Enter domain name', () => {
  //   cy.get('#input').type(domain_name);
  //   cy.get('form > .btn').click();
  // });
  // it('Confirm success', () => {
  //   cy.get('.my_domain', { timeout: 60000 }).should('have.text', domain_name);
  // });
});
// });
