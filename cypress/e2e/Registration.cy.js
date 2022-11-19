describe('rejestracja', () => {
    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.get('a[href="/registration"]').click();
        cy.url().should('include', '/registration');
        
        // Should be on a new URL 
        cy.contains('h1', 'Zarejestruj się!').should('be.visible');
        cy.get('button[type=submit]').as('smbitBtn');
    })
  
    it('User registration into application in form', () => {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
     
    });

     it('Should error for different password',() => {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm2);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Hasła muszą być takie same').should('be.visible');
     });  
    
});