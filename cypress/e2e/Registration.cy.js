describe('User registration into application in form', () => {
    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.get('a[href="/registration"]').click();
        // Should be on a new URL 
        cy.url().should('include', '/registration');
        cy.contains('h1', 'Zarejestruj się!').should('be.visible');
        cy.get('button[type=submit]').as('smbitBtn');
    })
  
    it('Successfully registration', function () {

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

     it('Should error for different password', function () {

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
   
     it('Should error for empty confirm  password', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Hasła muszą być takie same').should('be.visible');

     });

     it('Should error for empty passwords', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Hasło jest wymagane').should('be.visible');
        cy.contains('Potwierdź hasło').should('be.visible');
     });
     it('Should error for empty firstname', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Imię jest wymagane').should('be.visible');
     });

     it('Should error for empty lastname', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.email);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Nazwisko jest wymagane').should('be.visible');
     });

     it('Should error for empty email', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('E-mail jest wymagany').should('be.visible');
     });

     it('Should error for  email without "@"', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.incorectemail);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Podany adres jest niepoprawny').should('be.visible');
     });
     it('Should error for  email without "@gmail.com"', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.incorectemail2);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Podany adres jest niepoprawny').should('be.visible');
     });
     it('Should error for  email without "gmail"', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.incorectemail3);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Podany adres jest niepoprawny').should('be.visible');
     });

     it('Should error for  email without ".com"', function () {

        cy.fixture('RegistrationData').then(function (RegistrationData) {
            this.RegistrationData = RegistrationData;
            cy.get('input[name="email"]').type(this.RegistrationData.incorectemail4);
            cy.get('input[name="firstName"]').type(this.RegistrationData.firstname);
            cy.get('input[name="lastName"]').type(this.RegistrationData.lastname);
            cy.get('input[name="password"]').type(this.RegistrationData.password);
            cy.get('input[name="passwordConfirm"]').type(this.RegistrationData.passwordConfirm);
        });

        cy.get('@smbitBtn').click();
        cy.contains('Podany adres jest niepoprawny').should('be.visible');
     });

});
