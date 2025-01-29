import { test, expect } from '@playwright/test';
import { GridPage } from '../../pages/grid'
const testdata=JSON.parse(JSON.stringify(require("../../data/gridtestdata.json")))
const testurl=JSON.parse(JSON.stringify(require("../../data/urldata.json")))

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/grid`);
  });

test('verify position seven product', async ({ page }) => {

    const Grid = new GridPage(page)

    console.log('number of food items', await Grid.grid_item_list.count())


   const gridItems = await Grid.grid_item_list;
   const product7 = gridItems.nth(6);

   const productName = await product7.locator('h4').textContent();
   const productPrice = await product7.locator('#item-price').textContent();

   expect(productName).toBe(testdata.item7name);
   expect(productPrice).toBe(testdata.item7price);

}
)

test('Assert all items non-empty details', async ({ page }) => {

    const Grid = new GridPage(page)

    console.log('number of food items', await Grid.grid_item_list.count())


   const gridItems = await Grid.grid_item_list;
   const gridItemCount = await gridItems.count();

   for(let i=0; i<gridItemCount;i++){
    const item = gridItems.nth(i);

    const title = await item.locator('label').textContent();
    expect(title.trim()).not.toBe('');

    const gridPrice = await item.locator('#item-price').textContent();
    expect(gridPrice.trim()).not.toBe('');

    const gridImage = await item.locator('img');
    const gridImageSrc = await gridImage.getAttribute('Src');
    expect(gridImageSrc.trim()).not.toBe('');

    const gridButton = await item.locator('button');
    expect(await gridButton.count()).toBe(1);

   }
  

}
)