exports.GridPage = class GridPage {

    constructor(page){
        this.page=page
        this.grid_item_list = page.locator('#menu .item');
    }


    async gotoGridPage(){
        await this.page.goto('http://localhost:3100/grid');
    }

    async verifyItemByPosition(position,itemname,itemprice){
        const gridSize= await this.grid_item_list.count();
        

    }
}