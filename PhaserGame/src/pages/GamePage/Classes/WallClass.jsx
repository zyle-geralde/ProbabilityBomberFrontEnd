class Wall {

    constructor(self) {
        this.self = self
        this.adjustwall = 31 + this.self.wallDim
        this.centerX = 50

    }
    createLeftWalls() {
        //For centering

        let adjustwallleft = this.adjustwall
        let xValueleft = this.centerX
        this.self.outsidewall = this.self.physics.add.group({ immovable: true });

        for (let nn = 0; nn < this.self.rows; nn++) {
            let wall = this.self.outsidewall.create(xValueleft, adjustwallleft, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": xValueleft, "y": adjustwallleft })
            adjustwallleft += this.self.wallDim;
            wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
    createTopWalls() {
        this.self.topwall = this.self.physics.add.group({ immovable: true });
        let adjusttopwall = this.adjustwall;
        let xValue = this.centerX + this.self.wallDim 
        let skipColumn = false;

        //this.self.brkWallGroup = self.physics.add.group({ immovable: true })

        for (let nn = 1; nn <= this.self.cols - 1; nn++) {
            let wall = this.self.topwall.create(xValue, adjusttopwall, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": xValue, "y": adjusttopwall })
            xValue += this.self.wallDim;
            wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
}

/*const leftWall = new Wall(self)
                            leftWall.createLeftWalls()*/

export default Wall