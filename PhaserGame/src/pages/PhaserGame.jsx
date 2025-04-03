import React, { useEffect, useRef } from 'react';

function PhaserGame() {
    const gameRef = useRef(null);
    const gameInstance = useRef(null);

    useEffect(() => {
        if (window.Phaser) {
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
                        this.load.image('ground', 'images/image 52.png');
                        this.load.image('unbrkwall', 'images/unbreakable_wall.png');
                        this.load.image('brkwall','images/brick-wall.png')
                        this.load.spritesheet('character', 'images/spritesheet (2)nncopy.png', {
                            frameWidth: 30,
                            frameHeight: 50,
                        });
                    },
                    create: function () {

                        this.wallGroup = null;
                        this.player = null;
                        this.cursors = null;
                        this.wallDim = 64;
                        this.cols = 19;
                        this.rows = 8;
                        this.totalWallWidth = this.cols * this.wallDim;
                        this.totalWallHeight = this.rows * this.wallDim;
                        this.speed = 150;
                        this.cameraSpeed = 150;
                        this.outsidewall = null;
                        this.topwall = null;
                        this.rightwall = null;
                        this.bottomwall = null;

                        const self = this;

                        this.createBackgrounds = function () { 
                            //add background
                            self.add.sprite(-500, -500, 'ground').setOrigin(0, 0);
                        }

                        this.createWalls = function() { 
                            self.wallGroup = this.physics.add.group();
                            self.createLeftWall();
                            self.createTopWall();
                            self.createRightWall();
                            self.createBottomWall();
                        }
                        this.createLeftWall= function() { 
                            self.outsidewall = self.physics.add.group({ immovable: true });
                            let adjustwall = self.wallDim;
                            for (let nn = 0; nn < self.rows; nn++) {
                                let wall = self.outsidewall.create(0, adjustwall, 'unbrkwall');
                                adjustwall += self.wallDim;
                                wall.body.setSize(self.wallDim, self.wallDim);
                                wall.setDisplaySize(self.wallDim, self.wallDim);
                            }
                        }
                        this.createTopWall= function() { 
                            self.topwall = self.physics.add.group({ immovable: true });
                            let adjusttopwall = 0;
                            let skipColumn = false;
    
                            for (let nn = 0; nn < self.cols; nn++) {
                                let wall = self.topwall.create(adjusttopwall, 0, 'unbrkwall');
                                adjusttopwall += self.wallDim;
                                wall.body.setSize(self.wallDim, self.wallDim);
                                wall.setDisplaySize(self.wallDim, self.wallDim);
    
                                if (nn >= 1 && nn <= self.cols - 4 && !skipColumn) {
                                    let insidewall = self.wallDim * 2;
                                    let putWall = true;
    
                                    for (let bb = 1; bb <= self.rows - 3; bb++) {
                                        if (putWall) {
                                            //random number to check wether to put wall or not
                                            var randnum =  Math.random() < 0.75 ? 1 : 0;
                                            if (randnum == 1) {
                                                let innerWall = self.topwall.create(adjusttopwall, insidewall, 'unbrkwall');
                                                insidewall += self.wallDim;
                                                innerWall.body.setSize(self.wallDim, self.wallDim);
                                                innerWall.setDisplaySize(self.wallDim, self.wallDim);
                                                putWall = false;
                                            }
                                            else {
                                                insidewall+=self.wallDim
                                                putWall = false;
                                            }
                                        } else {
                                            insidewall += self.wallDim;
                                            putWall = true
                                            
                                        }
                                    }
                                    skipColumn = true;
                                } else {
                                    skipColumn = false;
                                }
                            }
                        },
                        this.createRightWall=function(){ 
                            self.rightwall = self.physics.add.group({ immovable: true });
                            let adjustrightwall = self.wallDim;
                            for (let nn = 0; nn < self.rows; nn++) {
                                let wall = self.rightwall.create(self.totalWallWidth - self.wallDim, adjustrightwall, 'unbrkwall');
                                adjustrightwall += self.wallDim;
                                wall.body.setSize(self.wallDim, self.wallDim);
                                wall.setDisplaySize(self.wallDim, self.wallDim);
                            }
                        },
                        this.createBottomWall= function() { 
                            self.bottomwall = self.physics.add.group({ immovable: true });
                            let adjustbottomwall = 0;
                            for (let nn = 0; nn < self.cols; nn++) {
                                let wall = self.bottomwall.create(adjustbottomwall, self.totalWallHeight, 'unbrkwall');
                                adjustbottomwall += self.wallDim;
                                wall.body.setSize(self.wallDim, self.wallDim);
                                wall.setDisplaySize(self.wallDim, self.wallDim);
                            }
                        },
                        this.createPlayer= function() {
                            self.player = self.physics.add.sprite(60, 450, 'character');
                            self.player.setScale(48 / 30, 70 / 50);
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
                        this.handleCollisions= function () { 
                            self.physics.add.collider(self.player, self.outsidewall);
                            self.physics.add.collider(self.player, self.topwall);
                            self.physics.add.collider(self.player, self.rightwall);
                            self.physics.add.collider(self.player, self.bottomwall);
                        },
                        this.handlePlayerMovement=function () { 
                            if (self.cursors.left.isDown) {
                                self.player.setVelocityX(-self.speed);
                                self.player.setVelocityY(0);
                                self.player.anims.play('left', true);
                            } else if (self.cursors.right.isDown) {
                                self.player.setVelocityX(self.speed);
                                self.player.setVelocityY(0);
                                self.player.anims.play('right', true);
                            } else if (self.cursors.up.isDown) {
                                self.player.setVelocityY(-self.speed);
                                self.player.setVelocityX(0);
                                self.player.anims.play('right', true);
                            } else if (self.cursors.down.isDown) {
                                self.player.setVelocityY(self.speed);
                                self.player.setVelocityX(0);
                                self.player.anims.play('left', true);
                            } else {
                                self.player.setVelocityX(0);
                                self.player.setVelocityY(0);
                                self.player.anims.play('stopright');
                            }
                        },
                        this.handleCameraMovement=function() {
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


                        this.createBackgrounds();
                        this.createWalls();
                        this.createPlayer();
                        this.cursors = this.input.keyboard.createCursorKeys();
                    },
                    update:function() {
                        this.handleCollisions();
                        this.handlePlayerMovement();
                        this.handleCameraMovement();
                    }
                },
                parent: gameRef.current,
            };

            gameInstance.current = new window.Phaser.Game(config);

            return () => {
                if (gameInstance.current) {
                    gameInstance.current.destroy(true);
                }
            };
        }
    }, []);

    return <div ref={gameRef} style={{ margin: "0",display: "flex",justifyContent: "center",alignItems: "center",height: "100vh",backgroundColor: "#282c34"}} />;
}

export default PhaserGame;
