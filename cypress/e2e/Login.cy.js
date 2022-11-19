describe('Login into the application', () => {
    beforeEach(() => {
        cy.viewport(1920,1080);
        // Visit signin page on
        cy.visit('/login');
        cy.contains('h1', 'Zaloguj się!').should('be.visible');
        cy.get('button[type=submit]').as('smbitBtn');
    })

   it('Login is correct', function ()  {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);
            cy.get('input[name="password"]').type(this.LoginData.password);
       });

        cy.get('@smbitBtn').click();
        
        // Should be on a new URL
        cy.url().should('include', 'http://localhost:3000/')

        cy.wait(5000);
        cy.get('button[title="Wyloguj"]').click();
    });

    it('Should error for an invalid user', function () {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.wrongemail)
            cy.get('input[name="password"]').type(this.LoginData.wrongpassword)
        });
        
        cy.get('@smbitBtn').click();
        cy.wait(3000);
    });

    it('Should error for empty password', function () {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);   
        });

        cy.get('@smbitBtn').click();
        cy.contains('Hasło jest wymagane').should('be.visible');

        cy.wait(3000);
    });

    it('Should error for empty login', function () {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="password"]').type(this.LoginData.password)   
        });

        cy.get('@smbitBtn').click();
        cy.contains('E-mail jest wymagany').should('be.visible');
        cy.wait(3000);
    });

    it('Login with a short password', function () {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email)
            cy.get('input[name="password"]').type('12345').should('have.length', 8);
        });
       
        cy.get('@smbitBtn').click();  
        cy.contains('Hasło musi zawierać przynajmniej 8 znaków').should('be.visible')
        cy.wait(3000);
    });

    it('Password Reset', function ()  {
        cy.get('span[role="button"]').click();
        cy.get('input[name="passwordreset"]').type('test@gmail.com');
        cy.contains('button', 'Resetuj').click();
    });
});




