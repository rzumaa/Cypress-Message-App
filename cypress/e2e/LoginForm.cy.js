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

        //we should have a visible notice now
        cy.contains('Zalogowano pomyślnie!').should('be.visible');
        
        // Should be on a new URL
        cy.url().should('include', 'http://localhost:3000/');

        cy.wait(5000);
        cy.get('button[title="Wyloguj"]').click();

        // we should have a visible notice now
        cy.contains('Wylogowano pomyślnie!').should('be.visible');

        // Should be on a new URL
        cy.url().should('include', '/login');
    });

    it('Should error for an invalid user', function () {
       
        // incorrect username on purpose
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.wrongemail);
            cy.get('input[name="password"]').type(this.LoginData.wrongpassword);
        });
        
        cy.get('@smbitBtn').click();
       
        // we should have visible error now
        cy.contains('There is no user record corresponding to this identifier. The user may have been deleted.').should('be.visible')
      
        cy.contains('button', 'OK').click();

        // and still be on the same URL
        cy.url().should('include', '/login');
        cy.wait(3000);
    });

    it('Should error for empty password', function () {

        // empty password on purpose
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);   
        });

        cy.get('@smbitBtn').click();

        // we should have visible error now
        cy.contains('Hasło jest wymagane').should('be.visible');

        // and still be on the same URL
        cy.url().should('include', '/login');
        cy.wait(3000);
    });

    it('Should error for empty addres email', function () {

        // empty addres email on purpose
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="password"]').type(this.LoginData.password);
        });

        cy.get('@smbitBtn').click();

        // we should have visible error now
        cy.contains('E-mail jest wymagany').should('be.visible');

        // and still be on the same URL
        cy.url().should('include', '/login');
        cy.wait(3000);
    });

    it('Login with a short password', function () {

        // short password on purpose
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);
            cy.get('input[name="password"]').type('12345').should('have.length', 8);
        });
       
        cy.get('@smbitBtn').click(); 

        // we should have visible error now
        cy.contains('Hasło musi zawierać przynajmniej 8 znaków').should('be.visible');

        // and still be on the same URL
        cy.url().should('include', '/login');
        cy.wait(3000);
    });

    it('Password Reset', function ()  {

        // reset password on purpose
        cy.get('span[role="button"]').click();
        cy.contains('h3', 'Resetowanie hasła').should('be.visible');
        cy.get('input[name="passwordreset"]').type('test@gmail.com');
        cy.contains('button', 'Resetuj').click();
    });
});




