import Item from "./ItemClass";
import Enemy from "./EnemyClass";
import { addUserStageInfo } from "../../../hooks/UseStageInfo";

class Wall {

    constructor(self) {
        this.self = self

        // total playfield width
        this.totalWidth = this.self.cols * this.self.wallDim;

        // center horizontally
        this.centerX = (this.self.sys.game.config.width - this.totalWidth) / 2;

        // keep walls at the top (no vertical centering)
        //31 orig
        this.adjustwall = this.self.bottomBannerHeight + this.self.bottomBannerY - 1;

        // "rightmost" and "bottommost" coordinates
        this.width = this.centerX + ((this.self.cols - 1) * this.self.wallDim);
        this.height = this.adjustwall + (this.self.rows * this.self.wallDim);

        //stores a json format fo rows and cols Ex. {rows:30, cols:30}
        this.insideWallDimension = null
        this.displayStar1 = null
        this.displayStar2 = null
        this.displayStar3 = null


    }
    createBackground() {
        const tileSize = 120;
        const cols = Math.ceil(this.self.sys.game.config.width / tileSize);
        const rows = Math.ceil(this.self.sys.game.config.height / tileSize);

        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                // alternate between background1 and background2
                const texture = this.self.stage == 1 ? "background2" : this.self.stage == 2? "backgroundStage2":"backgroundStage3";
                const x = col * tileSize + tileSize / 2;
                const y = row * tileSize + tileSize / 2;

                this.self.add.image(x, y, texture).setDisplaySize(tileSize, tileSize);
            }
        }
    }
    createFinishPage() {
        // Disable inputs
        this.self.allowInputs = false;
        this.self.input.keyboard.enabled = false;
        //this.self.input.enabled = false;

        // Create a full screen black rectangle (initially invisible)
        const overlay = this.self.add.graphics();
        overlay.fillStyle(0x000000, 1); // full black
        overlay.fillRect(0, 0, this.self.sys.game.config.width, this.self.sys.game.config.height);
        overlay.setAlpha(0); // start transparent

        // Put overlay above everything else
        overlay.setScrollFactor(0);
        overlay.setDepth(9999);

        addUserStageInfo(this.self.stage,this.self.pointCount,(Math.floor(this.self.Timer.elapsedMs / 1000)),this.self.numberOfStars)

        const { width, height } = this.self.scale;

        // Tween fade-in effect
        this.self.tweens.add({
            targets: overlay,
            alpha: 0.7,          // final opacity
            duration: 2000,       // fade-in time (ms)
            ease: 'Power2',      // easing curve
            delay: 1000,
            onComplete: () => {
                //Final Banner
                const leftBanner = this.self.add.image((width / 2) - 150, height / 2 - 150, "leftFinalBanner")
                    .setOrigin(0.5).setDepth(10050).setDisplaySize(100, 150).setAlpha(0);
                const middleBanner = this.self.add.image(width / 2, height / 2 - 150, "middleFinalBanner")
                    .setOrigin(0.5).setDepth(10050).setDisplaySize(200, 150).setAlpha(0);
                const rightBanner = this.self.add.image((width / 2) + 150, height / 2 - 150, "rightFinalBanner")
                    .setOrigin(0.5).setDepth(10050).setDisplaySize(100, 150).setAlpha(0);

                //Congrats text
                const congratsText = this.self.add.text((width / 2), height / 2 - 150, '🎉 Great Job 🎉', {
                    fontSize: '36px',
                    fill: '#ffffff',
                    fontStyle: 'bold'
                }).setOrigin(0.5).setDepth(10051).setAlpha(0);

                //display image
                const tileDisplay = this.self.add.image(width / 2, height / 2 + 35, this.self.stage == 1?"tileDisplay": this.self.stage == 2?"titleDisplayStage2":"titleDisplayStage3")
                    .setOrigin(0.5).setDepth(10049).setDisplaySize(450, 410).setAlpha(0);

                //star display
                const star_size = 50;
                const star1 = this.self.numberOfStars >= 1 ?
                    this.self.add.image((width / 2) - (star_size + 10), height / 2 - 15, "fullStar") :
                    this.self.add.image((width / 2) - (star_size + 10), height / 2 - 15, "halfStar");
                star1.setOrigin(0.5).setDepth(10050).setDisplaySize(star_size, star_size).setAlpha(0);

                const star2 = this.self.numberOfStars >= 2 ?
                    this.self.add.image((width / 2), height / 2 - 45, "fullStar") :
                    this.self.add.image((width / 2), height / 2 - 45, "halfStar");
                star2.setOrigin(0.5).setDepth(10050).setDisplaySize(star_size, star_size).setAlpha(0);

                const star3 = this.self.numberOfStars >= 3 ?
                    this.self.add.image((width / 2) + (star_size + 10), height / 2 - 15, "fullStar") :
                    this.self.add.image((width / 2) + (star_size + 10), height / 2 - 15, "halfStar");
                star3.setOrigin(0.5).setDepth(10050).setDisplaySize(star_size, star_size).setAlpha(0);

                //Points display
                const pointsText = this.self.add.text((width / 2), (height / 2) + star_size - 25, this.self.pointCount, {
                    fontSize: '48px',
                    fill: this.self.stage == 1?'#ffffff':"#000000",
                    fontStyle: 'bold'
                }).setOrigin(0.5).setDepth(10051).setAlpha(0);

                //Duration count
                const gameDuration = this.self.Timer.getElapsedTime();
                const gameDurationText = this.self.add.text((width / 2), (height / 2) + star_size + 35, gameDuration, {
                    fontSize: '48px',
                    fill: this.self.stage == 1?'#ffffff':"#000000",
                    fontStyle: 'bold'
                }).setOrigin(0.5).setDepth(10051).setAlpha(0);

                //Back button disp
                const backGameButtonDips = this.self.add.image((width / 2), height / 2 + 155, this.self.stage == 1?"unbrkwall":"unbrkableWallStage2")
                    .setOrigin(0.5).setDepth(10050).setDisplaySize(150, star_size).setAlpha(0).setInteractive({ useHandCursor: true });

                //Back button
                const backButtonText = this.self.add.text((width / 2), (height / 2) + star_size + 105, "Back", {
                    fontSize: '24px',
                    fill: '#000000',
                    fontStyle: 'bold'
                }).setOrigin(0.5).setDepth(10051).setAlpha(0).setInteractive({ useHandCursor: true });


                // 🎬 Fade in all UI together
                this.self.tweens.add({
                    targets: [
                        leftBanner, middleBanner, rightBanner,
                        congratsText, tileDisplay,
                        star1, star2, star3,
                        pointsText, gameDurationText,
                        backGameButtonDips, backButtonText
                    ],
                    alpha: 1,
                    duration: 800,
                    ease: 'Power2'
                });

            }
        });
    }

    assignInsideWallDimension() {
        if (this.self.stage == 1) {
            this.insideWallDimension = [{ "col": 3, "row": 2 }, { "col": 4, "row": 2 }, { "col": 3, "row": 3 }, { "col": 3, "row": 5 },
            { "col": 3, "row": 6 }, { "col": 4, "row": 6 }, { "col": 9, "row": 2 }, { "col": 9, "row": 3 }, { "col": 8, "row": 2 },
            { "col": 9, "row": 5 }, { "col": 9, "row": 6 }, { "col": 8, "row": 6 }, { "col": 5, "row": 4 }, { "col": 6, "row": 4 },
            { "col": 7, "row": 4 }]

            //Modified version, try this later after expansion
            /* this.insideWallDimension = [{ "col": 3, "row": 2 }, { "col": 4, "row": 2 },
            { "col": 3, "row": 6 }, { "col": 4, "row": 6 }, { "col": 9, "row": 2 }, { "col": 8, "row": 2 },
            { "col": 9, "row": 6 }, { "col": 8, "row": 6 }, { "col": 5, "row": 4 },
            { "col": 7, "row": 4 }]*/
        }
        else if (this.self.stage == 2){
            //To be placed
            this.insideWallDimension = [ { "col": 4, "row": 2 }, { "col": 3, "row": 3 }, { "col": 3, "row": 5 },
             { "col": 4, "row": 6 }, { "col": 9, "row": 3 }, { "col": 8, "row": 2 },
            { "col": 9, "row": 5 }, { "col": 8, "row": 6 }, { "col": 5, "row": 4 },
            { "col": 7, "row": 4 }]
        }
        else if (this.self.stage == 3) {
             this.insideWallDimension = [ { "col": 5, "row": 2 }, { "col": 2, "row": 3 }, { "col": 3, "row": 5 },
             { "col": 5, "row": 6 }, { "col": 10, "row": 3 }, { "col": 7, "row": 2 },
            { "col": 9, "row": 5 }, { "col": 7, "row": 6 }, { "col": 5, "row": 4 },
            { "col": 7, "row": 4 }]
        }
    }
    createLeftWalls() {
        //For centering

        let adjustwallleft = this.adjustwall
        let xValueleft = this.centerX
        this.self.outsidewall = this.self.physics.add.group({ immovable: true });

        for (let nn = 0; nn < this.self.rows; nn++) {
            let wall = this.self.outsidewall.create(xValueleft, adjustwallleft, this.self.stage == 1?'unbrkwall':this.self.stage == 2?"unbrkableWallStage2":"unbrkableWallStage3");
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
            let wall = this.self.topwall.create(xValue, adjusttopwall, this.self.stage == 1?'unbrkwall':this.self.stage == 2?"unbrkableWallStage2":"unbrkableWallStage3");
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
                    let wall = this.self.insidewall.create(xValue, adjustinsidewall, this.self.stage == 1?'unbrkwall':this.self.stage == 2?"unbrkableWallStage2":"unbrkableWallStage3");
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
            let wall = this.self.rightwall.create(xValueRight, adjustwallRight, this.self.stage == 1?'unbrkwall':this.self.stage == 2?"unbrkableWallStage2":"unbrkableWallStage3");
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
            let wall = this.self.bottomwall.create(xValueBottom, adjustbottomwall, this.self.stage == 1?'unbrkwall':this.self.stage == 2?"unbrkableWallStage2":"unbrkableWallStage3");
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

        const playerCol = Math.round((this.self.player.x - this.centerX) / this.self.wallDim);
        const playerRow = Math.round((this.self.player.y - this.adjustwall) / this.self.wallDim);

        //Build a list of free positions
        let availablePositions = [];
        for (let col = 1; col < this.self.cols - 1; col++) {
            for (let row = 1; row < this.self.rows; row++) {
                const alreadyHasWall = this.insideWallDimension.some(w => w.col === col && w.row === row);
                const isPlayerHere = (col === playerCol && row === playerRow);

                const coordinateList = [[5, 3], [7, 3], [6, 5], [4, 4], [8, 4]];
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

        // Shuffle positions
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        // Pick up to "count" positions
        const chosenPositions = availablePositions.slice(0, count);

        // Copy probability numbers so we don’t mutate the original
        let availableNumbers = [...this.self.probabilityNumbers];

        // Shuffle the numbers for randomness
        for (let i = availableNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
        }

        this.self.breakablewall = this.self.physics.add.group({ immovable: true });

        chosenPositions.forEach(({ col, row }, index) => {
            if (availableNumbers.length === 0) {
                console.warn("Ran out of unique numbers to assign.");
                return;
            }

            const xValue = this.centerX + col * this.self.wallDim;
            const yValue = this.adjustwall + row * this.self.wallDim;

            // Get and remove a unique number
            const randomNum = availableNumbers.pop();

            // Create wall
            let wall = this.self.breakablewall.create(xValue, yValue, this.self.stage == 1?"brkwall":this.self.stage == 2?"brkableWallStage2":"brkableWallStage3");
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);

            // Store with unique number
            this.self.brkWallList.push({ x: xValue, y: yValue, value: randomNum });

            // Add number overlay
            const wallText = this.self.add.text(xValue, yValue, randomNum, {
                fontSize: "27px",
                color: "#ffffffff",
                fontStyle: "bold",
                stroke: "#000000",    // black outline
                strokeThickness: 3    // thickness of stroke
            }).setOrigin(0.5);
            wallText.setDepth(1);

            if (!this.self.wallTextGroup) {
                this.self.wallTextGroup = this.self.add.group();
            }
            this.self.wallTextGroup.add(wallText);

            this.self.physics.add.existing(wallText);
            wallText.body.setSize(30, 30); // match text size
            wallText.body.setImmovable(true);

            console.log(`Wall at col:${col}, row:${row} with unique value=${randomNum}`);
        });
    }

    createRandomInsideWallsEnemyAdjustment(count = 6) {
        if (!this.insideWallDimension) {
            this.assignInsideWallDimension();
        }

        const playerCol = Math.round((this.self.player.x - this.centerX) / this.self.wallDim);
        const playerRow = Math.round((this.self.player.y - this.adjustwall) / this.self.wallDim);

        //Build a list of free positions
        let availablePositions = [];
        for (let col = 1; col < this.self.cols - 1; col++) {
            for (let row = 1; row < this.self.rows; row++) {
                const alreadyHasWall = this.insideWallDimension.some(w => w.col === col && w.row === row);
                const isPlayerHere = (col === playerCol && row === playerRow);

                const coordinateList = [[5, 3], [7, 3], [6, 5], [4, 4], [8, 4]];
                const isInCoordinateList = coordinateList.some(([c, r]) => c === col && r === row);

                //check enemy overlap
                const gridX = this.centerX + col * this.self.wallDim;
                const gridY = this.adjustwall + row * this.self.wallDim;

                let isEnemyHere = false;

                if (this.self.enemyGroup) {
                    this.self.enemyGroup.getChildren().forEach(enemy => {
                        if (Math.round((enemy.x - this.centerX) / this.self.wallDim) === col &&
                            Math.round((enemy.y - this.adjustwall) / this.self.wallDim) === row) {
                            isEnemyHere = true;
                        }
                    });
                }

                if (this.self.advanceEnemyGroup) {
                    this.self.advanceEnemyGroup.getChildren().forEach(enemy => {
                        if (Math.round((enemy.x - this.centerX) / this.self.wallDim) === col &&
                            Math.round((enemy.y - this.adjustwall) / this.self.wallDim) === row) {
                            isEnemyHere = true;
                        }
                    });
                }

                if (!alreadyHasWall && !isPlayerHere && !isInCoordinateList && !isEnemyHere) {
                    availablePositions.push({ col, row });
                }
            }
        }

        if (availablePositions.length === 0) {
            console.warn("No free positions available to place walls.");
            return;
        }

        // Shuffle positions
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
        }

        // Pick up to "count" positions
        const chosenPositions = availablePositions.slice(0, count);

        // Copy probability numbers so we don’t mutate the original
        let availableNumbers = [...this.self.probabilityNumbers];

        // Shuffle the numbers for randomness
        for (let i = availableNumbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
        }

        this.self.breakablewall = this.self.physics.add.group({ immovable: true });

        chosenPositions.forEach(({ col, row }, index) => {
            if (availableNumbers.length === 0) {
                console.warn("Ran out of unique numbers to assign.");
                return;
            }

            const xValue = this.centerX + col * this.self.wallDim;
            const yValue = this.adjustwall + row * this.self.wallDim;

            // Get and remove a unique number
            const randomNum = availableNumbers.pop();

            // Create wall
            let wall = this.self.breakablewall.create(xValue, yValue,  this.self.stage == 1?"brkwall":this.self.stage == 2?"brkableWallStage2":"brkableWallStage3");
            wall.setDisplaySize(this.self.wallDim, this.self.wallDim);
            wall.setAlpha(0); // start invisible

            // Store with unique number
            this.self.brkWallList.push({ x: xValue, y: yValue, value: randomNum });

            // Add number overlay
            const wallText = this.self.add.text(xValue, yValue, randomNum, {
                fontSize: "27px",
                color: "#ffffffff",
                fontStyle: "bold",
                stroke: "#000000",    //black outline
                strokeThickness: 3    //thickness of stroke
            }).setOrigin(0.5);
            wallText.setDepth(1);

            wallText.setAlpha(0);

            if (!this.self.wallTextGroup) {
                this.self.wallTextGroup = this.self.add.group();
            }
            this.self.wallTextGroup.add(wallText);

            this.self.physics.add.existing(wallText);
            wallText.body.setSize(30, 30); // match text size
            wallText.body.setImmovable(true);

            this.self.tweens.add({
                targets: [wall, wallText],
                alpha: { from: 0, to: 1 },
                duration: 100,
                ease: "Linear"
            });

            console.log(`Wall at col:${col}, row:${row} with unique value=${randomNum}`);
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

        for (var enemyLoop = 0; enemyLoop < this.self.enemyStartingLimit; enemyLoop++) {
            const enemySpawn = new Enemy(this.self, gridXList[enemyLoop], gridYList[enemyLoop], colList[enemyLoop], rowList[enemyLoop], "ghost", 1);

            enemySpawn.createEnemy()
            enemySpawn.enemy.setData("ref", enemySpawn);
        }

    }
    createSingleEnemies(count = 1, enemyLevel = 1) {
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


            if (!overlapWall && !overlapPlayer) {
                //random texture
                /*const textures = ["explodeItem", "shieldItem", "bootsItem", "heartItem"];
                const texture = Phaser.Utils.Array.GetRandom(textures);*/

                const enemyImageList = ["ghost", "fastenemy", "advanceenemy"]
                const enemySpawn = new Enemy(this.self, gridX, gridY, col, row, enemyImageList[enemyLevel - 1], enemyLevel);

                enemySpawn.createEnemy()
                enemySpawn.enemy.setData("ref", enemySpawn);

                placed++;
            }
        }

        if (placed < count) {
            console.warn(`Only placed ${placed} items after ${attempts} attempts.`);
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
    startEnemySpawnLoop(interval = 7000) {
        this.self.time.addEvent({
            delay: interval, //every 7 seconds
            callback: () => {
                // this.self.enemyLimit
                if (this.self.enemyGroup.getChildren().length + this.self.advanceEnemyGroup.getChildren().length < this.self.enemyLimit) {
                    const randomEnemyType = this.self.availableEnemyList[Math.floor(Math.random() * this.self.availableEnemyList.length)];
                    this.createSingleEnemies(1, randomEnemyType);

                }
            },
            callbackScope: this,
            loop: true,
        });
    }



}



export default Wall