describe('Logowanie', () => {
    it('Poprawne Logowanie', () => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.contains('h1', 'Zaloguj się!').should('be.visible');

        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);
            cy.get('input[name="password"]').type(this.LoginData.password);
            cy.get('button[type=submit]').as('sbmitBtn').click();
        });

        cy.wait(2000);
        cy.get('input[placeholder="Wyszukaj czat"]').type('Test');

        cy.get('a[href="/room/JVFxDNQ0fz4X2BvEJTUE"]').click();
        cy.get('button[title="Wyszukaj w czacie"]').click();
        cy.get('input[placeholder="Szukaj"]').type('hello');

    });
});
