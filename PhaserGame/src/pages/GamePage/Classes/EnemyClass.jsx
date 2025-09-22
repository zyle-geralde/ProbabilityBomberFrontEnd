class Enemy {
    constructor(self, x, y, col, row, texture, enemyType) {
        this.self = self;
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col;
        this.gridRow = row;
        this.texture = texture;
        this.enemy = null;
        this.enemySize = this.self.wallDim - 10;
        this.enemyType = enemyType

        this.speed = 50;
        this.direction = Phaser.Utils.Array.GetRandom(["up", "down", "left", "right"]);
    }
    createEnemy() {
        this.enemy = this.self.enemyGroup.create(this.gridX, this.gridY, this.texture);
        this.enemy.setDisplaySize(this.enemySize, this.enemySize);
        this.enemy.setDepth(1002);

        //Start fully transparent
        this.enemy.setAlpha(0);

        //Fade in effect
        this.self.tweens.add({
            targets: this.enemy,
            alpha: 1,
            duration: 100,
            ease: 'Linear'
        });

        this.setVelocityByDirection();

    }

    setVelocityByDirection() {
        switch (this.direction) {
            case "up":
                this.enemy.setVelocity(0, -this.speed);
                break;
            case "down":
                this.enemy.setVelocity(0, this.speed);
                break;
            case "left":
                this.enemy.setVelocity(-this.speed, 0);
                break;
            case "right":
                this.enemy.setVelocity(this.speed, 0);
                break;
        }
    }

    changeDirection() {

        const newDirections = ["up", "down", "left", "right"].filter(d => d !== this.direction);
        this.direction = Phaser.Utils.Array.GetRandom(newDirections);

        this.setVelocityByDirection();
    }


}

export default Enemy