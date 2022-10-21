describe('Chat', () => {
    it('Chat', () => {
        cy.visit('/login');

        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email).should('be.value', 'test@gmail.com');
            cy.get('input[name="password"]').type(this.LoginData.password).should('be.value', '12345678');
            cy.get('button[type=submit]').as('sbmitBtn').click();
        });

        cy.contains('span', 'Ustawienia').click();
        cy.get('button[title="Edytuj zdjęcie"]').click();
        cy.get('input[type=file').attachFile("/golden.png");
        cy.contains('span', 'Wyślij').click();

        cy.get('button[title="Edytuj nazwę"]').click();
        cy.contains('h3', 'Zmiana nazwy użytkownika').should('be.visible');
        cy.get('input[placeholder="Nazwa użytkownika"]').type('Pauliśka Testerka');
        cy.contains('button', 'Aktualizuj konto').click();
        cy.wait(4000);
        cy.contains('h3', 'Pauliśka Testerka').should('be.visible');


        cy.get('button[title="Edytuj hasło"]').click();
        cy.get('#transition-modal-title').should('be.visible', 'Zmiana hasła');

        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
        cy.get('input[placeholder="E-mail"]').type(this.LoginData.email);
        cy.get('input[placeholder="Stare hasło"]').type(this.LoginData.password);
        cy.get('input[placeholder="Nowe hasło"]').type(this.LoginData.Newpassword);
        cy.get('input[placeholder="Potwierdź nowe hasło"]').type(this.LoginData.Newpassword);
        });
        cy.contains('button', 'Zmień hasło').click();

    });
});