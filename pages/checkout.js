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

}