import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search';
import { SearchPageEvent } from '../../pageEvents/SearchPageEvent';

const testdata = require('../../data/searchtestdata.json');
const testurl = require('../../data/environmentalConfig.json');

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/search`);
});

test('Verify search result message', async ({ page }) => {
    const search = new SearchPage(page);
    const searchWord = testdata.searchtext;

    await search.search_box.fill(searchWord);
    await search.search_button.click();

    const searchResultMessage = await search.search_result.textContent();
    const expectedResultMessage = testdata.resultmessage + searchWord;

    await expect(searchResultMessage).toBe(expectedResultMessage);
});

test('Verify empty search result message', async ({ page }) => {
    const search = new SearchPage(page);
    const searchWord = testdata.emptysearchtext;

    await search.search_box.fill(searchWord);
    await search.search_button.click();

    const searchResultMessage = await search.empty_search_result;
    await expect(searchResultMessage).toBeVisible();
    await expect(searchResultMessage).toHaveText(testdata.emptysearchresultmessage);
});
