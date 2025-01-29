exports.SearchPage = class SearchPage {

    constructor(page){
        this.page=page
        this.search_box = page.locator("form input[placeholder='Search..']");
        this.search_button = page.locator('form button');
        this.empty_search_result = page.locator('.result-container #result');
        this.search_result = page.getByText('Found one result for');
    }

   
}