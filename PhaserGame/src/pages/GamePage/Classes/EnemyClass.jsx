class Enemy {
    constructor(self, x, y, col, row, texture, enemyType) {
        this.self = self;
        this.gridX = x;
        this.gridY = y;
        this.gridCol = col;
        this.gridRow = row;
        this.texture = texture;
        this.enemy = null;
        this.enemySize = this.self.wallDim - 7;
        this.enemyType = enemyType
    }
    createEnemy() {
        this.enemy = this.self.enemyGroup.create(this.gridX, this.gridY, this.texture);
        this.enemy.setDisplaySize(this.enemySize, this.enemySize);

        //Start fully transparent
        this.enemy.setAlpha(0);

        //Fade in effect
        this.self.tweens.add({
            targets: this.enemy,
            alpha: 1,
            duration: 100,
            ease: 'Linear'
        });

    }


}

export default Enemy