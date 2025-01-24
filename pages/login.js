exports.LoginPage = class LoginPage {


    constructor(page) {

        this.page = page
        this.username_textbox = page.getByLabel('USERNAME');
        this.password_textbox = page.getByLabel('PASSWORD');
        this.login_button = page.getByRole('button', { name: 'Sign In' });
    }

    async gotoLoginPage(){
        await this.page.goto('http://localhost:3100/login');
    }

    async login(username, password){
        await this.username_textbox.fill(username)
        await this.password_textbox.fill(password)
        await this.login_button.click()

    }
   
}