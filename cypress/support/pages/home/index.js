
const el = require('./elements').ELEMENTS

class Home {


    login() {
        cy.viewport('macbook-16')
        cy.visit('/signup/?type=login')
        // Create a alias for the Ajax authentication request
        cy.intercept('POST', '/api/site/ajax-login/').as('authenticate')
        cy.get(el.loginButton).click()
        cy.get(el.loginEmail).type('test.qa@tradesy.com')
        cy.get(el.loginPassword).type('#Password#')
        cy.contains('Log in with Email').click()
        // Wait for the Ajax authentication get a response and the body DOM be available
        cy.wait('@authenticate').its('response.statusCode').should('eq', 200)
    }

    navigateToHome() {
        cy.get(el.tradesyLogo).click()
    }

    favoriteLastItem() {
        cy.get(el.searchField).click().type('Hermès')
        cy.get(el.searchButton).click()
        cy.get(el.favoriteIcon).last().then(($el) => {
            if (!$el.hasClass(el.favoriteActive)) {
                cy.get(el.favoriteIcon).last().click()
            }
        })
    }

    validateFavoritedItem() {
        cy.get(el.favoriteItem).last().then($el => {
            var dataId = $el.attr("data-id")
            //For avoid hard coded URL I would add a env variable 
            cy.visit('https://www.tradesy.com/closet/9831760/favorites/')
            cy.get(el.favoritedItem).should('have.attr', 'id', `item-${dataId}`)
        })
    }

    validateClosetItemsQty() {
        //I would add a route class on support to get all routes in the same place
        cy.intercept('GET', '/closet/**/?payload=full&view=index&tradesy_synchronizer=**').as('closetData')
        //For avoid hard coded URL I would add a env variable 
        cy.visit('https://www.tradesy.com/closet/strawberryfields')
        cy.wait('@closetData').its('response.body.closet_summary.item_qty').then(data => {
            var items = JSON.stringify(data)
            cy.wait(2000)
            cy.get(el.itemsQty).first().then(($el) => {
                //I would create a Regex validation here but I was shorting in time
                const text = $el.text().trim('\n').split(' ')[0].split('\n')[0] 
                expect(text).to.be.eq(items)
            })
        })
    }

    validateFilter(){
        cy.visit('https://www.tradesy.com/hobos/')
        cy.get(el.brandPrada).click()
        // To avoid the random timeout, I would map a request to intercept and wait 
        cy.wait(2000)
        cy.get(el.sortedItems).each($item => {
            var brand = $item.text()
            expect(brand).to.be.eq('Prada')
        })
    }
}

export default new Home();
