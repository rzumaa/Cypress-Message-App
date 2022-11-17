describe('Login into the application', () => {
    it('Login is correct', () => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.contains('h1', 'Zaloguj się!')
        .should('be.visible');

    cy.fixture('LoginData').then(function (LoginData) {
        this.LoginData = LoginData;
        cy.get('input[name="email"]').type(this.LoginData.email);
        cy.get('input[name="password"]').type(this.LoginData.password);
        cy.get('button[type=submit]').as('sbmitBtn').click();
    });
    cy.contains('.MuiButton-label', 'Zaloguj się')
        .click();
    cy.wait(4000);
    cy.get('button[title="Wyloguj"]').click();
});

    it('Login i s wrong', () => {
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
        cy.wait(3000);
    });

});
    it('Password Reset', () => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.wait(2000);
        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.get('span[role="button"]')
        .click();
        cy.get('input[name="passwordreset"]').type('test@gmail.com');
});
});


