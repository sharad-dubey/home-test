import { GridPage } from '../pages/grid.js';

exports.GridPageEvent = class GridPageEvent {

    constructor(page) {
        this.page = page;
        this.gridPage = new GridPage(page);
    }
    
   
}