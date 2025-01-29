exports.CheckoutPage = class CheckoutPage {

    constructor(page) {

        this.page = page
        this.full_name_textbox = page.getByLabel('Full Name');
        this.name_on_card_textbox = page.getByLabel('Name on Card');
        this.email_textbox = page.getByLabel('Email');
        this.credit_card_number_textbox = page.getByLabel('Credit card number');
        this.address_textbox = page.getByLabel('Address', { exact: true });
        this.exp_month_list = page.getByLabel('Exp Month');
        this.city_textbox = page.getByLabel('City');
        this.exp_year_textbox = page.getByLabel('Exp Year');
        this.cvv_textbox = page.getByLabel('CVV');
        this.state_textbox = page.getByLabel('State');
        this.zip_textbox = page.getByLabel('Zip');
        this.checkbox_label = page.getByLabel('Shipping address same as')
        this.checkout_button = page.getByRole('button', { name: 'Continue to checkout' })
        this.cart_price_list = page.locator('div p span.price')
        this.orderconfirmmessage = page.locator('#order-confirmation h1')
        this.ordernumber = page.locator('#order-confirmation p')
    }

    async gotoCheckoutPage(){
        await this.page.goto('http://localhost:3100/checkout');
    }

    async continueCheckout(fullname,nameoncard,email,ccnumber,address,month,city,expyear,cvv,state,zip){
        await this.full_name_textbox.fill(fullname);
        await this.name_on_card_textbox.fill(nameoncard);
        await this.email_textbox.fill(email);
        await this.credit_card_number_textbox.fill(ccnumber)
        await this.address_textbox.fill(address)
        await this.exp_month_list.click()
        await this.exp_month_list.selectOption(month)
        await this.city_textbox.fill(city)
        await this.exp_year_textbox.fill(expyear)
        await this.cvv_textbox.fill(cvv)
        await this.state_textbox.fill(state)
        await this.zip_textbox.fill(zip)
        await this.checkbox_label.check()
        await this.checkout_button.click()

    }

    async getAlertMessage(fullname,nameoncard,email,ccnumber,address,month,city,expyear,cvv,state,zip){
        await this.full_name_textbox.fill(fullname);
        await this.name_on_card_textbox.fill(nameoncard);
        await this.email_textbox.fill(email);
        await this.credit_card_number_textbox.fill(ccnumber)
        await this.address_textbox.fill(address)
        await this.exp_month_list.click()
        await this.exp_month_list.selectOption(month)
        await this.city_textbox.fill(city)
        await this.exp_year_textbox.fill(expyear)
        await this.cvv_textbox.fill(cvv)
        await this.state_textbox.fill(state)
        await this.zip_textbox.fill(zip)
        await this.checkbox_label.uncheck()
        await this.checkout_button.click()

    }
}