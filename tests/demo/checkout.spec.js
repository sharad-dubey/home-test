import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout'
const testdata=JSON.parse(JSON.stringify(require("../../data/checkouttestdata.json")))
const testurl=JSON.parse(JSON.stringify(require("../../data/urldata.json")))

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/checkout`);
  });

test('continue checkout test', async ({ page }) => {

    const Checkout = new CheckoutPage(page)
    await Checkout.continueCheckout(testdata.name, testdata.fullname, testdata.email, testdata.ccnumber, testdata.address, testdata.expirymonth, testdata.city, testdata.expiryyear, testdata.cvv, testdata.state, testdata.zip)
    const actualmessage = await Checkout.orderconfirmmessage.textContent();
    expect(actualmessage).toBe(testdata.expectedordermessage); // Asserting order confirmation
    const orderNumberText = await Checkout.ordernumber.textContent();
    const orderNumber = orderNumberText.split(':')[1].trim();
    console.log('Order number is --', orderNumber);
    await expect(orderNumber).not.toBe('');   // Asserting that order number is not empty

}
)

test('alert message test', async ({ page }) => {

    const Checkout = new CheckoutPage(page)
    let dialogHandled = false;
    page.once('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain(testdata.alertboxmessage) 
        await dialog.accept();
        dialogHandled = true;
    })
    await Checkout.getAlertMessage(testdata.name, testdata.fullname, testdata.email, testdata.ccnumber, testdata.address, testdata.expirymonth, testdata.city, testdata.expiryyear, testdata.cvv, testdata.state, testdata.zip)

    await page.waitForTimeout(2000);
    expect(dialogHandled).toBe(true);
    expect(page.listeners('dialog')).toHaveLength(0); // Assert no active dialog listeners


}
)

test('total cart value', async ({ page }) => {

    const Checkout = new CheckoutPage(page)
    const priceList = await Checkout.cart_price_list;
    console.log('number of items', await priceList.count())
    const priceListCount = await priceList.count();
    let calculateTotalPrice=0;

    for(let i=0; i<priceListCount-1; i++){
        let priceText = await priceList.nth(i).textContent();
        priceText = priceText.trim().replace('$','');
        let priceValue = parseFloat(priceText);
        console.log('price value', priceText);
        calculateTotalPrice += priceValue;

    }

    console.log('Total ', calculateTotalPrice);

    let expectedTotalPrice = await priceList.nth(priceListCount-1).textContent();
    const expectedTotalPriceValue = parseFloat(expectedTotalPrice.trim().replace('$',''));

    expect(calculateTotalPrice).toBe(expectedTotalPriceValue);
 

}
)