class Bomb {
    constructor(self, x, y, col, row) {
        this.self = self
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col
        this.gridRow = row
    }
    createBomb() {
        //create bomb
        let bomb = this.self.bombGroup.create(this.gridX, this.gridY, 'bomb');
        bomb.setDisplaySize(this.self.wallDim - 7, this.self.wallDim - 7);

        //store location
        this.self.bombLocation.push({ x: this.gridX, y: this.gridY });

        console.log(`Bomb placed at col:${this.gridCol}, row:${this.gridRow}`);
    }
}

export default Bomb;