import Bomb from "./BombClass"
class Player {

    constructor(self, Wall) {
        this.self = self
        this.x = 550
        this.y = 70
        this.speed = 150
        this.Wall = Wall


    }
    createPlayer() {
        this.self.player = this.self.physics.add.sprite(this.x, this.y, 'character');
        this.self.player.body.setSize(30, 50);
        this.self.player.setDisplaySize(40, 40);
        this.self.player.setCollideWorldBounds(true);

        //Make sure that player always come on top
        this.self.player.setDepth(1000);
    }

    playerAnimation() {
        this.self.anims.create({
            key: 'left',
            frames: this.self.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });
        this.self.anims.create({
            key: 'right',
            frames: this.self.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });
        this.self.anims.create({
            key: 'stopright',
            frames: [{ key: 'character', frame: 0 }],
            frameRate: 10,
            repeat: -1,
        });
    }
    handlePlayerMovement() {
        if (this.self.cursors.left.isDown) {
            this.self.player.setVelocityX(-this.speed);
            this.self.player.setVelocityY(0);

            this.self.player.anims.play('left', true);
        } else if (this.self.cursors.right.isDown) {
            this.self.player.setVelocityX(this.speed);
            this.self.player.setVelocityY(0);

            this.self.player.anims.play('right', true);
        } else if (this.self.cursors.up.isDown) {
            this.self.player.setVelocityY(-this.speed);
            this.self.player.setVelocityX(0);

            this.self.player.anims.play('right', true);
        } else if (this.self.cursors.down.isDown) {
            this.self.player.setVelocityY(this.speed);
            this.self.player.setVelocityX(0);
            this.self.player.anims.play('left', true);
        }
        else {
            this.self.player.setVelocityX(0);
            this.self.player.setVelocityY(0);

            this.self.player.anims.play('stopright');
        }
    }
    dropBomb() {
        const gridCol = Math.round((this.self.player.x - this.self.Wall.centerX) / this.self.wallDim);
        const gridRow = Math.round((this.self.player.y - this.self.Wall.adjustwall) / this.self.wallDim);

        //Convert grid coordinates to pixel
        const gridX = this.self.Wall.centerX + gridCol * this.self.wallDim;
        const gridY = this.self.Wall.adjustwall + gridRow * this.self.wallDim;

        //check bomb limit
        if (this.self.bombLocation.length >= this.self.bombLimit) {
            console.log("bomb exceed limit");
            return;
        }

        //check duplicate position
        if (this.self.bombLocation.some(bomb => bomb.x === gridX && bomb.y === gridY)) {
            console.log("location taken");
            return;
        }

        let bomb = new Bomb(this.self, gridX, gridY, gridCol, gridRow)
        bomb.createBomb()
    }
    handlePlayerBomb() {
        if (Phaser.Input.Keyboard.JustDown(this.self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A))) {
            console.log("GO")
            this.self.dropBomb()
        }
    }
}

export default Player