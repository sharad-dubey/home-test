exports.GridPage = class GridPage {
    constructor(page) {
        this.page = page;
        this.grid_item_list = page.locator('#menu .item');
    }
};
