class Wall {

    constructor(self) {
        this.self = self

        // total playfield width
        this.totalWidth = this.self.cols * this.self.wallDim;

        // center horizontally
        this.centerX = (this.self.sys.game.config.width - this.totalWidth) / 2;

        // keep walls at the top (no vertical centering)
        this.adjustwall = 31;

        // "rightmost" and "bottommost" coordinates
        this.width = this.centerX + ((this.self.cols - 1) * this.self.wallDim);
        this.height = this.adjustwall + (this.self.rows * this.self.wallDim);

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
            //wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
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
            //wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
    createInsideWalls() {
        this.self.insidewall = this.self.physics.add.group({ immovable: true });
        let xValue = this.centerX + this.self.wallDim
        for (let col = 1; col < this.self.cols - 1; col++) {
            let adjustinsidewall = this.adjustwall + this.self.wallDim
            for (let row = 1; row < this.self.rows; row++) {
                if ((col == 3 && row == 2) || (col == 4 && row == 2) || (col == 3 && row == 3) ||
                    (col == 3 && row == 5) || (col == 3 && row == 6) || (col == 4 && row == 6) ||
                    (col == 9 && row == 2) || (col == 9 && row == 3) || (col == 8 && row == 2) ||
                    (col == 9 && row == 5) || (col == 9 && row == 6) || (col == 8 && row == 6) ||
                    (col == 5 && row == 4) || (col == 6 && row == 4) || (col == 7 && row == 4))
                {
                    let wall = this.self.insidewall.create(xValue, adjustinsidewall, 'unbrkwall');
                    this.self.unbrkWallList.push({ "x": xValue, "y": adjustinsidewall })
                    //wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
                    wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
                }
                adjustinsidewall += this.self.wallDim;
            }
            xValue += this.self.wallDim
        }
    }
    createRightWalls() {
        let adjustwallRight = this.adjustwall + this.self.wallDim
        let xValueRight = this.width
        this.self.rightwall = this.self.physics.add.group({ immovable: true });

        for (let nn = 0; nn < this.self.rows - 1; nn++) {
            let wall = this.self.rightwall.create(xValueRight, adjustwallRight, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": xValueRight, "y": adjustwallRight })
            adjustwallRight += this.self.wallDim;
            //wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
    createBottomWalls() {
        this.self.bottomwall = this.self.physics.add.group({ immovable: true });
        let adjustbottomwall = this.height;
        let xValueBottom = this.centerX

        for (let nn = 1; nn <= this.self.cols; nn++) {
            let wall = this.self.bottomwall.create(xValueBottom, adjustbottomwall, 'unbrkwall');
            this.self.unbrkWallList.push({ "x": xValueBottom, "y": adjustbottomwall })
            xValueBottom += this.self.wallDim;
            //wall.body.setSize(this.self.wallDimx, this.self.wallDimy);
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
        }
    }
}



export default Wall