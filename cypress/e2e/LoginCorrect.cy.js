describe('Logowanie', () => {
    it('Poprawne Logowanie', () => {
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
    cy.wait(2000);
    cy.get('button[title="Wyloguj"]').click();
});
});
