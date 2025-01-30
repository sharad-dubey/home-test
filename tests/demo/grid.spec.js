import { test, expect } from '@playwright/test';
import { GridPage } from '../../pages/grid';
import { GridPageEvent } from '../../pageEvents/gridPageEvent';

const testdata = require('../../data/gridtestdata.json');
const testurl = require('../../data/environmentalConfig.json');

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/grid`);
});

test('Verify position seven product', async ({ page }) => {
    const grid = new GridPage(page);

    console.log('Number of food items:', await grid.grid_item_list.count());

    const gridItems = await grid.grid_item_list;
    const product7 = gridItems.nth(6);

    const productName = await product7.locator('h4').textContent();
    const productPrice = await product7.locator('#item-price').textContent();

    expect(productName).toBe(testdata.item7name);
    expect(productPrice).toBe(testdata.item7price);
});

test('Assert all items have non-empty details', async ({ page }) => {
    const grid = new GridPage(page);

    console.log('Number of food items:', await grid.grid_item_list.count());

    const gridItems = await grid.grid_item_list;
    const gridItemCount = await gridItems.count();

    for (let i = 0; i < gridItemCount; i++) {
        const item = gridItems.nth(i);

        const title = await item.locator('label').textContent();
        expect(title.trim()).not.toBe('');

        const gridPrice = await item.locator('#item-price').textContent();
        expect(gridPrice.trim()).not.toBe('');

        const gridImageSrc = await item.locator('img').getAttribute('src');
        expect(gridImageSrc.trim()).not.toBe('');

        const gridButton = await item.locator('button');
        expect(await gridButton.count()).toBe(1);
    }
});
