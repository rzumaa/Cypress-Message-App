describe('Logowanie', () => {
    it('Bledne Logowanie', () => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.get('input[name="email"]')
            .type('test@gmail.com')
            .should('be.value', 'tesst@gmail.com' );

        cy.get('input[name="password"]')
            .type('12345678')
            .should('be.value', '123245678');
        cy.contains('.MuiButton-label', 'Zaloguj się').click();
    });
});

