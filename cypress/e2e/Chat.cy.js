describe('Chat', () => {
    it('Chat', () => {
        cy.visit('/login');

        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email)//.should('be.value', 'test@gmail.com');
            cy.get('input[name="password"]').type(this.LoginData.password).should('be.value', '12345678');
            cy.get('button[type=submit]').as('sbmitBtn').click();
        });

        cy.contains('.MuiButton-label', 'Zaloguj się').click();

        cy.get('a[href="/room/JVFxDNQ0fz4X2BvEJTUE"]').click();

        cy.get('button[title="Dodaj załącznik"]').click();
        cy.get('input[type=file').attachFile("/golden.png");
        cy.contains('span', 'Wyślij').click();

        cy.get('input[placeholder="Napisz wiadomość"]')
            .type('test wiadomosci do wyslania')
            .should('be.value', 'test wiadomosci do wyslania');
        cy.wait(2000)
        cy.get('button[title="Wstaw emoji"]').click();
        cy.get('img[src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@6.0.1/img/apple/64/1f60d.png"]').click();

       cy.get('span[title="Wyślij"]').click();

    });
});