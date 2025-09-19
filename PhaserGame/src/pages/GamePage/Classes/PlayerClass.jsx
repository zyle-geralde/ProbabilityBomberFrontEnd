import Bomb from "./BombClass"
class Player {

    constructor(self, Wall) {
        this.self = self
        this.x = 550
        this.y = 70
        this.speed = 150
        this.Wall = Wall

        this.shieldSprite = null;
        this.shieldTimer = null;
        this.shieldTween = null;
    }
    createPlayer() {
        this.self.player = this.self.physics.add.sprite(this.x, this.y, 'character');
        this.self.player.body.setSize(30, 50);
        this.self.player.setDisplaySize(40, 40);
        this.self.player.setCollideWorldBounds(true);

        //Make sure that player always come on top
        this.self.player.setDepth(1000);
    }

    activateShield(duration = 5000) {

        if (this.shieldTimer) {
            //remove the scheduled event from the Time manager
            try {
                this.self.time.removeEvent(this.shieldTimer);
                console.log("Timer Removed")
            } catch (e) {
                //fallback: if removeEvent isn't available, try to call remove on the timer
                if (typeof this.shieldTimer.remove === 'function') {
                    this.shieldTimer.remove();
                }
            }
            this.shieldTimer = null;
        }

        //stop previous tween if exists
        if (this.shieldTween) {
            try { this.shieldTween.stop(); } catch (e) {}
            this.shieldTween = null;
            console.log("Tween removed")
        }
        //If already has shield, reset timer
        if (this.shieldSprite) {
            this.shieldSprite.destroy();
            this.shieldSprite = null;
        }

        // Create shield sprite around the player
        this.shieldSprite = this.self.add.sprite(this.self.player.x, this.self.player.y, 'shield');
        this.shieldSprite.setScale(0.6);
        this.shieldSprite.setDisplaySize(this.self.wallDim - 15, this.self.wallDim - 15);
        this.shieldSprite.setDepth(1001); // above player

        this.shieldTween = this.self.tweens.add({
            targets: this.shieldSprite,
            alpha: { from: 1, to: 0.5 },
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Destroy after duration
        this.shieldTimer = this.self.time.delayedCall(duration, () => {
            if (this.shieldSprite) {
                this.shieldSprite.destroy();
                this.shieldSprite = null;
                console.log("Shield expired");
            }
            if (this.shieldTween) {
                try { this.shieldTween.stop(); } catch (e) {}
                this.shieldTween = null;
                console.log("Tween Removed")
            }
            this.shieldTimer = null;
            console.log("Timer Removed")
        });
    }

    //Keep shield following player
    updateShield() {
        if (this.shieldSprite) {
            this.shieldSprite.x = this.self.player.x;
            this.shieldSprite.y = this.self.player.y;
        }
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
    handlePlayerHit() {
        this.self.player.isHit = true; //Prevent repeated triggers during animation

        this.self.tweens.add({
            targets: this.self.player,
            tint: { from: 0xffffff, to: 0xff0000 }, // normal to red
            duration: 200,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                this.self.player.clearTint();

            }
        });

        this.self.time.delayedCall(3000, () => {
            this.self.player.isHit = false;
            console.log("Player can be hit again");
        });
    }
}

export default Player