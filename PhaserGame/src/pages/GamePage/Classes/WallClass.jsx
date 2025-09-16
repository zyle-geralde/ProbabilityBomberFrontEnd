class Wall {

    constructor(self) {
        this.self = self
        this.adjustwall = 31 + this.self.wallDim
        this.centerX = 50
        this.width = this.centerX + ((this.self.cols - 1) * this.self.wallDim )

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

        //this.self.brkWallGroup = self.physics.add.group({ immovable: true })

        for (let nn = 1; nn <= this.self.cols - 1; nn++) {
            let wall = this.self.topwall.create(xValue, adjusttopwall, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": xValue, "y": adjusttopwall })
            xValue += this.self.wallDim;
            wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
    createInsideWalls() {
        this.self.insidewall = this.self.physics.add.group({ immovable: true });
        let xValue = this.centerX + this.self.wallDim
        for (let col = 1; col < this.self.cols -1 ; col++) {
            if (col % 2 == 0) {
                let adjustinsidewall = this.adjustwall + this.self.wallDim
                for (let row = 1; row < this.self.rows; row++) {
                    if (row % 2 == 0) {
                        let wall = this.self.insidewall.create(xValue, adjustinsidewall, 'unbrkwall');
                        this.self.unbrkWallList.push({ "x": xValue, "y": adjustinsidewall })
                        wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
                        wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
                    }
                    adjustinsidewall += this.self.wallDim;
                }
            }
            xValue+=this.self.wallDim
        }
    }
    createRightWalls() {
        let adjustwallleft = this.adjustwall + this.self.wallDim
        let xValueleft = this.width
        this.self.outsidewall = this.self.physics.add.group({ immovable: true });

        for (let nn = 0; nn < this.self.rows - 1; nn++) {
            let wall = this.self.outsidewall.create(xValueleft, adjustwallleft, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": xValueleft, "y": adjustwallleft })
            adjustwallleft += this.self.wallDim;
            wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
}

/*const leftWall = new Wall(self)
                            leftWall.createLeftWalls()*/

export default Wall