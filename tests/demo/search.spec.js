import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search'

test('verify search result message', async ({ page }) => {

    const Search = new SearchPage(page)
    await Search.gotoSearchPage()
    const searchWord = 'Atomation';

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
    const searchWord = '';

    await Search.search_box.fill(searchWord);
    await Search.search_button.click();

    const searchResultMessage = await Search.search_result;
    await expect(searchResultMessage).toBeVisible();

    const expectedResultMessage = 'Please provide a search word.';
    await expect(searchResultMessage).toHaveText(expectedResultMessage);  

}
)