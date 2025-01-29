import { LoginPage } from '../pages/login.js';

exports.LoginPageEvent = class LoginPageEvent {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }
    
      
    async login(username, password){
        await this.loginPage.username_textbox.fill(username)
        await this.loginPage.password_textbox.fill(password)
        await this.loginPage.login_button.click()

    }
   
}