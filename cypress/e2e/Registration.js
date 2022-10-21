describe('rejestracja', () => {
    it('test', () => {
     //   cy.visit('/');
        cy.visit('/login');
        cy.get('a[href="/registration"]').click();

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
        });
       // cy.contains('span[class="MuiButton-label"]', 'Zarejestruj się').click();
    });
});