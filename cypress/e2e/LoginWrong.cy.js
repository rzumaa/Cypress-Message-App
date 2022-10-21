describe('Logowanie', () => {
    it('Bledne Logowanie', () => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]')
                .type(this.LoginData.wrongemail);
                //.should('be.value', 'tesst@gmail.com' );

            cy.get('input[name="password"]')
                .type(this.LoginData.wrongpassword);

            cy.get('button[type=submit]')
                .as('sbmitBtn').click();
        });

    });
});

