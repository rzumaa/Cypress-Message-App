describe('rejestracja', () => {
    it('test', () => {
     //   cy.visit('/');
        cy.visit('/login');
        cy.get('a[href="/registration"]').click();

        cy.get('input[name="email"]')
            .type('test@gmail.com')
            .should('be.value','test@gmail.com');

        cy.get('input[name="firstName"]')
            .type('Paula')
            .should('be.value', 'Paula');

        cy.get('input[name="lastName"]')
            .type('Testerka')
            .should('be.value', 'Testerka');

        cy.get('input[name="password"]')
            .type('12345678')
            .should('be.value', '12345678');

        cy.get('input[name="passwordConfirm"]')
            .type('12345678')
            .should('be.value', '12345678');

        cy.contains('span[class="MuiButton-label"]', 'Zarejestruj się').click();
    });
});