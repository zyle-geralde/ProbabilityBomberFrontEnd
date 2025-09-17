class Explosion{
    constructor(self,x, y, col, row) {
        this.self = self
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col
        this.gridRow = row
        this.explosion = null
        this.explosionSize = this.self.wallDim - 7
    }

    createExplosion() {
        this.explosion = this.self.explosionGroup.create(this.gridX, this.gridY, 'explode');
        this.explosion.setDisplaySize(this.explosionSize, this.explosionSize);

        //store location
        this.self.explosionLocation.push({ x: this.gridX, y: this.gridY});

        console.log(`Explosion placed at col:${this.gridCol}, row:${this.gridRow}`);
    }
}

export default Explosion