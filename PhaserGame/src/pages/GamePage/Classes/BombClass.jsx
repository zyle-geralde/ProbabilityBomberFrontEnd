import Explosion from "./ExplosionClass";
class Bomb {
    constructor(self, x, y, col, row) {
        this.self = self
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col
        this.gridRow = row
        this.bomb = null
        this.bombSize = this.self.wallDim - 7
        this.flashTween = null; //tween instead of timer

    }
    createBomb() {
        //create bomb
        this.bomb = this.self.bombGroup.create(this.gridX, this.gridY, 'bomb');
        this.bomb.setDisplaySize(this.bombSize, this.bombSize);

        //store location
        this.self.bombLocation.push({ x: this.gridX, y: this.gridY });

        console.log(`Bomb placed at col:${this.gridCol}, row:${this.gridRow}`);


        this.flashTween = this.self.tweens.add({
            targets: this.bomb,
            alpha: 0.3,
            duration: 500,
            yoyo: true,
            repeat: -1
        });


        //schedule destruction after 2 seconds
        this.self.time.delayedCall(2000, () => {
            this.destroyBomb();
        });
    }
    destroyBomb() {
        if (this.bomb) {

            // stop flashing tween
            if (this.flashTween) {
                this.flashTween.stop();
                this.flashTween = null;
            }

            //Destroy the bomb
            this.bomb.destroy()

            //Remove the location of the bomb
            this.self.bombLocation = this.self.bombLocation.filter(
                pos => !(pos.x === this.gridX && pos.y === this.gridY)
            );

            console.log(`Bomb destroyed at col:${this.gridCol}, row:${this.gridRow}`);

            //Create explosion
            let centerExplosion = new Explosion(this.self, this.gridX, this.gridY, this.gridCol, this.gridRow).createExplosion();
            //Top explosion
            let topExplosion = new Explosion(
                this.self,
                this.gridX,
                this.gridY - this.self.wallDim,
                this.gridCol,
                this.gridRow - 1
            ).createExplosion();

            //Bottom explosion
            let bottomExplosion = new Explosion(
                this.self,
                this.gridX,
                this.gridY + this.self.wallDim,
                this.gridCol,
                this.gridRow + 1
            ).createExplosion();

            //Left explosion
            let leftExplosion = new Explosion(
                this.self,
                this.gridX - this.self.wallDim,
                this.gridY,
                this.gridCol - 1,
                this.gridRow
            ).createExplosion();

            //Right explosion
            let rightExplosion = new Explosion(
                this.self,
                this.gridX + this.self.wallDim,
                this.gridY,
                this.gridCol + 1,
                this.gridRow
            ).createExplosion();
        }
    }
}

export default Bomb;