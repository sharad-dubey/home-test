import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search'
import { SearchPageEvent } from '../../pageEvents/SearchPageEvent'
const testdata=JSON.parse(JSON.stringify(require("../../data/searchtestdata.json")))
const testurl=JSON.parse(JSON.stringify(require("../../data/urldata.json")))

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/search`);
  });

test('verify search result message', async ({ page }) => {

    const Search = new SearchPage(page)
    const searchWord = testdata.searchtext;

    await Search.search_box.fill(searchWord);
    await Search.search_button.click();

    const searchResultMessage = await Search.search_result.textContent();
    const partmessage = testdata.resultmessage;
    const expectedResultMessage = partmessage + searchWord;
    await expect(searchResultMessage).toBe(expectedResultMessage);  

}
)

test('verify empty search result message', async ({ page }) => {

    const Search = new SearchPage(page)
    const searchWord = testdata.emptysearchtext;

    await Search.search_box.fill(searchWord);
    await Search.search_button.click();

    const searchResultMessage = await Search.empty_search_result;
    await expect(searchResultMessage).toBeVisible();

    const expectedResultMessage = testdata.emptysearchresultmessage;
    await expect(searchResultMessage).toHaveText(expectedResultMessage);  

}
)