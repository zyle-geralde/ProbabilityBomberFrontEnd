
class Player {

    constructor(self) {
        this.self = self
        this.x = 550
        this.y = 70
        this.speed = 150
        

    }
    createPlayer() {
        this.self.player = this.self.physics.add.sprite(this.x, this.y, 'character');
        this.self.player.body.setSize(30, 50);
        this.self.player.setDisplaySize(40, 40);
        this.self.player.setCollideWorldBounds(true);
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
}

export default Player