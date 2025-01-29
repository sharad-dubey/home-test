import { CheckoutPage } from '../pages/checkout.js';

exports.CheckoutPageEvent = class CheckoutPageEvent {

    constructor(page) {
        this.page = page;
        this.checkoutPage = new CheckoutPage(page);
    }
    
 
    async continueCheckout(fullname,nameoncard,email,ccnumber,address,month,city,expyear,cvv,state,zip){
        await this.checkoutPage.full_name_textbox.fill(fullname);
        await this.checkoutPage.name_on_card_textbox.fill(nameoncard);
        await this.checkoutPage.email_textbox.fill(email);
        await this.checkoutPage.credit_card_number_textbox.fill(ccnumber)
        await this.checkoutPage.address_textbox.fill(address)
        await this.checkoutPage.exp_month_list.click()
        await this.checkoutPage.exp_month_list.selectOption(month)
        await this.checkoutPage.city_textbox.fill(city)
        await this.checkoutPage.exp_year_textbox.fill(expyear)
        await this.checkoutPage.cvv_textbox.fill(cvv)
        await this.checkoutPage.state_textbox.fill(state)
        await this.checkoutPage.zip_textbox.fill(zip)
        await this.checkoutPage.checkbox_label.check()
        await this.checkoutPage.checkout_button.click()

    }

    async getAlertMessage(fullname,nameoncard,email,ccnumber,address,month,city,expyear,cvv,state,zip){
        await this.checkoutPage.full_name_textbox.fill(fullname);
        await this.checkoutPage.name_on_card_textbox.fill(nameoncard);
        await this.checkoutPage.email_textbox.fill(email);
        await this.checkoutPage.credit_card_number_textbox.fill(ccnumber)
        await this.checkoutPage.address_textbox.fill(address)
        await this.checkoutPage.exp_month_list.click()
        await this.checkoutPage.exp_month_list.selectOption(month)
        await this.checkoutPage.city_textbox.fill(city)
        await this.checkoutPage.exp_year_textbox.fill(expyear)
        await this.checkoutPage.cvv_textbox.fill(cvv)
        await this.checkoutPage.state_textbox.fill(state)
        await this.checkoutPage.zip_textbox.fill(zip)
        await this.checkoutPage.checkbox_label.uncheck()
        await this.checkoutPage.checkout_button.click()

    }
   
}