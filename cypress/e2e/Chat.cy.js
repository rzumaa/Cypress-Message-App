describe('Chat', () => {
    it('Chat', () => {
        cy.visit('/login');

        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.get('input[name="email"]')
            .type('test@gmail.com')
            .should('be.value', 'test.devcomm@gmail.com' );

        cy.get('input[name="password"]')
            .type('12345678')
            .should('be.value', '12345678');

        cy.contains('.MuiButton-label', 'Zaloguj się')
            .click();

        cy.get('a[href="/room/JVFxDNQ0fz4X2BvEJTUE"]').click();

        //cy.get('input[type=file').attachFile("/golden.png");

        cy.get('svg[class="MuiSvgIcon-root"]').click();
        cy.get('input[placeholder="Napisz wiadomość"]')
            .type('test wiadomosci do wyslania')
            .should('be.value', 'test wiadomosci do wyslania');

        cy.get('span[title="Wyślij"]').click();


    });
});