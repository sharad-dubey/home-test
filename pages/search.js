exports.SearchPage = class SearchPage {

    constructor(page){
        this.page=page
        this.search_box = page.locator("form input[placeholder='Search..']");
        this.search_button = page.locator('form button');
        this.search_result = page.locator('.result-container #result');
    }

    async gotoSearchPage(){
        await this.page.goto('http://localhost:3100/search');
    }


}