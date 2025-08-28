class Wall {

    constructor(self) {
        this.self = self
    }
    createLeftWalls() {
        this.self.outsidewall = this.self.physics.add.group({ immovable: true });
        let adjustwall = this.self.wallDim;
        for (let nn = 0; nn < this.self.rows; nn++) {
            let wall = this.self.outsidewall.create(0, adjustwall, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": 0, "y": adjustwall })
            adjustwall += this.self.wallDim;
            wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
}

/*const leftWall = new Wall(self)
                            leftWall.createLeftWalls()*/

export default Wall