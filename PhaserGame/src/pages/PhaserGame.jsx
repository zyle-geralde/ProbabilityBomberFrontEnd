import React, { useEffect, useRef } from 'react';

function PhaserGame() {
    const gameRef = useRef(null);
    const gameInstance = useRef(null);

    useEffect(() => {
        if (window.Phaser && !gameInstance.current) {
            const config = {
                type: window.Phaser.AUTO,
                width: window.innerWidth,
                height: window.innerHeight,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0 },
                        debug: false,
                    },
                },
                scene: {
                    preload: function () {
                        this.load.image('ground', 'images/background-whiteArtboard 1.png');
                        this.load.image('unbrkwall', 'images/unbreakable-WallArtboard 1.png');
                        this.load.image('brkwall', 'images/breakable-WallArtboard 1.png')
                        this.load.image('bomb', 'images/bomb.png')
                        this.load.image('bombItem', 'images/bombItem.png')
                        this.load.image('explodeItem', 'images/explodeItem.png')
                        this.load.image('shieldItem', 'images/shieldItem.png')
                        this.load.image('bootsItem', 'images/bootsItem.png')
                        this.load.image('heartItem', 'images/heartItem.png')
                        this.load.image('deathItem', 'images/deathItem.png')
                        this.load.image('explode', 'images/explode.png')
                        this.load.image('ghost', 'images/ghost.png')
                        this.load.image('heart', 'images/heart.png')
                        this.load.image('shield', 'images/defence.png')
                        this.load.image('boots', 'images/speed.png')
                        this.load.image('heartFixed', 'images/heartFixed.png')
                        this.load.image('explodeFixed', 'images/explodeFixed.png')
                        this.load.image('bombFixed', 'images/bombFixed.png')
                        this.load.image('winloseback', 'images/winloseback.jpg')
                        this.load.spritesheet('character', 'images/spritesheet (2)nncopy.png', {
                            frameWidth: 42,
                            frameHeight: 72,
                        });
                    },
                    create: function () {
                        let advance_level = {
                            itemSize: 40,
                            wallDim: 50,
                            wallDimx: 50 + 300,
                            wallDimy: 50 + 400,
                            enemySizeX: 50 + 80,
                            enemySizeY: 50 + 70,
                            bombSize: 40,
                            playerDisplaySizefirst: 50 - 15,
                            playerDisplaySizesecond: 50 - 3,
                            playerSizeFirst: 50,
                            playerSizeSecond: 50 + 15,
                            enemySize: 45,
                            col: 17,
                            row: 8,
                            camScrollX: -370,
                            camScrollY: -270,
                            numberOfEnemies: 20
                        }

                        let intermediate_level = {
                            itemSize: 40,
                            wallDim: 50,
                            wallDimx: 50 + 300,
                            wallDimy: 50 + 400,
                            enemySizeX: 50 + 80,
                            enemySizeY: 50 + 70,
                            bombSize: 40,
                            playerDisplaySizefirst: 50 - 15,
                            playerDisplaySizesecond: 50 - 3,
                            playerSizeFirst: 50,
                            playerSizeSecond: 50 + 15,
                            enemySize: 45,
                            col: 15,
                            row: 8,
                            camScrollX: -420,
                            camScrollY: -270,
                            numberOfEnemies: 14
                        }

                        let beginner_level = {
                            itemSize: 45,///
                            wallDim: 60,///
                            wallDimx: 60 + 300,///
                            wallDimy: 60 + 400,///
                            enemySizeX: 60 + 60,///
                            enemySizeY: 60 + 60,///
                            bombSize: 45,///
                            playerDisplaySizefirst: 60 - 20,///
                            playerDisplaySizesecond: 60 - 8,///
                            playerSizeFirst: 60 - 10,///
                            playerSizeSecond: 60 + 15,///
                            enemySize: 50,///
                            col: 13,///
                            row: 6,///
                            camScrollX: -400,///
                            camScrollY: -290,///
                            numberOfEnemies: 8
                        }

                        this.game.canvas.willReadFrequently = true;

                        this.LevelIndicator = 3

                        this.wallGroup = null;
                        this.player = null;
                        this.playerHit = false
                        this.shield = false
                        this.shieldHold;
                        this.life = 4
                        this.speed = 150;
                        this.isSpeed = false
                        this.bombRange = 1
                        this.bombLimit = 1
                        this.itemSize = this.LevelIndicator == 1 ? beginner_level.itemSize : this.LevelIndicator == 2 ? intermediate_level.itemSize : advance_level.itemSize
                        this.ghostGroup = this.physics.add.group()
                        this.enemies = [];
                        this.enemySpeed = 30
                        this.enemySizeX = this.LevelIndicator == 1 ? beginner_level.enemySizeX : this.LevelIndicator == 2 ? intermediate_level.enemySizeX : advance_level.enemySizeX
                        this.enemySizeY = this.LevelIndicator == 1 ? beginner_level.enemySizeY : this.LevelIndicator == 2 ? intermediate_level.enemySizeY : advance_level.enemySizeY
                        this.numberOfEnemies = this.LevelIndicator == 1 ? beginner_level.numberOfEnemies : this.LevelIndicator == 2 ? intermediate_level.numberOfEnemies : advance_level.numberOfEnemies
                        this.deployedEnemies = 0;
                        this.cursors = null;
                        this.wallDim = this.LevelIndicator == 1 ? beginner_level.wallDim : this.LevelIndicator == 2 ? intermediate_level.wallDim : advance_level.wallDim;
                        this.wallDimy = this.LevelIndicator == 1 ? beginner_level.wallDimy : this.LevelIndicator == 2 ? intermediate_level.wallDimy : advance_level.wallDimy
                        this.wallDimx = this.LevelIndicator == 1 ? beginner_level.wallDimx : this.LevelIndicator == 2 ? intermediate_level.wallDimx : advance_level.wallDimx
                        this.holdItemDim = 74
                        this.cols = this.LevelIndicator == 1 ? beginner_level.col : this.LevelIndicator == 2 ? intermediate_level.col : advance_level.col;//odd
                        this.rows = this.LevelIndicator == 1 ? beginner_level.row : this.LevelIndicator == 2 ? intermediate_level.row : advance_level.row;//even
                        this.totalWallWidth = this.cols * this.wallDim;
                        this.totalWallHeight = this.rows * this.wallDim;
                        this.cameraSpeed = 150;
                        this.outsidewall = null;
                        this.topwall = null;
                        this.rightwall = null;
                        this.bottomwall = null;
                        this.bombSize = this.LevelIndicator == 1 ? beginner_level.bombSize : this.LevelIndicator == 2 ? intermediate_level.bombSize : advance_level.bombSize;
                        this.bombLoc = []
                        this.bombDuration = 300
                        this.bombrepeat = 4
                        this.unbrkWallList = []
                        this.brkWallList = []
                        this.ItemList = []
                        this.ItemGroup = this.physics.add.group()
                        this.brkWallGroup = null
                        this.bombGroup = null

                        //for item label
                        this.lifeDesc = null
                        this.bombDesc = null
                        this.explodeDesc = null

                        //probability symbols
                        this.probabilitySymbols = this.physics.add.group()
                        this.probabilitySymbolsList = []

                        //for displayText
                        this.messageText = null
                        this.container = null // Initial position, can be changed
                        this.background = null

                        //for probanswer
                        this.numerator = "__ "
                        this.denominator = " __"
                        this.probNumeratorHold = null
                        this.probDenominatorHold = null
                        this.questionIndex = 0
                        this.questionsList = [
                            { ansNumerator: 1, ansDenominator: 11, events: ["EVENT A: hello world\n", "EVENT B: Hi world\n", "EVENT C: Hello again\n"], probQuestion: "P( (A|B)/D ) = " },
                            { ansNumerator: 2, ansDenominator: 22, events: ["EVENT A: hello world2\n", "EVENT B: Hi world2\n", "EVENT C: Hello again2\n"], probQuestion: "P( A|B ) = " },
                            { ansNumerator: 3, ansDenominator: 33, events: ["EVENT A: hello world3\n", "EVENT B: Hi world3\n", "EVENT C: Hello again3\n"], probQuestion: "P( A ) = " },
                            { ansNumerator: 4, ansDenominator: 44, events: ["EVENT A: hello world4\n", "EVENT B: Hi world4\n", "EVENT C: Hello again4\n"], probQuestion: "P( B ) = " },
                            { ansNumerator: 5, ansDenominator: 55, events: ["EVENT A: hello world5\n", "EVENT B: Hi world5\n", "EVENT C: Hello again5\n"], probQuestion: "P( C ) = " }
                        ]

                        let answerlongText;
                        let longText;
                        this.score = 0
                        this.holdScore = 0
                        this.perfectScore = 5

                        //keypress
                        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
                        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
                        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

                        //win display
                        let youPassedBack
                        let mainGreeting
                        let subGreeting
                        let circleBackground
                        let scoreArc
                        let scoreLabel
                        let scoreLabel2
                        let scoreLabel3
                        let proceedButton
                        let displayedWin = false

                        const self = this;

                        this.createBackgrounds = function () {
                            //add background
                            self.add.sprite(-500, -500, 'ground').setOrigin(0, 0);
                        },
                            this.createHolder = function () {

                                //Adding fixed images
                                const fixedImage = self.add.image(80, 200, 'heartFixed');
                                fixedImage.setDisplaySize(self.holdItemDim, self.holdItemDim)
                                fixedImage.setSize(self.holdItemDim, self.holdItemDim)
                                fixedImage.setScrollFactor(0);

                                const fixedImage4 = self.add.image(80, 300, 'bombFixed');
                                fixedImage4.setDisplaySize(self.holdItemDim, self.holdItemDim)
                                fixedImage4.setSize(self.holdItemDim, self.holdItemDim)
                                fixedImage4.setScrollFactor(0);

                                const fixedImage5 = self.add.image(80, 400, 'explodeFixed');
                                fixedImage5.setDisplaySize(self.holdItemDim, self.holdItemDim)
                                fixedImage5.setSize(self.holdItemDim, self.holdItemDim)
                                fixedImage5.setScrollFactor(0);

                                //Adding textCount
                                self.lifeDesc = self.add.text(135, 175, self.life + '', {
                                    fontSize: '60px',
                                    fill: '#000000',
                                    fontStyle: "bold"
                                });
                                self.lifeDesc.setScrollFactor(0);

                                self.bombDesc = self.add.text(135, 275, self.bombLimit + '', {
                                    fontSize: '60px',
                                    fill: '#000000',
                                    fontStyle: "bold"
                                });
                                self.bombDesc.setScrollFactor(0);

                                self.explodeDesc = self.add.text(135, 375, self.bombRange + '', {
                                    fontSize: '60px',
                                    fill: '#000000',
                                    fontStyle: "bold"
                                });
                                self.explodeDesc.setScrollFactor(0);

                                self.holdScore = self.add.text(this.cameras.main.width - 350, 35, 'SCORE:' + self.score + '/' + self.perfectScore, {
                                    fontSize: '50px',
                                    fill: '#4af756',
                                    fontStyle: "bold",
                                    stroke: '#000000',
                                    strokeThickness: 10,
                                });
                                self.holdScore.setScrollFactor(0);


                                //Events Container
                                const containerWidth = 700;
                                const containerHeight = 130;
                                const gameWidth = this.game.config.width;

                                const containerX = (gameWidth - containerWidth) / 2; // Fixed X position
                                const containerY = 20; // Fixed Y position
                                const padding = 10; // Adjust this value for the desired padding

                                // Create a background for the container with padding
                                const backgroundWidth = containerWidth + 2 * padding;
                                const backgroundHeight = containerHeight + 2 * padding;
                                const backgroundX = containerX - padding;
                                const backgroundY = containerY - padding;
                                const containerBackground = this.add.graphics();
                                containerBackground.fillStyle(0x450b01, 0.7);
                                containerBackground.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
                                containerBackground.setScrollFactor(0);
                                containerBackground.setDepth(0);

                                longText = this.add.text(
                                    containerX + padding, // Add padding to the text's X position
                                    containerY + padding, // Add padding to the text's Y position
                                    (self.questionsList[self.questionIndex].events).join(''),
                                    {
                                        fontSize: '18px',
                                        fill: '#f74a4a',
                                        fontStyle: "bold",
                                        stroke: '#000000',
                                        strokeThickness: 10, wordWrap: { width: containerWidth - padding }
                                    }
                                );
                                longText.setScrollFactor(0);
                                longText.setDepth(2);

                                const mask = this.add.graphics();
                                mask.fillRect(containerX, containerY, containerWidth, containerHeight);
                                // Mask remains the original container size
                                mask.setScrollFactor(0);
                                mask.setDepth(1);

                                longText.mask = new Phaser.Display.Masks.GeometryMask(this, mask);

                                const scrollContainer = this.add.zone(containerX, containerY, containerWidth, containerHeight) // Input zone matches the mask size
                                    .setOrigin(0)
                                    .setInteractive()
                                    .setScrollFactor(0);
                                scrollContainer.setDepth(2);

                                let startY = 0;

                                scrollContainer.on('pointerdown', (pointer) => {
                                    startY = pointer.y - longText.y;
                                });

                                scrollContainer.on('pointermove', (pointer) => {
                                    if (pointer.isDown) {
                                        longText.y = pointer.y - startY;
                                        longText.y = Phaser.Math.Clamp(
                                            longText.y,
                                            containerY + padding - (longText.height - containerHeight + padding), // Adjust the lower clamp
                                            containerY + padding // Adjust the upper clamp
                                        );
                                    }
                                });

                                //Answer container
                                const answercontainerWidth = 700;
                                const answercontainerHeight = 50;
                                const answergameWidth = this.game.config.width;

                                const answercontainerX = (answergameWidth - answercontainerWidth) / 2;
                                const answercontainerY = 180;
                                const answerpadding = 10;

                                const answerbackgroundWidth = answercontainerWidth + 2 * answerpadding;
                                const answerbackgroundHeight = answercontainerHeight + 2 * answerpadding;
                                const answerbackgroundX = answercontainerX - answerpadding;
                                const answerbackgroundY = answercontainerY - answerpadding;

                                const answercontainerBackground = this.add.graphics();
                                answercontainerBackground.fillStyle(0x450b01, 0.7);
                                answercontainerBackground.fillRect(answerbackgroundX, answerbackgroundY, answerbackgroundWidth, answerbackgroundHeight);
                                answercontainerBackground.setScrollFactor(0);
                                answercontainerBackground.setDepth(0);

                                answerlongText = this.add.text(
                                    answercontainerX + answerpadding,
                                    answercontainerY + answerpadding,
                                    `${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`,
                                    {
                                        fontSize: '24px',
                                        fill: '#f74a4a',
                                        fontStyle: "bold",
                                        stroke: '#000000',
                                        strokeThickness: 10
                                        // Remove wordWrap to allow horizontal overflow
                                    }
                                );

                                answerlongText.setScrollFactor(0);
                                answerlongText.setDepth(2);

                                const answerTextFits = answerlongText.width <= answercontainerWidth;
                                answerlongText.x = answerTextFits
                                    ? answercontainerX + (answercontainerWidth - answerlongText.width) / 2 // center
                                    : answercontainerX + answerpadding; // scrollable start position

                                const answermask = this.add.graphics();
                                answermask.fillRect(answercontainerX, answercontainerY, answercontainerWidth, answercontainerHeight);
                                answermask.setScrollFactor(0);
                                answermask.setDepth(1);

                                answerlongText.mask = new Phaser.Display.Masks.GeometryMask(this, answermask);

                                const answerscrollContainer = this.add.zone(answercontainerX, answercontainerY, answercontainerWidth, answercontainerHeight)
                                    .setOrigin(0)
                                    .setInteractive()
                                    .setScrollFactor(0);
                                answerscrollContainer.setDepth(2);

                                let answerstartX = 0;

                                answerscrollContainer.on('pointerdown', (pointer) => {
                                    answerstartX = pointer.x - answerlongText.x;
                                });

                                answerscrollContainer.on('pointermove', (pointer) => {
                                    if (pointer.isDown) {
                                        answerlongText.x = pointer.x - answerstartX;

                                        const maxX = answercontainerX + answerpadding;
                                        const minX = answercontainerX + answerpadding - (answerlongText.width - answercontainerWidth + answerpadding);

                                        answerlongText.x = Phaser.Math.Clamp(answerlongText.x, minX, maxX);

                                    }
                                });

                                //WIN OR Lose Board

                                youPassedBack = self.add.graphics();
                                youPassedBack.fillStyle(0x000000, 0.8);
                                youPassedBack.fillRect(0, 0, this.game.config.width, this.game.config.height);
                                youPassedBack.setScrollFactor(0);
                                youPassedBack.setDepth(3);
                                youPassedBack.alpha = 0


                            }

                        this.createWalls = function () {
                            self.wallGroup = this.physics.add.group();
                            self.createLeftWall();
                            self.createTopWall();
                            self.createRightWall();
                            self.createBottomWall();

                        }
                        this.createLeftWall = function () {
                            self.outsidewall = self.physics.add.group({ immovable: true });
                            let adjustwall = self.wallDim;
                            for (let nn = 0; nn < self.rows; nn++) {
                                let wall = self.outsidewall.create(0, adjustwall, 'unbrkwall');
                                self.unbrkWallList.push({ "x": 0, "y": adjustwall })
                                adjustwall += self.wallDim;
                                wall.body.setSize(self.wallDimx, self.wallDimy);
                                wall.setDisplaySize(self.wallDim, self.wallDim);
                            }
                        }
                        this.createTopWall = function () {
                            self.topwall = self.physics.add.group({ immovable: true });
                            let adjusttopwall = 0;
                            let skipColumn = false;

                            self.brkWallGroup = self.physics.add.group({ immovable: true })
                            for (let nn = 0; nn < self.cols; nn++) {
                                let wall = self.topwall.create(adjusttopwall, 0, 'unbrkwall');
                                self.unbrkWallList.push({ "x": adjusttopwall, "y": 0 })
                                adjusttopwall += self.wallDim;
                                wall.body.setSize(self.wallDimx, self.wallDimy);
                                wall.setDisplaySize(self.wallDim, self.wallDim);

                                if (nn >= 1 && nn <= self.cols - 3 && !skipColumn) {
                                    let insidewall = self.wallDim;
                                    let putWall = true;

                                    for (let bb = 0; bb <= self.rows - 2; bb++) {
                                        if (putWall && (bb >= 1 && bb <= self.rows - 3)) {
                                            //random number to check wether to put wall or not
                                            let randnum = Math.random() < 0.80 ? 1 : 0;
                                            if (randnum == 1) {
                                                let innerWall = self.topwall.create(adjusttopwall, insidewall, 'unbrkwall');
                                                self.unbrkWallList.push({ "x": adjusttopwall, "y": insidewall })
                                                insidewall += self.wallDim;
                                                innerWall.body.setSize(self.wallDimx, self.wallDimy);
                                                innerWall.setDisplaySize(self.wallDim, self.wallDim);
                                                putWall = false;
                                            }
                                            else {
                                                let randnum = Math.random() < 0.70 ? 1 : 0;
                                                if (randnum == 1) {
                                                    //place item

                                                    let rendnumItem = Math.random() < 0.70 ? 1 : 0;
                                                    if (rendnumItem == 1) {
                                                        let itemnum = Math.floor(Math.random() * 11) + 1; // Increased the range for more distribution
                                                        let itempick;

                                                        switch (itemnum) {
                                                            case 1:
                                                            case 2:
                                                            case 3:
                                                            case 4:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem');
                                                                itempick.type = 'heartItem';
                                                                break;
                                                            case 5:
                                                            case 6:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bootsItem');
                                                                itempick.type = 'bootsItem';
                                                                break;
                                                            case 7:
                                                            case 8:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem');
                                                                itempick.type = 'shieldItem';
                                                                break;
                                                            case 9:
                                                            case 10:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem');
                                                                itempick.type = 'bombItem';
                                                                break;
                                                            case 11:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'explodeItem');
                                                                itempick.type = 'explodeItem';
                                                                break;
                                                        }
                                                        self.ItemList.push({ "x": adjusttopwall, "y": insidewall })
                                                        itempick.body.setSize(self.itemSize, self.itemSize);
                                                        itempick.setDisplaySize(self.itemSize, self.itemSize);
                                                        itempick.captured = false
                                                        self.tweens.add({
                                                            targets: itempick,
                                                            y: itempick.y - 5, // move up by 10 pixels
                                                            duration: 800,      // time in ms
                                                            yoyo: true,         // come back down
                                                            repeat: -1,         // infinite loop
                                                            ease: 'Sine.easeInOut'
                                                        });
                                                    }

                                                    let innerWall = self.brkWallGroup.create(adjusttopwall, insidewall, 'brkwall');
                                                    self.brkWallList.push({ "x": adjusttopwall, "y": insidewall })
                                                    insidewall += self.wallDim;
                                                    innerWall.body.setSize(self.wallDimx, self.wallDimy);
                                                    innerWall.setDisplaySize(self.wallDim, self.wallDim);
                                                    putWall = false;

                                                }
                                                else {
                                                    let randEnemynum = Math.random() < 0.80 ? 1 : 0;
                                                    if (randEnemynum == 1 && self.deployedEnemies <= self.numberOfEnemies && nn >= 2) {
                                                        self.createEnemy(adjusttopwall, insidewall)
                                                        self.deployedEnemies += 1
                                                    }
                                                    insidewall += self.wallDim;
                                                    putWall = false;
                                                }

                                            }
                                        } else {
                                            let randnum = Math.random() < 0.70 ? 1 : 0;
                                            if (randnum == 1) {

                                                let rendnumItem = Math.random() < 0.70 ? 1 : 0;
                                                if (rendnumItem == 1) {
                                                    let itemnum = Math.floor(Math.random() * 11) + 1; // Increased the range for more distribution
                                                    let itempick;

                                                    switch (itemnum) {
                                                        case 1:
                                                        case 2:
                                                        case 3:
                                                        case 4:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem');
                                                            itempick.type = 'heartItem';
                                                            break;
                                                        case 5:
                                                        case 6:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bootsItem');
                                                            itempick.type = 'bootsItem';
                                                            break;
                                                        case 7:
                                                        case 8:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem');
                                                            itempick.type = 'shieldItem';
                                                            break;
                                                        case 9:
                                                        case 10:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem');
                                                            itempick.type = 'bombItem';
                                                            break;
                                                        case 11:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'explodeItem');
                                                            itempick.type = 'explodeItem';
                                                            break;
                                                    }
                                                    self.ItemList.push({ "x": adjusttopwall, "y": insidewall })
                                                    itempick.body.setSize(self.itemSize, self.itemSize);
                                                    itempick.setDisplaySize(self.itemSize, self.itemSize);
                                                    itempick.captured = false
                                                    self.tweens.add({
                                                        targets: itempick,
                                                        y: itempick.y - 5, // move up by 10 pixels
                                                        duration: 800,      // time in ms
                                                        yoyo: true,         // come back down
                                                        repeat: -1,         // infinite loop
                                                        ease: 'Sine.easeInOut'
                                                    });
                                                }

                                                let innerWall = self.brkWallGroup.create(adjusttopwall, insidewall, 'brkwall');
                                                self.brkWallList.push({ "x": adjusttopwall, "y": insidewall })
                                                insidewall += self.wallDim;
                                                innerWall.body.setSize(self.wallDimx, self.wallDimy);
                                                innerWall.setDisplaySize(self.wallDim, self.wallDim);
                                                putWall = true
                                            }
                                            else {
                                                let randEnemynum = Math.random() < 0.80 ? 1 : 0;
                                                if (randEnemynum == 1 && self.deployedEnemies <= self.numberOfEnemies && nn >= 2) {
                                                    self.createEnemy(adjusttopwall, insidewall)
                                                    self.deployedEnemies += 1
                                                }
                                                insidewall += self.wallDim;
                                                putWall = true
                                            }

                                        }
                                    }
                                    skipColumn = true;
                                } else {
                                    if (nn != 0 && nn <= self.cols - 3 && skipColumn) {
                                        let insidewall = self.wallDim;
                                        for (let bb = 0; bb <= self.rows - 2; bb++) {

                                            let randnum = Math.random() < 0.70 ? 1 : 0;
                                            if (randnum == 1) {

                                                let rendnumItem = Math.random() < 0.70 ? 1 : 0;
                                                if (rendnumItem == 1) {
                                                    let itemnum = Math.floor(Math.random() * 11) + 1; // Increased the range for more distribution
                                                    let itempick;

                                                    switch (itemnum) {
                                                        case 1:
                                                        case 2:
                                                        case 3:
                                                        case 4:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem');
                                                            itempick.type = 'heartItem';
                                                            break;
                                                        case 5:
                                                        case 6:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bootsItem');
                                                            itempick.type = 'bootsItem';
                                                            break;
                                                        case 7:
                                                        case 8:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem');
                                                            itempick.type = 'shieldItem';
                                                            break;
                                                        case 9:
                                                        case 10:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem');
                                                            itempick.type = 'bombItem';
                                                            break;
                                                        case 11:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'explodeItem');
                                                            itempick.type = 'explodeItem';
                                                            break;
                                                    }
                                                    self.ItemList.push({ "x": adjusttopwall, "y": insidewall })
                                                    itempick.body.setSize(self.itemSize, self.itemSize);
                                                    itempick.setDisplaySize(self.itemSize, self.itemSize);
                                                    itempick.captured = false
                                                    self.tweens.add({
                                                        targets: itempick,
                                                        y: itempick.y - 5, // move up by 10 pixels
                                                        duration: 800,      // time in ms
                                                        yoyo: true,         // come back down
                                                        repeat: -1,         // infinite loop
                                                        ease: 'Sine.easeInOut'
                                                    });
                                                }

                                                let innerWall = self.brkWallGroup.create(adjusttopwall, insidewall, 'brkwall');
                                                self.brkWallList.push({ "x": adjusttopwall, "y": insidewall })
                                                insidewall += self.wallDim;
                                                innerWall.body.setSize(self.wallDimx, self.wallDimy);
                                                innerWall.setDisplaySize(self.wallDim, self.wallDim);
                                            }
                                            else {
                                                let randEnemynum = Math.random() < 0.80 ? 1 : 0;
                                                if (randEnemynum == 1 && self.deployedEnemies <= self.numberOfEnemies && nn >= 2) {
                                                    self.createEnemy(adjusttopwall, insidewall)
                                                    self.deployedEnemies += 1
                                                }
                                                insidewall += self.wallDim;
                                            }
                                        }
                                    }
                                    skipColumn = false;
                                }
                            }
                        },
                            this.createRightWall = function () {
                                self.rightwall = self.physics.add.group({ immovable: true });
                                let adjustrightwall = self.wallDim;
                                for (let nn = 0; nn < self.rows; nn++) {
                                    let wall = self.rightwall.create(self.totalWallWidth - self.wallDim, adjustrightwall, 'unbrkwall');
                                    self.unbrkWallList.push({ "x": self.totalWallWidth - self.wallDim, "y": adjustrightwall })
                                    adjustrightwall += self.wallDim;
                                    wall.body.setSize(self.wallDimx, self.wallDimy);
                                    wall.setDisplaySize(self.wallDim, self.wallDim);
                                }
                            },
                            this.createBottomWall = function () {
                                self.bottomwall = self.physics.add.group({ immovable: true });
                                let adjustbottomwall = 0;
                                for (let nn = 0; nn < self.cols; nn++) {
                                    let wall = self.bottomwall.create(adjustbottomwall, self.totalWallHeight, 'unbrkwall');
                                    self.unbrkWallList.push({ "x": adjustbottomwall, "y": self.totalWallHeight })
                                    adjustbottomwall += self.wallDim;
                                    wall.body.setSize(self.wallDimx, self.wallDimy);
                                    wall.setDisplaySize(self.wallDim, self.wallDim);
                                }
                            },
                            this.createProbAnswers = function () {
                                //get unique indecies to store values
                                let indices = [];
                                let total = self.brkWallList.length;
                                console.log("TOTAL" + total)

                                while (indices.length < self.perfectScore * 2 && indices.length < total) {
                                    let rand = Math.floor(Math.random() * total);
                                    if (!indices.includes(rand)) {
                                        indices.push(rand);
                                    }
                                }
                                //list of json answers
                                let answerList = []
                                for (var elem of self.questionsList) {
                                    answerList.push(elem.ansNumerator)
                                    answerList.push(elem.ansDenominator)
                                }

                                for (let i = answerList.length - 1; i > 0; i--) {
                                    let j = Math.floor(Math.random() * (i + 1));
                                    [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
                                }

                                var countme = 0
                                for (var bb of self.brkWallList) {
                                    console.log(bb)
                                    let rand;
                                    let bias = Math.random();

                                    if (bias < 0.7) {
                                        rand = Math.floor(Math.random() * 20) + 1;
                                    } else {
                                        rand = Math.floor(Math.random() * (999 - 20)) + 21;
                                    }
                                    let probSymb = rand + ""
                                    if (indices.includes(countme)) {
                                        let indexCount = indices.indexOf(countme);

                                        probSymb = answerList[indexCount] + ""

                                    }
                                    let messageSymb = null
                                    if (probSymb.length == 1) {
                                        messageSymb = self.add.text(bb.x - 10, bb.y - 15, probSymb, {
                                            fontSize: '32px',
                                            fill: '#800000',
                                            fontStyle: "bold",
                                            stroke: '#000000',
                                            strokeThickness: 4
                                        });
                                    }
                                    else if (probSymb.length == 2) {
                                        messageSymb = self.add.text(bb.x - 20, bb.y - 15, probSymb, {
                                            fontSize: '32px',
                                            fill: '#800000',
                                            fontStyle: "bold",
                                            stroke: '#000000',
                                            strokeThickness: 4
                                        });
                                    }
                                    else if (probSymb.length == 3) {
                                        messageSymb = self.add.text(bb.x - 25, bb.y - 15, probSymb, {
                                            fontSize: '28px',
                                            fill: '#800000',
                                            fontStyle: "bold",
                                            stroke: '#000000',
                                            strokeThickness: 4
                                        });
                                    }
                                    messageSymb.isDrop = false
                                    messageSymb.captured = false
                                    messageSymb.type = "prob"

                                    self.probabilitySymbols.add(messageSymb)
                                    countme++;

                                }
                            }
                        this.createPlayer = function () {
                            self.player = self.physics.add.sprite(60, 70, 'character');
                            //self.player.setScale(48 / 30, 70 / 50);
                            self.player.body.setSize(self.LevelIndicator == 1 ? beginner_level.playerSizeFirst : self.LevelIndicator == 2 ? intermediate_level.playerSizeFirst : advance_level.playerSizeFirst, self.LevelIndicator == 1 ? beginner_level.playerSizeSecond : self.LevelIndicator == 2 ? intermediate_level.playerSizeSecond : advance_level.playerSizeSecond);
                            self.player.setDisplaySize(self.LevelIndicator == 1 ? beginner_level.playerDisplaySizefirst : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizefirst : advance_level.playerDisplaySizefirst, self.LevelIndicator == 1 ? beginner_level.playerDisplaySizesecond : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizesecond : advance_level.playerDisplaySizesecond);
                            self.player.setCollideWorldBounds(true);

                            self.anims.create({
                                key: 'left',
                                frames: self.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
                                frameRate: 10,
                                repeat: -1,
                            });
                            self.anims.create({
                                key: 'right',
                                frames: self.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
                                frameRate: 10,
                                repeat: -1,
                            });
                            self.anims.create({
                                key: 'stopright',
                                frames: [{ key: 'character', frame: 0 }],
                                frameRate: 10,
                                repeat: -1,
                            });
                        },
                            this.createEnemy = function (x, y) {
                                let enemy = self.ghostGroup.create(x, y, 'ghost')
                                enemy.body.setSize(self.enemySizeX, self.enemySizeY);
                                enemy.setDisplaySize(this.LevelIndicator == 1 ? beginner_level.enemySize : this.LevelIndicator == 2 ? intermediate_level.enemySize : advance_level.enemySize, this.LevelIndicator == 1 ? beginner_level.enemySize : this.LevelIndicator == 2 ? intermediate_level.enemySize : advance_level.enemySize);
                                enemy.setCollideWorldBounds(true);
                                enemy.setVelocityY((self.enemySpeed))
                                enemy.hitPlayer = false
                            },
                            this.handlePlayerMovement = function () {
                                if (self.cursors.left.isDown) {
                                    self.player.setVelocityX(-self.speed);
                                    self.player.setVelocityY(0);
                                    if (self.shieldHold) {
                                        self.shieldHold.x = self.player.x
                                        self.shieldHold.y = self.player.y
                                    }

                                    self.player.anims.play('left', true);
                                } else if (self.cursors.right.isDown) {
                                    self.player.setVelocityX(self.speed);
                                    self.player.setVelocityY(0);
                                    if (self.shieldHold) {
                                        self.shieldHold.x = self.player.x
                                        self.shieldHold.y = self.player.y
                                    }

                                    self.player.anims.play('right', true);
                                } else if (self.cursors.up.isDown) {
                                    self.player.setVelocityY(-self.speed);
                                    self.player.setVelocityX(0);
                                    if (self.shieldHold) {
                                        self.shieldHold.x = self.player.x
                                        self.shieldHold.y = self.player.y
                                    }

                                    self.player.anims.play('right', true);
                                } else if (self.cursors.down.isDown) {
                                    self.player.setVelocityY(self.speed);
                                    self.player.setVelocityX(0);
                                    if (self.shieldHold) {
                                        self.shieldHold.x = self.player.x
                                        self.shieldHold.y = self.player.y
                                    }
                                    self.player.anims.play('left', true);
                                }
                                else {
                                    self.player.setVelocityX(0);
                                    self.player.setVelocityY(0);
                                    if (self.shieldHold) {
                                        self.shieldHold.x = self.player.x
                                        self.shieldHold.y = self.player.y
                                    }

                                    self.player.anims.play('stopright');
                                }
                                if (Phaser.Input.Keyboard.JustDown(self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A))) {
                                    console.log("GO")
                                    this.dropBomb()
                                }
                                //detect Single keypress
                                if (Phaser.Input.Keyboard.JustDown(self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z))) {
                                    self.numerator = "__ ";
                                    self.denominator = " __";
                                    if (self.probNumeratorHold != null) {
                                        self.probNumeratorHold.alpha = 1
                                        self.probNumeratorHold.isDrop = true
                                        self.probNumeratorHold.captured = false
                                    }
                                    if (self.probDenominatorHold != null) {
                                        self.probDenominatorHold.alpha = 1
                                        self.probDenominatorHold.isDrop = true
                                        self.probDenominatorHold.captured = false
                                    }



                                    if (self.questionIndex == 0) {
                                        self.questionIndex = self.questionsList.length - 1;
                                    }
                                    else {
                                        self.questionIndex -= 1
                                    }

                                    longText.setText((self.questionsList[self.questionIndex].events).join(''))

                                    answerlongText.setText(`${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`)

                                }
                                if (Phaser.Input.Keyboard.JustDown(self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X))) {
                                    self.numerator = "__ ";
                                    self.denominator = " __";
                                    if (self.probNumeratorHold != null) {
                                        self.probNumeratorHold.alpha = 1
                                        self.probNumeratorHold.isDrop = true
                                        self.probNumeratorHold.captured = false
                                    }
                                    if (self.probDenominatorHold != null) {
                                        self.probDenominatorHold.alpha = 1
                                        self.probDenominatorHold.isDrop = true
                                        self.probDenominatorHold.captured = false
                                    }



                                    if (self.questionIndex == self.questionsList.length - 1) {
                                        self.questionIndex = 0
                                    }
                                    else {
                                        self.questionIndex += 1
                                    }

                                    longText.setText((self.questionsList[self.questionIndex].events).join(''))

                                    answerlongText.setText(`${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`)

                                }
                            },
                            /*this.handleCameraMovement = function () {
                                if (self.cursors.left.isDown && self.player.x < self.cameras.main.scrollX + 500) {
                                    self.cameras.main.scrollX -= self.cameraSpeed * self.game.loop.delta / 1000;
                                } else if (self.cursors.right.isDown && self.player.x > self.cameras.main.scrollX + self.cameras.main.width - 500) {
                                    self.cameras.main.scrollX += self.cameraSpeed * self.game.loop.delta / 1000;
                                } else if (self.cursors.up.isDown && self.player.y < self.cameras.main.scrollY + 500) {
                                    self.cameras.main.scrollY -= self.cameraSpeed * self.game.loop.delta / 1000;
                                } else if (self.cursors.down.isDown && self.player.y > self.cameras.main.scrollY + self.cameras.main.height - 300) {
                                    self.cameras.main.scrollY += self.cameraSpeed * self.game.loop.delta / 1000;
                                }
                            },*/
                            this.handleCollisions = function () {
                                this.physics.add.collider(this.player, this.bombGroup)

                            },
                            this.dropBomb = function () {
                                const gridX = Math.round(self.player.x / self.wallDim) * self.wallDim;
                                const gridY = Math.round(self.player.y / self.wallDim) * self.wallDim;

                                //check if number of bombs exceed bomblimit
                                if (self.bombLoc.length >= self.bombLimit) {
                                    console.log("bomb exceed limit")
                                    return
                                }
                                //check if location exist
                                if (self.bombLoc.some(bomb => bomb.x === gridX && bomb.y === gridY)) {
                                    return
                                }

                                self.bombGroup = self.physics.add.group({ immovable: true })
                                let bomb = self.bombGroup.create(gridX, gridY, 'bomb');

                                bomb.body.setSize(0, 0); //Set initial body size to 0
                                bomb.setDisplaySize(0, 0); //Set initial display size to 0

                                //add to bombArray
                                self.bombLoc.push({ "x": gridX, "y": gridY })


                                self.tweens.add({
                                    targets: bomb,
                                    displayWidth: self.bombSize, //Animate to original displayWidth
                                    displayHeight: self.bombSize, //Animate to original displayHeight
                                    duration: 100, // Duration of the animation in milliseconds
                                    ease: 'Linear', //Easing function ('Linear', 'EaseInOut')
                                    onComplete: function () {
                                        //after the tween. set the body size to the display size.
                                        bomb.body.setSize(self.bombSize, self.bombSize);

                                        // Start alternating opacity tween
                                        self.tweens.add({
                                            targets: bomb,
                                            alpha: { from: 1, to: 0.5 },//opacity
                                            duration: self.bombDuration,
                                            ease: 'Linear',
                                            yoyo: true,// Allow alternate
                                            repeat: self.bombrepeat, // Infinite loop
                                            onComplete: function () {
                                                bomb.destroy();//destroy bomb

                                                // Remove the bomb's location from bombLoc
                                                const index = self.bombLoc.findIndex(loc => loc.x === gridX && loc.y === gridY);
                                                if (index !== -1) {
                                                    self.bombLoc.splice(index, 1);
                                                }
                                                //Replacing bomb with explosion
                                                let explode = self.physics.add.group({ immovable: true }).create(gridX, gridY, 'explode');
                                                explode.body.setSize(self.bombSize, self.bombSize);
                                                explode.setDisplaySize(self.bombSize, self.bombSize);
                                                explode.alpha = 0
                                                //bomb animation
                                                self.tweens.add({
                                                    targets: explode,
                                                    alpha: 1,
                                                    duration: 100, // Duration of the animation in milliseconds
                                                    ease: 'Linear', //Easing function ('Linear', 'EaseInOut')
                                                    onComplete: function () {

                                                        // Add a delay before destroying the explosion
                                                        self.time.delayedCall(400, function () { // 500 milliseconds (0.5 seconds) delay
                                                            explode.destroy();
                                                        }, [], self); // The last self argument ensures that the context of the destroy function is correct.
                                                    }
                                                })

                                                let bombDur = 150
                                                let topExplode = true
                                                let bottomExplode = true
                                                let rightExplode = true
                                                let leftExplode = true

                                                for (var bombnum = 1; bombnum <= self.bombRange; bombnum++) {
                                                    // Add top bomb
                                                    if (self.unbrkWallList.some(bomb => bomb.x === gridX && bomb.y === gridY - (bombnum * self.wallDim)) && topExplode == true) {
                                                        topExplode = false
                                                    }
                                                    if (topExplode == true) {
                                                        let explodeTop = self.physics.add.group({ immovable: true }).create(gridX, gridY - (bombnum * self.wallDim), 'explode');
                                                        explodeTop.body.setSize(self.bombSize, self.bombSize);
                                                        explodeTop.setDisplaySize(self.bombSize, self.bombSize);
                                                        explodeTop.hasDamaged = false
                                                        self.physics.add.overlap(explodeTop, self.player, function (explode, player) {
                                                            if (!explode.hasDamaged) {
                                                                if (self.shield == true) {

                                                                }
                                                                else {
                                                                    self.life -= 1
                                                                    self.lifeDesc.setText(self.life + '')
                                                                    console.log(self.life);
                                                                    explode.hasDamaged = true

                                                                    self.player.setTint(0xff0000); // Set tint to red
                                                                    self.player.body.setSize(self.LevelIndicator == 1 ? beginner_level.playerSizeFirst : self.LevelIndicator == 2 ? intermediate_level.playerSizeFirst : advance_level.playerSizeFirst, self.LevelIndicator == 1 ? beginner_level.playerSizeSecond : self.LevelIndicator == 2 ? intermediate_level.playerSizeSecond : advance_level.playerSizeSecond);
                                                                    self.player.setDisplaySize(self.LevelIndicator == 1 ? beginner_level.playerDisplaySizefirst : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizefirst : advance_level.playerDisplaySizefirst, self.LevelIndicator == 1 ? beginner_level.playerDisplaySizesecond : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizesecond : advance_level.playerDisplaySizesecond);

                                                                    const originalHeight = self.player.displayHeight;
                                                                    const originalwidth = self.player.displayWidth;
                                                                    const targetHeight = originalHeight * 1.1;
                                                                    const targetWidth = originalwidth * 1.1;// Increase size by 20% (adjust as needed)
                                                                    const duration = 200; // Duration of the scaling animation in milliseconds

                                                                    // Create a smooth tween for scaling up
                                                                    self.tweens.add({
                                                                        targets: self.player,
                                                                        displayHeight: targetHeight,
                                                                        displayWidth: targetWidth,
                                                                        duration: duration,
                                                                        ease: 'Sine.out', // Use a smooth easing function
                                                                        onComplete: () => {
                                                                            // Create a smooth tween for scaling back down
                                                                            self.tweens.add({
                                                                                targets: self.player,
                                                                                displayHeight: originalHeight,
                                                                                displayWidth: originalwidth,
                                                                                duration: duration,
                                                                                ease: 'Sine.inOut', // Use a smooth easing function
                                                                            });

                                                                            self.time.delayedCall(400, () => {
                                                                                self.player.clearTint(); // Clear the tint after the scale animation
                                                                            });
                                                                        }
                                                                    });
                                                                    if (self.life <= 0) {
                                                                        self.input.keyboard.removeAllListeners();
                                                                        self.input.keyboard.enabled = false;
                                                                        self.gameTimer.paused = true;
                                                                        if (displayedWin == false) {
                                                                            self.createWinDisplay()
                                                                            displayedWin = true
                                                                        }

                                                                    }
                                                                }

                                                            }
                                                        });


                                                        explodeTop.alpha = 0
                                                        //animation for bomb
                                                        self.tweens.add({
                                                            targets: explodeTop,
                                                            alpha: 1,
                                                            duration: bombDur, // Duration of the animation in milliseconds
                                                            ease: 'Linear', //Easing function ('Linear', 'EaseInOut')
                                                            onComplete: function () {
                                                                // Add a delay before destroying the explosion
                                                                self.time.delayedCall(400, function () { // 500 milliseconds (0.5 seconds) delay
                                                                    explodeTop.destroy();
                                                                }, [], self); // The last self argument ensures that the context of the destroy function is correct.
                                                            }
                                                        })
                                                    }

                                                    if (self.unbrkWallList.some(bomb => bomb.x === gridX - (bombnum * self.wallDim) && bomb.y === gridY) && leftExplode == true) {
                                                        leftExplode = false
                                                    }

                                                    if (leftExplode == true) {
                                                        // Add left bomb
                                                        let explodeLeft = self.physics.add.group({ immovable: true }).create(gridX - (bombnum * self.wallDim), gridY, 'explode');
                                                        explodeLeft.body.setSize(self.bombSize, self.bombSize);
                                                        explodeLeft.setDisplaySize(self.bombSize, self.bombSize);

                                                        self.physics.add.overlap(explodeLeft, self.player, function (explode, player) {
                                                            if (!explode.hasDamaged) {
                                                                if (self.shield == true) {

                                                                }
                                                                else {
                                                                    self.life -= 1
                                                                    self.lifeDesc.setText(self.life + '')
                                                                    console.log(self.life);
                                                                    explode.hasDamaged = true


                                                                    self.player.setTint(0xff0000); // Set tint to red
                                                                    self.player.body.setSize(self.LevelIndicator == 1 ? beginner_level.playerSizeFirst : self.LevelIndicator == 2 ? intermediate_level.playerSizeFirst : advance_level.playerSizeFirst, self.LevelIndicator == 1 ? beginner_level.playerSizeSecond : self.LevelIndicator == 2 ? intermediate_level.playerSizeSecond : advance_level.playerSizeSecond);
                                                                    self.player.setDisplaySize(self.LevelIndicator == 1 ? beginner_level.playerDisplaySizefirst : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizefirst : advance_level.playerDisplaySizefirst, self.LevelIndicator == 1 ? beginner_level.playerDisplaySizesecond : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizesecond : advance_level.playerDisplaySizesecond);

                                                                    const originalHeight = self.player.displayHeight;
                                                                    const originalwidth = self.player.displayWidth;
                                                                    const targetHeight = originalHeight * 1.1;
                                                                    const targetWidth = originalwidth * 1.1;// Increase size by 20% (adjust as needed)
                                                                    const duration = 200; // Duration of the scaling animation in milliseconds

                                                                    // Create a smooth tween for scaling up
                                                                    self.tweens.add({
                                                                        targets: self.player,
                                                                        displayHeight: targetHeight,
                                                                        displayWidth: targetWidth,
                                                                        duration: duration,
                                                                        ease: 'Sine.out', // Use a smooth easing function
                                                                        onComplete: () => {
                                                                            // Create a smooth tween for scaling back down
                                                                            self.tweens.add({
                                                                                targets: self.player,
                                                                                displayHeight: originalHeight,
                                                                                displayWidth: originalwidth,
                                                                                duration: duration,
                                                                                ease: 'Sine.inOut', // Use a smooth easing function
                                                                            });

                                                                            self.time.delayedCall(400, () => {
                                                                                self.player.clearTint(); // Clear the tint after the scale animation
                                                                            });
                                                                        }
                                                                    });

                                                                    if (self.life <= 0) {
                                                                        self.input.keyboard.removeAllListeners();
                                                                        self.input.keyboard.enabled = false;
                                                                        self.gameTimer.paused = true;
                                                                        if (displayedWin == false) {
                                                                            self.createWinDisplay()
                                                                            displayedWin = true
                                                                        }

                                                                    }
                                                                }

                                                            }

                                                        });



                                                        explodeLeft.alpha = 0
                                                        //animation for bomb
                                                        self.tweens.add({
                                                            targets: explodeLeft,
                                                            alpha: 1,
                                                            duration: bombDur, // Duration of the animation in milliseconds
                                                            ease: 'Linear', //Easing function ('Linear', 'EaseInOut')
                                                            onComplete: function () {
                                                                // Add a delay before destroying the explosion
                                                                self.time.delayedCall(400, function () { // 500 milliseconds (0.5 seconds) delay
                                                                    explodeLeft.destroy();
                                                                }, [], self); // The last self argument ensures that the context of the destroy function is correct.
                                                            }
                                                        })
                                                    }

                                                    if (self.unbrkWallList.some(bomb => bomb.x === gridX + (bombnum * self.wallDim) && bomb.y === gridY) && rightExplode == true) {
                                                        rightExplode = false
                                                    }

                                                    if (rightExplode == true) {
                                                        // Add right bomb
                                                        let explodeRight = self.physics.add.group({ immovable: true }).create(gridX + (bombnum * self.wallDim), gridY, 'explode');
                                                        explodeRight.body.setSize(self.bombSize, self.bombSize);
                                                        explodeRight.setDisplaySize(self.bombSize, self.bombSize);

                                                        self.physics.add.overlap(explodeRight, self.player, function (explode, player) {
                                                            if (!explode.hasDamaged) {
                                                                if (self.shield == true) {

                                                                }
                                                                else {
                                                                    self.life -= 1
                                                                    self.lifeDesc.setText(self.life + '')
                                                                    console.log(self.life);
                                                                    explode.hasDamaged = true


                                                                    self.player.setTint(0xff0000); // Set tint to red
                                                                    self.player.body.setSize(self.LevelIndicator == 1 ? beginner_level.playerSizeFirst : self.LevelIndicator == 2 ? intermediate_level.playerSizeFirst : advance_level.playerSizeFirst, self.LevelIndicator == 1 ? beginner_level.playerSizeSecond : self.LevelIndicator == 2 ? intermediate_level.playerSizeSecond : advance_level.playerSizeSecond);
                                                                    self.player.setDisplaySize(self.LevelIndicator == 1 ? beginner_level.playerDisplaySizefirst : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizefirst : advance_level.playerDisplaySizefirst, self.LevelIndicator == 1 ? beginner_level.playerDisplaySizesecond : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizesecond : advance_level.playerDisplaySizesecond);

                                                                    const originalHeight = self.player.displayHeight;
                                                                    const originalwidth = self.player.displayWidth;
                                                                    const targetHeight = originalHeight * 1.1;
                                                                    const targetWidth = originalwidth * 1.1;// Increase size by 20% (adjust as needed)
                                                                    const duration = 200; // Duration of the scaling animation in milliseconds

                                                                    // Create a smooth tween for scaling up
                                                                    self.tweens.add({
                                                                        targets: self.player,
                                                                        displayHeight: targetHeight,
                                                                        displayWidth: targetWidth,
                                                                        duration: duration,
                                                                        ease: 'Sine.out', // Use a smooth easing function
                                                                        onComplete: () => {
                                                                            // Create a smooth tween for scaling back down
                                                                            self.tweens.add({
                                                                                targets: self.player,
                                                                                displayHeight: originalHeight,
                                                                                displayWidth: originalwidth,
                                                                                duration: duration,
                                                                                ease: 'Sine.inOut', // Use a smooth easing function
                                                                            });

                                                                            self.time.delayedCall(400, () => {
                                                                                self.player.clearTint(); // Clear the tint after the scale animation
                                                                            });
                                                                        }
                                                                    });
                                                                    if (self.life <= 0) {
                                                                        self.input.keyboard.removeAllListeners();
                                                                        self.input.keyboard.enabled = false;
                                                                        self.gameTimer.paused = true;
                                                                        if (displayedWin == false) {
                                                                            self.createWinDisplay()
                                                                            displayedWin = true
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                        });

                                                        explodeRight.alpha = 0
                                                        //animation for bomb
                                                        self.tweens.add({
                                                            targets: explodeRight,
                                                            alpha: 1,
                                                            duration: bombDur, // Duration of the animation in milliseconds
                                                            ease: 'Linear', //Easing function ('Linear', 'EaseInOut')
                                                            onComplete: function () {
                                                                // Add a delay before destroying the explosion
                                                                self.time.delayedCall(400, function () { // 500 milliseconds (0.5 seconds) delay
                                                                    explodeRight.destroy();
                                                                }, [], self); // The last self argument ensures that the context of the destroy function is correct.
                                                            }
                                                        })
                                                    }

                                                    if (self.unbrkWallList.some(bomb => bomb.x === gridX && bomb.y === gridY + (bombnum * self.wallDim)) && bottomExplode == true) {
                                                        bottomExplode = false
                                                    }

                                                    if (bottomExplode == true) {
                                                        // Add bottom bomb
                                                        let explodeBottom = self.physics.add.group({ immovable: true }).create(gridX, gridY + (bombnum * self.wallDim), 'explode');
                                                        explodeBottom.body.setSize(self.bombSize, self.bombSize);
                                                        explodeBottom.setDisplaySize(self.bombSize, self.bombSize);

                                                        self.physics.add.overlap(explodeBottom, self.player, function (explode, player) {
                                                            if (!explode.hasDamaged) {
                                                                if (self.shield == true) {

                                                                }
                                                                else {
                                                                    self.life -= 1
                                                                    self.lifeDesc.setText(self.life + '')
                                                                    console.log(self.life);
                                                                    explode.hasDamaged = true

                                                                    self.player.setTint(0xff0000); // Set tint to red
                                                                    self.player.body.setSize(self.LevelIndicator == 1 ? beginner_level.playerSizeFirst : self.LevelIndicator == 2 ? intermediate_level.playerSizeFirst : advance_level.playerSizeFirst, self.LevelIndicator == 1 ? beginner_level.playerSizeSecond : self.LevelIndicator == 2 ? intermediate_level.playerSizeSecond : advance_level.playerSizeSecond);
                                                                    self.player.setDisplaySize(self.LevelIndicator == 1 ? beginner_level.playerDisplaySizefirst : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizefirst : advance_level.playerDisplaySizefirst, self.LevelIndicator == 1 ? beginner_level.playerDisplaySizesecond : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizesecond : advance_level.playerDisplaySizesecond);

                                                                    const originalHeight = self.player.displayHeight;
                                                                    const originalwidth = self.player.displayWidth;
                                                                    const targetHeight = originalHeight * 1.1;
                                                                    const targetWidth = originalwidth * 1.1;// Increase size by 20% (adjust as needed)
                                                                    const duration = 200; // Duration of the scaling animation in milliseconds

                                                                    // Create a smooth tween for scaling up
                                                                    self.tweens.add({
                                                                        targets: self.player,
                                                                        displayHeight: targetHeight,
                                                                        displayWidth: targetWidth,
                                                                        duration: duration,
                                                                        ease: 'Sine.out', // Use a smooth easing function
                                                                        onComplete: () => {
                                                                            // Create a smooth tween for scaling back down
                                                                            self.tweens.add({
                                                                                targets: self.player,
                                                                                displayHeight: originalHeight,
                                                                                displayWidth: originalwidth,
                                                                                duration: duration,
                                                                                ease: 'Sine.inOut', // Use a smooth easing function
                                                                            });

                                                                            self.time.delayedCall(400, () => {
                                                                                self.player.clearTint(); // Clear the tint after the scale animation
                                                                            });
                                                                        }
                                                                    });
                                                                    if (self.life <= 0) {
                                                                        self.input.keyboard.removeAllListeners();
                                                                        self.input.keyboard.enabled = false;
                                                                        self.gameTimer.paused = true;
                                                                        if (displayedWin == false) {
                                                                            self.createWinDisplay()
                                                                            displayedWin = true
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                        });

                                                        explodeBottom.alpha = 0
                                                        //animation for bomb
                                                        self.tweens.add({
                                                            targets: explodeBottom,
                                                            alpha: 1,
                                                            duration: bombDur, // Duration of the animation in milliseconds
                                                            ease: 'Linear', //Easing function ('Linear', 'EaseInOut')
                                                            onComplete: function () {
                                                                // Add a delay before destroying the explosion
                                                                self.time.delayedCall(400, function () { // 500 milliseconds (0.5 seconds) delay
                                                                    explodeBottom.destroy();
                                                                }, [], self); // The last self argument ensures that the context of the destroy function is correct.
                                                            }
                                                        })
                                                    }

                                                    bombDur += 50

                                                }
                                            }
                                        });
                                    }
                                });


                            },
                            this.handleExplosionCollision = function () {

                                self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture && child.texture.key === 'explode')), self.brkWallGroup, (explode, wall) => {
                                    //when explosion overlaps with breakable wall
                                    wall.destroy();
                                    //remove destroyed wall from brkWallList
                                    self.brkWallList = self.brkWallList.filter(item => !(item.x === wall.x && item.y === wall.y));
                                });

                                /*self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture.key === 'explode')), self.player, (explode, player) => {
 
                                    self.life -= 1
                                    console.log(self.life)
                                    
                                });*/
                                self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture && child.texture.key === 'explode')), self.ghostGroup, (explode, ghost) => {
                                    //when explosion overlaps with ghost
                                    ghost.destroy();


                                });
                                self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture && child.texture.key === 'explode')), self.probabilitySymbols, (explode, probSymbol) => {
                                    //when explosion overlaps with ghost
                                    if (probSymbol.isDrop == false) {
                                        /*self.tweens.add({
                                            targets: probSymbol,
                                            alpha: 0.5,            // minimum opacity
                                            duration: 200,
                                            yoyo: true,
                                            repeat: -1,
                                            ease: 'Sine.easeInOut'
                                        });*/

                                        probSymbol.isDrop = true
                                    }


                                });

                            },
                            this.enemyWallCollide = function (enemy, wall) {
                                const direction = ['u', 'd', 'l', 'r']
                                let randomNum = Math.floor(Math.random() * 4);
                                switch (direction[randomNum]) {
                                    case direction[0]:
                                        enemy.setVelocityY(-self.enemySpeed)
                                        enemy.setVelocityX(0)
                                        break
                                    case direction[1]:
                                        enemy.setVelocityY(self.enemySpeed)
                                        enemy.setVelocityX(0)
                                        break
                                    case direction[2]:
                                        enemy.setVelocityX(-self.enemySpeed)
                                        enemy.setVelocityY(0)
                                        break
                                    case direction[3]:
                                        enemy.setVelocityX(self.enemySpeed)
                                        enemy.setVelocityY(0)
                                        break
                                }
                            },
                            this.ghostPlayerCollide = function (ghost, player) {

                                const ghostBounds = ghost.getBounds();
                                const playerBounds = player.getBounds();

                                // Calculate overlap in X and Y
                                const overlapX = Math.max(0, Math.min(ghostBounds.right, playerBounds.right) - Math.max(ghostBounds.left, playerBounds.left));
                                const overlapY = Math.max(0, Math.min(ghostBounds.bottom, playerBounds.bottom) - Math.max(ghostBounds.top, playerBounds.top));

                                // You can choose to check either axis or both
                                // You could also use Math.max or both axes separately

                                if (Math.abs(overlapX) >= 10 && Math.abs(overlapY) >= 10) {
                                    if (self.playerHit == false) {
                                        if (self.shield == true) {

                                        }
                                        else {
                                            self.life -= 1
                                            self.lifeDesc.setText(self.life + '')

                                            self.playerHit = true;
                                            self.player.body.setSize(self.LevelIndicator == 1 ? beginner_level.playerSizeFirst : self.LevelIndicator == 2 ? intermediate_level.playerSizeFirst : advance_level.playerSizeFirst, self.LevelIndicator == 1 ? beginner_level.playerSizeSecond : self.LevelIndicator == 2 ? intermediate_level.playerSizeSecond : advance_level.playerSizeSecond);
                                            self.player.setDisplaySize(self.LevelIndicator == 1 ? beginner_level.playerDisplaySizefirst : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizefirst : advance_level.playerDisplaySizefirst, self.LevelIndicator == 1 ? beginner_level.playerDisplaySizesecond : self.LevelIndicator == 2 ? intermediate_level.playerDisplaySizesecond : advance_level.playerDisplaySizesecond);
                                            self.time.delayedCall(1500, function () { // 500 milliseconds (0.5 seconds) delay
                                                self.playerHit = false
                                            }, [], self);
                                            self.player.setTint(0xff0000); // Set tint to red

                                            const originalHeight = self.player.displayHeight;
                                            const originalwidth = self.player.displayWidth;
                                            const targetHeight = originalHeight * 1.1;
                                            const targetWidth = originalwidth * 1.1;// Increase size by 20% (adjust as needed)
                                            const duration = 200; // Duration of the scaling animation in milliseconds

                                            // Create a smooth tween for scaling-up
                                            self.tweens.add({
                                                targets: self.player,
                                                displayHeight: targetHeight,
                                                displayWidth: targetWidth,
                                                duration: duration,
                                                ease: 'Sine.out', // Use a smooth easing function
                                                onComplete: () => {
                                                    // Create a smooth tween for scaling back down
                                                    self.tweens.add({
                                                        targets: self.player,
                                                        displayHeight: originalHeight,
                                                        displayWidth: originalwidth,
                                                        duration: duration,
                                                        ease: 'Sine.inOut', // Use a smooth easing function
                                                    });

                                                    self.time.delayedCall(400, () => {
                                                        self.player.clearTint(); // Clear the tint after the scale animation
                                                    });
                                                }
                                            });
                                            if (self.life <= 0) {
                                                self.input.keyboard.removeAllListeners();
                                                self.input.keyboard.enabled = false;
                                                self.gameTimer.paused = true;
                                                if (displayedWin == false) {
                                                    this.createWinDisplay()
                                                    displayedWin = true
                                                }
                                            }
                                            console.log(self.life)
                                        }


                                    }
                                    // Your actual response to deep overlap here
                                }
                            },
                            this.ItemPlayerCollide = function (players, items) {
                                if (items.captured == false) {
                                    self.tweens.killTweensOf(items);


                                    self.tweens.add({
                                        targets: items,
                                        alpha: 0, // move up by 10 pixels
                                        duration: 300,      // time in ms
                                        ease: 'Linear',
                                        onComplete: function () {
                                            items.destroy();
                                            self.ItemList = self.ItemList.filter(item => !(item.x === items.x && item.y === items.y));
                                        }
                                    });
                                    switch (items.type) {
                                        case 'heartItem':
                                            self.life += 1
                                            console.log(self.life)
                                            self.lifeDesc.setText(self.life + '')
                                            break

                                        case 'bombItem':
                                            self.bombLimit += 1
                                            self.bombDesc.setText(self.bombLimit + '')
                                            break

                                        case 'explodeItem':
                                            self.bombRange += 1
                                            self.explodeDesc.setText(self.bombRange + '')
                                            break
                                        case 'bootsItem':
                                            if (self.isSpeed === false) {
                                                self.isSpeed = true; // Corrected from `==` to `=`
                                                self.speed += 100;

                                                // Store the timer reference so we can cancel it if needed
                                                self.speedTimer = self.time.delayedCall(5000, function () {
                                                    self.speed -= 100;
                                                    self.isSpeed = false;
                                                    self.speedTimer = null; // Clear the reference
                                                }, [], self);
                                            } else {
                                                // If already speeding, reset the timer
                                                if (self.speedTimer) {
                                                    self.speedTimer.remove(false); // Cancel the existing timer
                                                }

                                                self.speedTimer = self.time.delayedCall(5000, function () {
                                                    self.speed -= 100;
                                                    self.isSpeed = false;
                                                    self.speedTimer = null;
                                                }, [], self);
                                            }
                                            break;
                                        case 'shieldItem':
                                            if (self.shield == true) {
                                                self.tweens.killTweensOf(self.shieldHold);
                                                self.shieldHold.destroy()
                                            }
                                            self.shieldHold = self.physics.add.sprite(players.x, players.y, 'shield')
                                            self.shieldHold.body.setSize(self.wallDim - 20, self.wallDim - 20);
                                            self.shieldHold.setDisplaySize(self.wallDim - 20, self.wallDim - 20);
                                            self.shield = true

                                            self.tweens.add({
                                                targets: self.shieldHold,
                                                alpha: { from: 1, to: 0.5 },//opacity
                                                duration: self.bombDuration,
                                                ease: 'Linear',
                                                yoyo: true,// Allow alternate
                                                repeat: self.bombrepeat + 4, // Infinite loop
                                                onComplete: function () {
                                                    self.shield = false
                                                    self.shieldHold.destroy()
                                                }
                                            })
                                            break;

                                    }

                                    items.captured = true

                                }

                            },
                            this.getProbSymbol = function (player, prob) {
                                const probBounds = prob.getBounds();
                                const playerBounds = player.getBounds();

                                const overlapX = Math.max(0, Math.min(probBounds.right, playerBounds.right) - Math.max(probBounds.left, playerBounds.left));
                                const overlapY = Math.max(0, Math.min(probBounds.bottom, playerBounds.bottom) - Math.max(probBounds.top, playerBounds.top));

                                if (Math.abs(overlapX) >= 20 && Math.abs(overlapY) >= 10) {

                                    if (prob.captured == false && prob.isDrop == true && (self.numerator == "__ " || self.denominator == " __")) {
                                        self.tweens.killTweensOf(prob);


                                        self.tweens.add({
                                            targets: prob,
                                            alpha: 0,
                                            duration: 300,      // time in ms
                                            ease: 'Linear',
                                            onComplete: function () {
                                                if (self.numerator == "__ ") {
                                                    self.numerator = prob.text
                                                    answerlongText.text = `${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`
                                                    self.probNumeratorHold = prob
                                                    self.tweens.killTweensOf(prob);

                                                }
                                                else if (self.denominator == " __") {
                                                    self.denominator = prob.text
                                                    answerlongText.text = `${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`
                                                    self.probDenominatorHold = prob
                                                    self.tweens.killTweensOf(prob);

                                                    self.validateAnswer()
                                                }
                                                else {

                                                }
                                                //destroy the positon in the list
                                                //self.ItemList = self.ItemList.filter(item => !(item.x === items.x && item.y === items.y));
                                            }
                                        });
                                        prob.captured = true
                                    }
                                }

                            },
                            this.ProbPlayerCollide = function (player, prob) {
                                const probBounds = prob.getBounds();
                                const playerBounds = player.getBounds();

                                const overlapX = Math.max(0, Math.min(probBounds.right, playerBounds.right) - Math.max(probBounds.left, playerBounds.left));
                                const overlapY = Math.max(0, Math.min(probBounds.bottom, playerBounds.bottom) - Math.max(probBounds.top, playerBounds.top));

                                if (Math.abs(overlapX) >= 20 && Math.abs(overlapY) >= 10) {
                                    if (Phaser.Input.Keyboard.JustDown(self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S))) {
                                        if (prob.captured == false && prob.isDrop == true && (self.numerator == "__ " || self.denominator == " __")) {
                                            self.tweens.killTweensOf(prob);


                                            self.tweens.add({
                                                targets: prob,
                                                alpha: 0,
                                                duration: 300,      // time in ms
                                                ease: 'Linear',
                                                onComplete: function () {
                                                    if (self.numerator == "__ ") {
                                                        self.numerator = prob.text
                                                        answerlongText.text = `${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`
                                                        self.probNumeratorHold = prob
                                                        self.tweens.killTweensOf(prob);

                                                    }
                                                    else if (self.denominator == " __") {
                                                        self.denominator = prob.text
                                                        answerlongText.text = `${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`
                                                        self.probDenominatorHold = prob
                                                        self.tweens.killTweensOf(prob);

                                                        self.validateAnswer()
                                                    }
                                                    else {

                                                    }
                                                    //destroy the positon in the list
                                                    //self.ItemList = self.ItemList.filter(item => !(item.x === items.x && item.y === items.y));
                                                }
                                            });
                                            prob.captured = true
                                        }
                                    }
                                    else {

                                    }
                                }
                            },
                            this.validateAnswer = function () {
                                if (self.numerator != "__ " && self.denominator != " __") {
                                    if (self.numerator == self.questionsList[self.questionIndex].ansNumerator && self.denominator == self.questionsList[self.questionIndex].ansDenominator) {
                                        self.keyX.enabled = false;
                                        self.keyZ.enabled = false;
                                        self.keyA.enabled = false;
                                        // Set to #4af756 immediately
                                        answerlongText.setStyle({ fill: '#4af756' });
                                        longText.setStyle({ fill: '#4af756' });
                                        //change score
                                        self.score += 1
                                        self.holdScore.setText('SCORE:' + self.score + '/' + self.perfectScore)

                                        if (self.score == self.perfectScore) {
                                            self.input.keyboard.removeAllListeners();
                                            self.input.keyboard.enabled = false;
                                        }

                                        // Wait 1 second then set back to #f74a4a
                                        self.time.delayedCall(1500, () => {
                                            answerlongText.setStyle({ fill: '#f74a4a' });
                                            longText.setStyle({ fill: '#f74a4a' });
                                            self.numerator = "__ ";
                                            self.denominator = " __";
                                            self.probNumeratorHold.destroy()
                                            self.probDenominatorHold.destroy()

                                            let enableKey = true
                                            //remove the question from the list
                                            if (self.questionsList.length != 0) {
                                                self.questionsList.splice(self.questionIndex, 1);

                                                if (self.questionIndex == self.questionsList.length) {
                                                    self.questionIndex -= 1
                                                }

                                                if (self.questionsList.length != 0) {
                                                    longText.setText((self.questionsList[self.questionIndex].events).join(''))

                                                    answerlongText.setText(`${self.questionsList[self.questionIndex].probQuestion} ${self.numerator == null ? " " : self.numerator} / ${self.denominator == null ? " " : self.denominator}`)
                                                }
                                                else {
                                                    //making win display
                                                    self.gameTimer.paused = true;
                                                    if (displayedWin == false) {
                                                        this.createWinDisplay()
                                                        displayedWin = true
                                                    }

                                                    enableKey = false
                                                    longText.setText("")
                                                    answerlongText.setText("")
                                                }

                                            }
                                            if (enableKey) {
                                                self.keyX.enabled = true;
                                                self.keyZ.enabled = true;
                                                self.keyA.enabled = true;
                                            }

                                            //change


                                        });
                                    }
                                    else {
                                        self.keyX.enabled = false;
                                        self.keyZ.enabled = false;
                                        self.keyA.enabled = false;

                                        let colorObject = { t: 0 };

                                        self.tweens.add({
                                            targets: colorObject,
                                            t: 1,
                                            duration: 200,
                                            ease: 'Linear',
                                            yoyo: true,
                                            repeat: 1,
                                            onUpdate: function () {
                                                let t = colorObject.t;

                                                let r = Math.round(247 + (128 - 247) * t);
                                                let g = Math.round(74 + (0 - 74) * t);
                                                let b = Math.round(74 + (0 - 74) * t);

                                                let color = `rgb(${r},${g},${b})`;


                                                answerlongText.setStyle({ fill: color });
                                                longText.setStyle({ fill: color });
                                            },
                                            onComplete: function () {
                                                self.numerator = "__ ";
                                                self.denominator = " __";
                                                self.probNumeratorHold.alpha = 1
                                                self.probDenominatorHold.alpha = 1

                                                self.probNumeratorHold.isDrop = true
                                                self.probNumeratorHold.captured = false
                                                self.probDenominatorHold.isDrop = true
                                                self.probDenominatorHold.captured = false

                                                answerlongText.text = `${self.questionsList[self.questionIndex].probQuestion} ${self.numerator || " "} / ${self.denominator || " "}`;

                                                self.keyX.enabled = true;
                                                self.keyZ.enabled = true;
                                                self.keyA.enabled = true;
                                            }
                                        });
                                    }
                                }
                            },
                            this.createWinDisplay = function () {
                                let greetings = self.score >= Math.round(self.perfectScore * 0.60) ? "Congratulations" : "Nice Try";
                                mainGreeting = self.add.text(
                                    this.cameras.main.width / 2,
                                    75,
                                    greetings,
                                    {
                                        fontSize: '80px',
                                        fill: 'rgba(0, 0, 0, 0)', // transparent fill
                                        fontStyle: 'bold',
                                        stroke: greetings === "Congratulations" ? '#ffcc70' : '#a9a9a9', // Warm gold for Congratulations, light gray for Nice Try
                                        strokeThickness: greetings === "Congratulations" ? 3 : 2, // Thicker stroke for Congratulations
                                        shadow: {
                                            offsetX: 3,
                                            offsetY: 3,
                                            color: greetings === "Congratulations" ? '#ff8c42' : '#696969', // Deep orange/coral glow for Congratulations, dark gray for Nice Try
                                            blur: 5,
                                            stroke: true,
                                            fill: false
                                        },
                                        align: 'center'
                                    }
                                ).setOrigin(0.5);

                                //GREETING
                                mainGreeting.setScrollFactor(0);
                                mainGreeting.setDepth(4);
                                mainGreeting.alpha = 0

                                let subgreet = self.score >= Math.round(self.perfectScore * 0.60) ? "You passed" : "You failed";
                                subGreeting = self.add.text(
                                    this.cameras.main.width / 2,
                                    160,
                                    subgreet,
                                    {
                                        fontSize: '60px',
                                        fill: 'rgba(0, 0, 0, 0)', // transparent fill
                                        fontStyle: 'bold',
                                        stroke: subgreet === "You passed" ? '#ffcc70' : '#a9a9a9', // Warm gold for Congratulations, light gray for Nice Try
                                        strokeThickness: subgreet === "You passed" ? 2 : 1, // Thicker stroke for Congratulations
                                        shadow: {
                                            offsetX: 3,
                                            offsetY: 3,
                                            color: subgreet === "You passed" ? '#ff8c42' : '#696969', // Deep orange/coral glow for Congratulations, dark gray for Nice Try
                                            blur: 5,
                                            stroke: true,
                                            fill: false
                                        },
                                        align: 'center'
                                    }
                                ).setOrigin(0.5);
                                subGreeting.setScrollFactor(0);
                                subGreeting.setDepth(4);
                                subGreeting.alpha = 0


                                const scorePercentage = Phaser.Math.Clamp(self.score / self.perfectScore, 0, 1);
                                const radius = 125;
                                const centerX = this.cameras.main.width / 2;
                                const centerY = 350;
                                //scorePercentage.alpha = 0

                                // Background circle
                                circleBackground = this.add.graphics();
                                circleBackground.fillStyle(greetings == "Congratulations" ? 0x42f5ad : 0xf54269, 0.1);
                                circleBackground.fillCircle(centerX, centerY, radius);
                                circleBackground.setScrollFactor(0);
                                circleBackground.setDepth(4);

                                circleBackground.alpha = 0
                                // Score arc
                                scoreArc = this.add.graphics();
                                scoreArc.lineStyle(12, greetings == "Congratulations" ? 0x42f5ad : 0xf54269, 1); // green stroke
                                scoreArc.beginPath();
                                scoreArc.arc(centerX, centerY, radius, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(-90 + 360 * scorePercentage), false);
                                scoreArc.strokePath();
                                scoreArc.setScrollFactor(0);
                                scoreArc.setDepth(5);

                                scoreArc.alpha = 0
                                // Score label
                                scoreLabel = this.add.text(
                                    centerX,
                                    centerY - 50,
                                    `${self.score}/${self.perfectScore}`,
                                    {
                                        fontSize: '48px',
                                        fill: greetings == "Congratulations" ? "#42f5ad" : "#f54269",
                                        fontStyle: 'bold'
                                    }
                                ).setOrigin(0.5);
                                scoreLabel.setScrollFactor(0);
                                scoreLabel.setDepth(6);
                                scoreLabel.alpha = 0

                                scoreLabel2 = this.add.text(
                                    centerX,
                                    centerY + 20,
                                    `${Math.round(scorePercentage * 100)}%`,
                                    {
                                        fontSize: '27px',
                                        fill: greetings == "Congratulations" ? "#42f5ad" : "#f54269",
                                        fontStyle: 'bold'
                                    }
                                ).setOrigin(0.5);
                                scoreLabel2.setScrollFactor(0);
                                scoreLabel2.setDepth(6);
                                scoreLabel2.alpha = 0

                                scoreLabel3 = this.add.text(
                                    centerX,
                                    centerY + 60,
                                    `RANK: ${1}`,
                                    {
                                        fontSize: '27px',
                                        fill: greetings == "Congratulations" ? "#42f5ad" : "#f54269",
                                        fontStyle: 'bold'
                                    }
                                ).setOrigin(0.5);
                                scoreLabel3.setScrollFactor(0);
                                scoreLabel3.setDepth(6);
                                scoreLabel3.alpha = 0

                                proceedButton = this.add.text(this.cameras.main.width / 2, 540, 'PROCEED', {
                                    fontSize: '32px',
                                    fill: '#42f57b',
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    padding: {
                                        left: 20,
                                        right: 20,
                                        top: 10,
                                        bottom: 10
                                    },
                                    fontStyle: 'bold',
                                    align: 'center',
                                    /*stroke: '#42f57b',
                                    strokeThickness: 2*/
                                }).setOrigin(0.5).setInteractive();

                                proceedButton.setScrollFactor(0);
                                proceedButton.setDepth(5);
                                proceedButton.alpha = 0;


                                this.tweens.add({
                                    targets: [youPassedBack, mainGreeting, subGreeting, circleBackground, scoreArc, scoreLabel, scoreLabel2, scoreLabel3, proceedButton],
                                    alpha: 1,
                                    duration: 500,
                                    ease: 'Linear'
                                });
                            },
                            this.updateTimer = function () {
                                this.timeLeft--;
                                this.timerText.setText(this.formatTime(this.timeLeft));

                                if (this.timeLeft <= 0) {
                                    this.gameTimer.paused = true; // Stop the timer when it reaches 0
                                    // Add logic here for what happens when the timer runs out (e.g., game over)
                                    self.input.keyboard.removeAllListeners();
                                    self.input.keyboard.enabled = false;

                                    if (displayedWin == false) {
                                        self.createWinDisplay()
                                        displayedWin = true
                                    }
                                }
                            },
                            this.formatTime = function (seconds) {
                                // Minutes and seconds conversion
                                const minutes = Math.floor(seconds / 60);
                                const partInSeconds = seconds % 60;
                                // Adds left zeros to seconds
                                const partInSecondsPadded = partInSeconds.toString().padStart(2, '0');
                                return `${minutes}:${partInSecondsPadded}`;
                            }
                        this.stopShield = function (player, wall) {
                            if (self.shieldHold) {
                                self.shield = true
                                console.log("NoGo")

                            }
                            console.log("Go")
                        }


                        this.createBackgrounds();
                        this.createWalls();
                        this.createPlayer();
                        this.createProbAnswers()
                        this.createHolder()

                        /*this.gameTimer = this.time.addEvent({
                            delay: 1000, // Time in milliseconds (e.g., 1000 for 1 second)
                            callback: this.updateTimer, // Function to call each time the timer elapses
                            callbackScope: this, // Scope (this context) for the callback
                            loop: true // Set to false if you want it to run once
                        });
                        
                        this.timerSeconds = 0; // Variable to store the timer value
                        this.timerText = this.add.text(this.cameras.main.width - 300, 100, 'Time: 0', { fontSize: '32px', fill: '#000000' }).setScrollFactor(0); // Text to display the timer*/

                        this.initialTime = 3000; // 5 minutes in seconds
                        this.timeLeft = this.initialTime;

                        this.gameTimer = this.time.addEvent({
                            delay: 1000,
                            callback: this.updateTimer,
                            callbackScope: this,
                            loop: true
                        });

                        this.timerText = this.add.text(this.cameras.main.width - 300, 100, this.formatTime(this.timeLeft), {
                            fontSize: '50px',
                            fill: '#4af756',
                            fontStyle: "bold",
                            stroke: '#000000',
                            strokeThickness: 10,
                        }).setScrollFactor(0);



                        this.physics.add.collider(this.player, this.outsidewall);
                        this.physics.add.collider(this.player, this.topwall);
                        this.physics.add.collider(this.player, this.rightwall);
                        this.physics.add.collider(this.player, this.bottomwall);
                        this.physics.add.collider(this.player, this.brkWallGroup);
                        //this.physics.add.collider(this.player, this.bombGroup)//handleCollision alternative

                        this.physics.add.collider(this.ghostGroup, this.outsidewall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.topwall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.rightwall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.bottomwall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.brkWallGroup, this.enemyWallCollide, null, this);
                        this.physics.add.overlap(this.ghostGroup, this.player, this.ghostPlayerCollide, null, this);
                        this.physics.add.overlap(this.ItemGroup, this.player, this.ItemPlayerCollide, null, this);
                        this.physics.add.overlap(this.probabilitySymbols, this.player, this.ProbPlayerCollide, null, this)
                        //this.physics.add.collider(this.player, this.bombGroup)
                        this.cursors = this.input.keyboard.createCursorKeys();
                        self.cameras.main.scrollX = this.LevelIndicator == 1 ? beginner_level.camScrollX : this.LevelIndicator == 2 ? intermediate_level.camScrollX : advance_level.camScrollX;
                        self.cameras.main.scrollY = this.LevelIndicator == 1 ? beginner_level.camScrollY : this.LevelIndicator == 2 ? intermediate_level.camScrollY : advance_level.camScrollY;



                    },
                    update: function () {
                        //run later
                        //this.handleCollisions();
                        this.handlePlayerMovement();
                        //this.handleCameraMovement();
                        this.handleExplosionCollision();
                        //this.validateAnswer();

                    }
                },
                parent: gameRef.current,
            };

            gameInstance.current = new window.Phaser.Game(config);

            return () => {
                if (gameInstance.current) {
                    gameInstance.current.destroy(true);
                    gameInstance.current = null
                }
            };
        }
    }, []);

    return <div ref={gameRef} style={{ margin: "0", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#282c34" }} />;
}

export default PhaserGame;
