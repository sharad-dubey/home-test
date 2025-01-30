import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout';
import { CheckoutPageEvent } from '../../pageEvents/checkoutPageEvent';

const testdata = require('../../data/checkouttestdata.json');
const testurl = require('../../data/environmentalConfig.json');

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/checkout`);
});

test('Continue checkout test', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    const checkoutEvent = new CheckoutPageEvent(page);

    await checkoutEvent.continueCheckout(
        testdata.name,
        testdata.fullname,
        testdata.email,
        testdata.ccnumber,
        testdata.address,
        testdata.expirymonth,
        testdata.city,
        testdata.expiryyear,
        testdata.cvv,
        testdata.state,
        testdata.zip
    );

    const actualMessage = await checkout.orderconfirmmessage.textContent();
    expect(actualMessage).toBe(testdata.expectedordermessage); // Assert order confirmation

    const orderNumberText = await checkout.ordernumber.textContent();
    const orderNumber = orderNumberText.split(':')[1].trim();
    console.log('Order number is --', orderNumber);

    await expect(orderNumber).not.toBe(''); // Assert that order number is not empty
});

test('Alert message test', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    const checkoutEvent = new CheckoutPageEvent(page);
    let dialogHandled = false;

    const dialogPromise = page.waitForEvent('dialog').then(async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain(testdata.alertboxmessage);
        await dialog.accept();
        dialogHandled = true;
    });

    await checkoutEvent.getAlertMessage(
        testdata.name,
        testdata.fullname,
        testdata.email,
        testdata.ccnumber,
        testdata.address,
        testdata.expirymonth,
        testdata.city,
        testdata.expiryyear,
        testdata.cvv,
        testdata.state,
        testdata.zip
    );

    await dialogPromise;
    expect(dialogHandled).toBe(true);
    expect(page.listeners('dialog')).toHaveLength(0); // Assert no active dialog listeners
});

test('Total cart value', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    const priceList = await checkout.cart_price_list;
    console.log('Number of items:', await priceList.count());

    const priceListCount = await priceList.count();
    let calculatedTotalPrice = 0;

    for (let i = 0; i < priceListCount - 1; i++) {
        let priceText = await priceList.nth(i).textContent();
        priceText = priceText.trim().replace('$', '');
        let priceValue = parseFloat(priceText);
        console.log('Price value:', priceText);
        calculatedTotalPrice += priceValue;
    }

    console.log('Total:', calculatedTotalPrice);

    let expectedTotalPrice = await priceList.nth(priceListCount - 1).textContent();
    const expectedTotalPriceValue = parseFloat(expectedTotalPrice.trim().replace('$', ''));

    expect(calculatedTotalPrice).toBe(expectedTotalPriceValue);
});
