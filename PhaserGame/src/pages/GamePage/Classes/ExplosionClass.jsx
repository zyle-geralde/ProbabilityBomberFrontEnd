class Explosion {
    constructor(self, x, y, col, row) {
        this.self = self
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col
        this.gridRow = row
        this.explosion = null
        this.explosionSize = this.self.wallDim - 7
    }

    createExplosion(direction) {


        //check if this explosion overlaps with an unbreakable wall
        const blocked = this.self.unbrkWallList.some(
            w => w.x === this.gridX && w.y === this.gridY
        );

        if (blocked) {
            if (direction == "top") {
                this.self.disableTopExplosion = true
            }
            else if (direction == "bottom") {
                this.self.disableBottomExplosion = true
            }
            else if (direction == "left") {
                this.self.disableLeftExplosion = true
            }
            else if (direction == "right") {
                this.self.disableRightExplosion = true
            }
            console.log(`Explosion blocked at col:${this.gridCol}, row:${this.gridRow}`);
            return null; //don’t create explosion
        }


        // Create explosion sprite
        this.explosion = this.self.explosionGroup.create(this.gridX, this.gridY, 'explode');
        this.explosion.setDisplaySize(this.explosionSize, this.explosionSize);

        // Start invisible
        this.explosion.setAlpha(0);

        //store location
        this.self.explosionLocation.push({ x: this.gridX, y: this.gridY });

        console.log(`Explosion placed at col:${this.gridCol}, row:${this.gridRow}`);

        // Tween: fade in → fade out
        this.self.tweens.add({
            targets: this.explosion,
            alpha: { from: 0, to: 1 }, // fade in
            duration: 100,
            yoyo: true, //fade out after fade in
            hold: 400,  //stay visible for a short moment
            onComplete: () => {
                this.self.disableTopExplosion = false
                this.self.disableBottomExplosion = false
                this.self.disableLeftExplosion = false
                this.self.disableRightExplosion = false
                this.destroyExplosion();
            }
        });
    }
    destroyExplosion() {
        //Destroy Explosion
        this.explosion.destroy()

        //Remove the location of the explosion
        this.self.explosionLocation = this.self.explosionLocation.filter(
            pos => !(pos.x === this.gridX && pos.y === this.gridY)
        );

        console.log(`Explosion destroyed at col:${this.gridCol}, row:${this.gridRow}`);
    }
}

export default Explosion