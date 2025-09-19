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

        //add float animation (go up/down repeatedly)
        this.self.tweens.add({
            targets: this.item,
            y: this.item.y - 2,    //move up by 10 pixels
            duration: 1000,          //0.8s up
            yoyo: true,             //then go back down
            repeat: -1,             //infinite loop
            ease: 'Sine.easeInOut', //smooth motion
        });

    }

}

export default Item;