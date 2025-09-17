class Bomb {
    constructor(self, x, y, col, row) {
        this.self = self
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col
        this.gridRow = row
        this.bomb = null
    }
    createBomb() {
        //create bomb
        this.bomb = this.self.bombGroup.create(this.gridX, this.gridY, 'bomb');
        this.bomb.setDisplaySize(this.self.wallDim - 7, this.self.wallDim - 7);

        //store location
        this.self.bombLocation.push({ x: this.gridX, y: this.gridY });

        console.log(`Bomb placed at col:${this.gridCol}, row:${this.gridRow}`);

        //schedule destruction after 2 seconds
        this.self.time.delayedCall(2000, () => {
            this.destroyBomb();
        });
    }
    destroyBomb() {
        if (this.bomb) {

            //Destroy the bomb
            this.bomb.destroy()

            //Remove the location of the bomb
            this.self.bombLocation = this.self.bombLocation.filter(
                pos => !(pos.x === this.gridX && pos.y === this.gridY)
            );

            console.log(`Bomb destroyed at col:${this.gridCol}, row:${this.gridRow}`);

        }
    }
}

export default Bomb;