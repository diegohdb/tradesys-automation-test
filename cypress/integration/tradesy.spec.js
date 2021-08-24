/// <reference types="cypress" />

import home from '../support/pages/home';

/*
Points that could be improved in general:
- Create a .env file to insert the credentials.
- A well structured Page Object design. Here I just added a simple structure.
- Classes to improve reusability and organization, such as, routes class.
- Hooks to guarantee the automation get all data to initial state.
- Some Regex validation instead using trim and split functions.
- A reporter generator like mochaawesome. Here I am using the default by Cypress.
- Intercept in some tests to avoid using the cy.wait() function with random timeout.
*/

before(() => {
    home.login()
});

describe('Tradesy', () => {
    // For this test I would include an after to unmark the favorite items
    it('Test 01 - Favorite an item', () => {
        home.navigateToHome()
        home.favoriteLastItem()
        home.validateFavoritedItem()
    });

    it('Test 02 - Ensure JSON Data Matches Front End', () => {
        home.validateClosetItemsQty()
    });

    it('Test 03 - Apply a filter and ensure the items are updated', () => {
        home.validateFilter()
    });
})
