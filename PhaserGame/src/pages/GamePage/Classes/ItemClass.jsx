class Item{
    constructor(self, x, y, col, row, texture) {
        this.self = self;
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col;
        this.gridRow = row;
        this.texture = texture;
        this.item = null;
        this.itemSize = this.self.wallDim - 7;
    }

    create() {
        this.item = this.self.itemGroup.create(this.gridX, this.gridY, this.texture);
        this.item.setDisplaySize(this.itemSize, this.itemSize);

        this.self.itemLocation.push({ x: this.gridX, y: this.gridY });

        /*// Optional: mark which grid this item belongs to
        this.item.gridCol = this.gridCol;
        this.item.gridRow = this.gridRow;

        return this.item;*/
    }

}

export default Item;