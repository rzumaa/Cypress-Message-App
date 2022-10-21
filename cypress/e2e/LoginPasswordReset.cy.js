describe('Logowanie', () => {
    it('Reset hasla', () => {
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