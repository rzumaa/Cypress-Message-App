describe('Create Chat', () => {
    it('New chat', () => {
        cy.viewport(1920,1080);
        cy.visit('/login');

        cy.contains('h1', 'Zaloguj się!')
            .should('be.visible');

        cy.get('input[name="email"]')
            .type('test@gmail.com')
            .should('be.value', 'test@gmail.com' );

        cy.get('input[name="password"]')
            .type('12345678')
            .should('be.value', '12345678');

        cy.contains('.MuiButton-label', 'Zaloguj się')
            .click();

        cy.wait(3000);
        cy.get('button[title="Stwórz nowy czat"]')
            .click();

        cy.contains('h3', 'Utwórz nowy czat')
            .should('be.visible');

        cy.get('input[placeholder="Nazwa czatu"]')
            .type('Pauli czat');

        cy.contains('.MuiButton-label', 'Utwórz czat')
            .click();
    });
});