describe('Login into the application', () => {
    beforeEach(() => {
        cy.viewport(1920,1080);
        cy.visit('/login');
        cy.contains('h1', 'Zaloguj się!').should('be.visible');
    })

   it('Login is correct', () => {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);
            cy.get('input[name="password"]').type(this.LoginData.password);
       });
       
        cy.get('button[type=submit]').as('sbmitBtn').click();
        cy.contains('.MuiButton-label', 'Zaloguj się').click();
        cy.wait(5000);
        cy.get('button[title="Wyloguj"]').click();
    });

    it('Should error for an invalid user', () => {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.wrongemail)//.should('be.value', this.LoginData.email );
            cy.get('input[name="password"]').type(this.LoginData.wrongpassword)//.should('be.value', '123323');
        });
    
        cy.get('button[type=submit]').as('sbmitBtn').click();
        cy.wait(3000);
    });
    it('Should error for empty password', () => {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email);   
        });

        cy.get('button[type=submit]').as('sbmitBtn').click();
        cy.contains('Hasło jest wymagane').should('be.visible');

        cy.wait(3000);
    });

    it('Should error for empty login', () => {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="password"]').type(this.LoginData.password)   
        });

        cy.get('button[type=submit]').as('sbmitBtn').click();
        cy.contains('E-mail jest wymagany').should('be.visible');
        cy.wait(3000);
    });

    it('Login with a short password', () => {
        cy.fixture('LoginData').then(function (LoginData) {
            this.LoginData = LoginData;
            cy.get('input[name="email"]').type(this.LoginData.email)
            cy.get('input[name="password"]').type('12345').should('have.length', 8);
        });
        
        cy.get('button[type=submit]').as('sbmitBtn').click()
        cy.contains('Hasło musi zawierać przynajmniej 8 znaków').should('be.visible')
        cy.wait(3000);
    });

    it('Password Reset', () => {
        cy.get('span[role="button"]').click();
        cy.get('input[name="passwordreset"]').type('test@gmail.com');
        cy.contains('button', 'Resetuj').click();
    });
});




