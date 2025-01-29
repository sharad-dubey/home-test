exports.LoginPage = class LoginPage {


    constructor(page) {

        this.page = page
        this.username_textbox = page.getByLabel('USERNAME');
        this.password_textbox = page.getByLabel('PASSWORD');
        this.login_button = page.getByRole('button', { name: 'Sign In' });
        this.welcome_message_text = page.locator('#welcome-message h2');
        this.welcome_message_username = page.locator('#welcome-message p');
    }
    
   
}