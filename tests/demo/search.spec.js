import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search'
const testdata=JSON.parse(JSON.stringify(require("../../data/searchtestdata.json")))

test('verify search result message', async ({ page }) => {

    const Search = new SearchPage(page)
    await Search.gotoSearchPage()
    const searchWord = testdata.searchtext;

    await Search.search_box.fill(searchWord);
    await Search.search_button.click();

    const searchResultMessage = await Search.search_result;
    await expect(searchResultMessage).toBeVisible();

    const expectedResultMessage = `Found one result for ${searchWord}`;
    await expect(searchResultMessage).toHaveText(expectedResultMessage);  

}
)

test('verify empty search result message', async ({ page }) => {

    const Search = new SearchPage(page)
    await Search.gotoSearchPage()
    const searchWord = testdata.emptysearchtext;

    await Search.search_box.fill(searchWord);
    await Search.search_button.click();

    const searchResultMessage = await Search.search_result;
    await expect(searchResultMessage).toBeVisible();

    const expectedResultMessage = testdata.emptysearchresultmessage;
    await expect(searchResultMessage).toHaveText(expectedResultMessage);  

}
)