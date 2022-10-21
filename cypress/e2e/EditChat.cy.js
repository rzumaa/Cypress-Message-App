describe('Chat', () => {
    it('Chat edit', () => {
        cy.visit('/login');

        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email).should('be.value', 'test@gmail.com');
            cy.get('input[name="password"]').type(this.LoginData.password).should('be.value', '12345678');
            cy.get('button[type=submit]').as('sbmitBtn').click();
        });

        cy.contains('.MuiButton-label', 'Zaloguj się').click();

        cy.get('a[href="/room/JVFxDNQ0fz4X2BvEJTUE"]').click();
        cy.get('button[title="Ustawienia czatu"]').click();
        cy.get('button[title="Edytuj zdjęcie"]').click();
        cy.get('input[type=file').attachFile("/gory.jpg");
        cy.contains('span', 'Wyślij').click();

        cy.get('button[title="Edytuj nazwę"]').click();
        cy.contains('h3', 'Zmiana nazwy czatu').should('be.visible');
        cy.get('input[placeholder="Nazwa czatu"]').type('Testerka');
        cy.contains('button', 'Aktualizuj czat').click();

        cy.contains('button', 'Pobierz CSV').click()
    });
});