import { SearchPage } from '../pages/search';

exports.SearchPageEvent = class SearchPageEvent {

    constructor(page) {
        this.page = page;
        this.searchPage = new SearchPage(page);
    }
    
   
}