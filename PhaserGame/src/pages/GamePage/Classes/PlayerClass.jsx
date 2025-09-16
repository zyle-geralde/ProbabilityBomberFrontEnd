class Player {

    constructor(self) {
        this.self = self
        this.x = 60
        this.y = 70

    }
    createPlayer() {
        this.self.player = this.self.physics.add.sprite(this.x, this.y, 'character');
        this.self.player.body.setSize(40,40);
        this.self.player.setDisplaySize(40,40);
        this.self.player.setCollideWorldBounds(true);
    }
}

export default Player