import Item from "./ItemClass";
import Enemy from "./EnemyClass";

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

        //stores a json format fo rows and cols Ex. {rows:30, cols:30}
        this.insideWallDimension = null

    }
    assignInsideWallDimension() {
        if (this.self.stage == 1) {
            this.insideWallDimension = [{ "col": 3, "row": 2 }, { "col": 4, "row": 2 }, { "col": 3, "row": 3 }, { "col": 3, "row": 5 },
            { "col": 3, "row": 6 }, { "col": 4, "row": 6 }, { "col": 9, "row": 2 }, { "col": 9, "row": 3 }, { "col": 8, "row": 2 },
            { "col": 9, "row": 5 }, { "col": 9, "row": 6 }, { "col": 8, "row": 6 }, { "col": 5, "row": 4 }, { "col": 6, "row": 4 },
            { "col": 7, "row": 4 }]
        }
        else {
            //To be placed
        }
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
        //assign key value pairs of inside breakable walls
        this.assignInsideWallDimension()

        console.log(this.insideWallDimension)
        this.self.insidewall = this.self.physics.add.group({ immovable: true });
        let xValue = this.centerX + this.self.wallDim
        for (let col = 1; col < this.self.cols - 1; col++) {
            let adjustinsidewall = this.adjustwall + this.self.wallDim
            for (let row = 1; row < this.self.rows; row++) {
                if (this.insideWallDimension.some(w => w.col === col && w.row === row)) {
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
    createRandomInsideWalls(count = 6) {
        if (!this.insideWallDimension) {
            this.assignInsideWallDimension();
        }
        //Get player current grid position
        const playerCol = Math.round((this.self.player.x - this.centerX) / this.self.wallDim);
        const playerRow = Math.round((this.self.player.y - this.adjustwall) / this.self.wallDim);

        //Build a list of free positions
        let availablePositions = [];
        for (let col = 1; col < this.self.cols - 1; col++) {
            for (let row = 1; row < this.self.rows; row++) {
                const alreadyHasWall = this.insideWallDimension.some(w => w.col === col && w.row === row);
                const isPlayerHere = (col === playerCol && row === playerRow);

                const coordinateList = [[5, 3], [7, 3], [6, 5], [4, 4], [8, 4]]
                const isInCoordinateList = coordinateList.some(([c, r]) => c === col && r === row);

                if (!alreadyHasWall && !isPlayerHere && !isInCoordinateList) {
                    availablePositions.push({ col, row });
                }
            }
        }

        if (availablePositions.length === 0) {
            console.warn("No free positions available to place walls.");
            return;
        }

        //Shuffle available positions
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        //Pick up to "count" positions
        const chosenPositions = availablePositions.slice(0, count);

        //Assign physics
        this.self.breakablewall = this.self.physics.add.group({ immovable: true });
        //Place walls
        chosenPositions.forEach(({ col, row }) => {
            const xValue = this.centerX + col * this.self.wallDim;
            const yValue = this.adjustwall + row * this.self.wallDim;
            let wall = this.self.breakablewall.create(xValue, yValue, 'brkwall');
            this.self.brkWallList.push({ x: xValue, y: yValue });
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);

            console.log(`Random wall placed at col: ${col}, row:${row}`);
        });
    }

    createRandomItems(count = 5) {
        let attempts = 0;
        let placed = 0;

        while (placed < count && attempts < 500) {
            attempts++;

            //random col/row inside bounds
            const col = Phaser.Math.Between(1, this.self.cols - 2);
            const row = Phaser.Math.Between(1, this.self.rows - 2);

            const gridX = this.centerX + col * this.self.wallDim;
            const gridY = this.adjustwall + row * this.self.wallDim;

            //check overlap with unbreakable & breakable walls
            const overlapWall =
                this.self.unbrkWallList.some(w => w.x === gridX && w.y === gridY) ||
                this.self.brkWallList.some(w => w.x === gridX && w.y === gridY);

            //check overlap with player
            const playerCol = Math.round((this.self.player.x - this.centerX) / this.self.wallDim);
            const playerRow = Math.round((this.self.player.y - this.adjustwall) / this.self.wallDim);
            const overlapPlayer = (col === playerCol && row === playerRow);

            //check overlap with existing items
            const overlapItem = this.self.itemLocation.some(i => i.x === gridX && i.y === gridY);

            if (!overlapWall && !overlapPlayer && !overlapItem) {
                //random texture
                const textures = ["explodeItem", "shieldItem", "bootsItem", "heartItem"];
                const texture = Phaser.Utils.Array.GetRandom(textures);

                const item = new Item(this.self, gridX, gridY, col, row, texture);
                item.create();

                placed++;
            }
        }

        if (placed < count) {
            console.warn(`Only placed ${placed} items after ${attempts} attempts.`);
        }
    }
    createStartingEnemies() {

        const col = 5;
        const row = 3;

        const gridX = this.centerX + col * this.self.wallDim;
        const gridY = this.adjustwall + row * this.self.wallDim;
        const colList = [5, 7, 6, 4, 8]
        const rowList = [3, 3, 5, 4, 4]
        const gridXList = [this.centerX + colList[0] * this.self.wallDim, this.centerX + colList[1] * this.self.wallDim, this.centerX + colList[2] * this.self.wallDim, this.centerX + colList[3] * this.self.wallDim, this.centerX + colList[4] * this.self.wallDim]
        const gridYList = [this.adjustwall + rowList[0] * this.self.wallDim, this.adjustwall + rowList[1] * this.self.wallDim, this.adjustwall + rowList[2] * this.self.wallDim, this.adjustwall + rowList[3] * this.self.wallDim, this.adjustwall + rowList[4] * this.self.wallDim]

        for (var enemyLoop = 0; enemyLoop < this.self.enemyLimit; enemyLoop++) {
            const enemySpawn = new Enemy(this.self, gridXList[enemyLoop], gridYList[enemyLoop], colList[enemyLoop], rowList[enemyLoop], "ghost", 1);

            enemySpawn.createEnemy()
            enemySpawn.enemy.setData("ref", enemySpawn);
        }

    }
    startItemSpawnLoop(interval = 7000) {
        this.self.time.addEvent({
            delay: interval, //every 7 seconds
            callback: () => {
                if (this.self.itemLocation.length < this.self.itemLimit) {
                    this.createRandomItems(1); //create 1 item only
                }
            },
            callbackScope: this,
            loop: true,
        });
    }



}



export default Wall