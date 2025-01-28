import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout'
const testdata=JSON.parse(JSON.stringify(require("../../data/checkouttestdata.json")))

test('continue checkout test', async ({ page }) => {


    const Checkout = new CheckoutPage(page)


    await Checkout.gotoCheckoutPage()
    await Checkout.continueCheckout(testdata.name, testdata.fullname, testdata.email, testdata.ccnumber, testdata.address, testdata.expirymonth, testdata.city, testdata.expiryyear, testdata.cvv, testdata.state, testdata.zip)
    await expect(page.getByText('Order Confirmed!')).toBeVisible(); // Asserting order confirmation
    await expect(page.getByText('Order Number:')).toBeVisible();

}
)

test('alert message test', async ({ page }) => {

    const Checkout = new CheckoutPage(page)
    await Checkout.gotoCheckoutPage()
    let dialogHandled = false;
    page.once('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('Shipping address same as billing checkbox must be selected.') 
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

    await Checkout.gotoCheckoutPage()

    const priceList = await Checkout.cart_price_list;
    // const priceList = await page.locator('div p span.price')
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