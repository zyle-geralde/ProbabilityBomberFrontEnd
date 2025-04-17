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
                        this.load.spritesheet('character', 'images/spritesheet (2)nncopy.png', {
                            frameWidth: 30,
                            frameHeight: 50,
                        });
                    },
                    create: function () {
                        this.game.canvas.willReadFrequently = true;

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
                        this.itemSize = 45
                        this.ghostGroup = this.physics.add.group()
                        this.enemies = [];
                        this.enemySpeed = 30
                        this.enemySizeX = 64 + 120;
                        this.enemySizeY = 64 + 160;
                        this.numberOfEnemies = 4
                        this.deployedEnemies = 0;
                        this.cursors = null;
                        this.wallDim = 64;
                        this.wallDimy = this.wallDim + 200
                        this.wallDimx = this.wallDim + 100
                        this.holdItemDim = 74
                        this.cols = 15;//odd
                        this.rows = 8;//even
                        this.totalWallWidth = this.cols * this.wallDim;
                        this.totalWallHeight = this.rows * this.wallDim;
                        this.cameraSpeed = 150;
                        this.outsidewall = null;
                        this.topwall = null;
                        this.rightwall = null;
                        this.bottomwall = null;
                        this.bombSize = 50;
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

                        const self = this;

                        this.createBackgrounds = function () {
                            //add background
                            self.add.sprite(-500, -500, 'ground').setOrigin(0, 0);
                        },
                        this.createHolder = function () {
                            
                            //Adding fixed images
                            const fixedImage = self.add.image(80, 200, 'heartFixed');
                            fixedImage.setDisplaySize(self.holdItemDim, self.holdItemDim )
                            fixedImage.setSize(self.holdItemDim,self.holdItemDim)
                            fixedImage.setScrollFactor(0);

                            const fixedImage4 = self.add.image(80, 300, 'bombFixed');
                            fixedImage4.setDisplaySize(self.holdItemDim, self.holdItemDim )
                            fixedImage4.setSize(self.holdItemDim,self.holdItemDim)
                            fixedImage4.setScrollFactor(0);

                            const fixedImage5 = self.add.image(80, 400, 'explodeFixed');
                            fixedImage5.setDisplaySize(self.holdItemDim, self.holdItemDim )
                            fixedImage5.setSize(self.holdItemDim,self.holdItemDim)
                            fixedImage5.setScrollFactor(0);

                            //Adding textCount
                            self.lifeDesc = self.add.text(135, 175, self.life+'', {
                                fontSize: '60px',
                                fill: '#000000',
                                fontStyle: "bold"
                            });
                            self.lifeDesc.setScrollFactor(0);

                            self.bombDesc = self.add.text(135, 275, self.bombLimit+'', {
                                fontSize: '60px',
                                fill: '#000000',
                                fontStyle: "bold"
                            });
                            self.bombDesc.setScrollFactor(0);

                            self.explodeDesc = self.add.text(135, 375, self.bombRange+'', {
                                fontSize: '60px',
                                fill: '#000000',
                                fontStyle: "bold"
                            });
                            self.explodeDesc.setScrollFactor(0);

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
                                                let randnum = Math.random() < 0.50 ? 1 : 0;
                                                if (randnum == 1) {
                                                    //place item

                                                    let rendnumItem = Math.random() < 1 ? 1 : 0;
                                                    if (rendnumItem == 1) {
                                                        let itemnum = Math.floor(Math.random() * 6) + 1;
                                                        let itempick
                                                        switch (itemnum) {
                                                            case 1:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem')
                                                                itempick.type = 'heartItem'
                                                                break
                                                            case 2:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bootsItem')
                                                                itempick.type = 'bootsItem'
                                                                break
                                                            case 3:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem')
                                                                itempick.type = 'shieldItem'
                                                                break
                                                            case 4:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem')
                                                                itempick.type = 'heartItem'
                                                                break
                                                            case 5:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem')
                                                                itempick.type = 'bombItem'
                                                                break
                                                            case 6:
                                                                itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'explodeItem')
                                                                itempick.type = 'explodeItem'
                                                                break
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
                                                    let randEnemynum = Math.random() < 0.20 ? 1 : 0;
                                                    if (randEnemynum == 1 && self.deployedEnemies <= self.numberOfEnemies && nn >= 2) {
                                                        self.createEnemy(adjusttopwall, insidewall)
                                                        self.deployedEnemies += 1
                                                    }
                                                    insidewall += self.wallDim;
                                                    putWall = false;
                                                }

                                            }
                                        } else {
                                            let randnum = Math.random() < 0.50 ? 1 : 0;
                                            if (randnum == 1) {

                                                let rendnumItem = Math.random() < 1 ? 1 : 0;
                                                if (rendnumItem == 1) {
                                                    let itemnum = Math.floor(Math.random() * 6) + 1;
                                                    let itempick
                                                    switch (itemnum) {
                                                        case 1:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem')
                                                            itempick.type = 'heartItem'
                                                            break
                                                        case 2:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bootsItem')
                                                            itempick.type = 'bootsItem'
                                                            break
                                                        case 3:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem')
                                                            itempick.type = 'shieldItem'
                                                            break
                                                        case 4:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem')
                                                            itempick.type = 'bombItem'
                                                            break
                                                        case 5:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem')
                                                            itempick.type = 'bombItem'
                                                            break
                                                        case 6:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'explodeItem')
                                                            itempick.type = 'explodeItem'
                                                            break
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
                                                let randEnemynum = Math.random() < 0.20 ? 1 : 0;
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

                                            let randnum = Math.random() < 0.50 ? 1 : 0;
                                            if (randnum == 1) {

                                                let rendnumItem = Math.random() < 1 ? 1 : 0;
                                                if (rendnumItem == 1) {
                                                    let itemnum = Math.floor(Math.random() * 6) + 1;
                                                    let itempick
                                                    switch (itemnum) {
                                                        case 1:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'heartItem')
                                                            itempick.type = 'heartItem'
                                                            break
                                                        case 2:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bootsItem')
                                                            itempick.type = 'bootsItem'
                                                            break
                                                        case 3:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem')
                                                            itempick.type = 'shieldItem'
                                                            break
                                                        case 4:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'shieldItem')
                                                            itempick.type = 'shieldItem'
                                                            break
                                                        case 5:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'bombItem')
                                                            itempick.type = 'bombItem'
                                                            break
                                                        case 6:
                                                            itempick = self.ItemGroup.create(adjusttopwall, insidewall, 'explodeItem')
                                                            itempick.type = 'explodeItem'
                                                            break
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
                                                let randEnemynum = Math.random() < 0.20 ? 1 : 0;
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
                            this.createPlayer = function () {
                                self.player = self.physics.add.sprite(60, 450, 'character');
                                //self.player.setScale(48 / 30, 70 / 50);
                                self.player.body.setSize(self.wallDim - 15, self.wallDim - 3);
                                self.player.setDisplaySize(self.wallDim - 15, self.wallDim - 3);
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
                                enemy.setDisplaySize(self.bombSize, self.bombSize);
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

                                //detect Single keypress
                                if (Phaser.Input.Keyboard.JustDown(self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A))) {
                                    self.dropBomb()
                                }
                            },
                            this.handleCameraMovement = function () {
                                if (self.cursors.left.isDown && self.player.x < self.cameras.main.scrollX + 500) {
                                    self.cameras.main.scrollX -= self.cameraSpeed * self.game.loop.delta / 1000;
                                } else if (self.cursors.right.isDown && self.player.x > self.cameras.main.scrollX + self.cameras.main.width - 500) {
                                    self.cameras.main.scrollX += self.cameraSpeed * self.game.loop.delta / 1000;
                                } else if (self.cursors.up.isDown && self.player.y < self.cameras.main.scrollY + 300) {
                                    self.cameras.main.scrollY -= self.cameraSpeed * self.game.loop.delta / 1000;
                                } else if (self.cursors.down.isDown && self.player.y > self.cameras.main.scrollY + self.cameras.main.height - 300) {
                                    self.cameras.main.scrollY += self.cameraSpeed * self.game.loop.delta / 1000;
                                }
                            },
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
                                                                console.log(self.life);
                                                                explode.hasDamaged = true

                                                                self.player.setTint(0xff0000); // Set tint to red
                                                                self.player.body.setSize(self.wallDim - 15, self.wallDim - 3);
                                                                self.player.setDisplaySize(self.wallDim - 15, self.wallDim - 3);

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
                                                                console.log(self.life);
                                                                explode.hasDamaged = true


                                                                self.player.setTint(0xff0000); // Set tint to red
                                                                self.player.body.setSize(self.wallDim - 15, self.wallDim - 3);
                                                                self.player.setDisplaySize(self.wallDim - 15, self.wallDim - 3);

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
                                                                console.log(self.life);
                                                                explode.hasDamaged = true


                                                                self.player.setTint(0xff0000); // Set tint to red
                                                                self.player.body.setSize(self.wallDim - 15, self.wallDim - 3);
                                                                self.player.setDisplaySize(self.wallDim - 15, self.wallDim - 3);

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
                                                                console.log(self.life);
                                                                explode.hasDamaged = true

                                                                self.player.setTint(0xff0000); // Set tint to red
                                                                self.player.body.setSize(self.wallDim - 15, self.wallDim - 3);
                                                                self.player.setDisplaySize(self.wallDim - 15, self.wallDim - 3);

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
                                
                                self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture.key === 'explode')), self.brkWallGroup, (explode, wall) => {
                                    //when explosion overlaps with breakable wall
                                    wall.destroy();
                                    //remove destroyed wall from brkWallList
                                    self.brkWallList = self.brkWallList.filter(item => !(item.x === wall.x && item.y === wall.y));
                                });

                                /*self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture.key === 'explode')), self.player, (explode, player) => {
 
                                    self.life -= 1
                                    console.log(self.life)
                                    
                                });*/
                                self.physics.overlap(self.physics.add.group(self.children.list.filter(child => child.texture.key === 'explode')), self.ghostGroup, (explode, ghost) => {
                                    //when explosion overlaps with breakable wall
                                    ghost.destroy();
                                    //remove destroyed wall from brkWallList

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

                                            self.playerHit = true;
                                            self.player.body.setSize(self.wallDim - 15, self.wallDim - 3);
                                            self.player.setDisplaySize(self.wallDim - 15, self.wallDim - 3);
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
                                            break

                                        case 'bombItem':
                                            self.bombLimit += 1
                                            break

                                        case 'explodeItem':
                                            self.bombRange += 1
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
                        this.createHolder()

                        this.physics.add.collider(this.player, this.outsidewall);
                        this.physics.add.collider(this.player, this.topwall);
                        this.physics.add.collider(this.player, this.rightwall);
                        this.physics.add.collider(this.player, this.bottomwall);
                        this.physics.add.collider(this.player, this.brkWallGroup);

                        this.physics.add.collider(this.ghostGroup, this.outsidewall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.topwall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.rightwall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.bottomwall, this.enemyWallCollide, null, this);
                        this.physics.add.collider(this.ghostGroup, this.brkWallGroup, this.enemyWallCollide, null, this);
                        this.physics.add.overlap(this.ghostGroup, this.player, this.ghostPlayerCollide, null, this);
                        this.physics.add.overlap(this.ItemGroup, this.player, this.ItemPlayerCollide, null, this);
                        //this.physics.add.collider(this.player, this.bombGroup)
                        this.cursors = this.input.keyboard.createCursorKeys();
                        self.cameras.main.scrollX = -300;
                    },
                    update: function () {
                        //run later
                        this.handleCollisions();
                        this.handlePlayerMovement();
                        this.handleCameraMovement();
                        this.handleExplosionCollision()

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
