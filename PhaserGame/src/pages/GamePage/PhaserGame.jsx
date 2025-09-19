import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Wall from './Classes/WallClass';
import Player from './Classes/PlayerClass';

function PhaserGameSetUp() {
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
                        this.load.image('fastenemy', 'images/fastenemy.png')
                        this.load.image('advanceenemy', 'images/advanceenemy.png')
                        this.load.spritesheet('character', 'images/spritesheet (2)nncopy.png', {
                            frameWidth: 42,
                            frameHeight: 72,
                        });
                    },
                    create: function () {
                        //GameInfo
                        this.stage = 1;
                        //Wall
                        this.wallGroup = null;
                        this.wallDim = 45
                        this.wallDimy = 45
                        this.wallDimx = 45
                        this.holdItemDim = 74
                        this.cols = 13//odd
                        this.rows = 8//even
                        this.totalWallWidth = this.cols * this.wallDim;
                        this.totalWallHeight = this.rows * this.wallDim;
                        this.breakablewall = null
                        this.outsidewall = null;
                        this.insidewall = null
                        this.topwall = null;
                        this.rightwall = null;
                        this.bottomwall = null;
                        this.unbrkWallList = []
                        this.brkWallList = []

                        //Player
                        this.player = null

                        //Bomb
                        this.bombLocation = []
                        this.bombLimit = 100
                        this.bombGroup = this.physics.add.group({ immovable: true });

                        //Explosion
                        this.explosionLocation = []
                        this.explosionLimit = 1
                        this.explosionGroup = this.physics.add.group({ immovable: true });

                        //Item
                        this.itemLocation = []
                        this.itemLimit = 5
                        this.itemGroup = this.physics.add.group({ immovable: true });

                        //Classes
                        this.Wall = new Wall(this)
                        this.Player = new Player(this, this.Wall)

                        //assign this to self
                        const self = this

                        //game setUp
                        this.createBackground = function () {
                            self.add.sprite(-70, -500, 'ground').setOrigin(0, 0).setScale(0.8)
                        }

                        this.createWalls = function () {

                            self.createLeftWall();
                            self.createTopWall();
                            self.createInsideWall()
                            self.createRightWall()
                            self.createBoottomWall()
                            self.createRandomInsideWall()


                        }

                        this.createLeftWall = function () {

                            self.Wall.createLeftWalls()
                        }
                        this.createTopWall = function () {
                            self.Wall.createTopWalls()
                        }
                        this.createInsideWall = function () {
                            self.Wall.createInsideWalls()
                        }
                        this.createRightWall = function () {
                            self.Wall.createRightWalls()
                        }
                        this.createBoottomWall = function () {
                            self.Wall.createBottomWalls()
                        }
                        this.createRandomInsideWall = function () {
                            self.Wall.createRandomInsideWalls()
                        }
                        this.createPlayer = function () {
                            self.Player.createPlayer()

                            self.Player.playerAnimation()
                        }
                        this.handlePlayerMovement = function () {
                            self.Player.handlePlayerMovement()
                        }
                        this.dropBomb = function () {
                            self.Player.dropBomb()
                        }
                        this.createRandomItems = function () {
                            self.Wall.createRandomItems(self.itemLimit)
                        }
                        this.handlePlayerBomb = function () {
                            self.Player.handlePlayerBomb()
                        }
                        this.handlePlayerHit = () => {

                            self.Player.handlePlayerHit()
                        };
                        



                        //Method calls
                        this.createBackground()
                        this.createPlayer()
                        this.createWalls()
                        this.createRandomItems()


                        //enable keyboard press
                        this.cursors = this.input.keyboard.createCursorKeys();

                        //Collision functions
                        this.physics.add.collider(this.player, this.outsidewall);
                        this.physics.add.collider(this.player, this.insidewall);
                        this.physics.add.collider(this.player, this.rightwall);
                        this.physics.add.collider(this.player, this.bottomwall);
                        this.physics.add.collider(this.player, this.topwall);
                        this.physics.add.collider(this.player, this.breakablewall);

                        //OverlapFunctions
                        //Explosion overlaps with breakable wall
                        this.physics.add.overlap(this.explosionGroup, this.breakablewall, (explosion, wall) => {

                            self.tweens.add({
                                targets: wall,
                                alpha: 0,
                                duration: 100,
                                onComplete: () => wall.destroy()
                            });

                            this.brkWallList = this.brkWallList.filter(w => !(w.x === wall.x && w.y === wall.y));

                            console.log(`Breakable wall destroyed at x:${wall.x}, y:${wall.y}`);
                        });
                        // Explosion overlaps with player
                        this.physics.add.overlap(this.player, this.explosionGroup, () => {
                            if (!this.player.isHit) {
                                this.handlePlayerHit();
                            }
                        });





                    },
                    update: function () {
                        this.handlePlayerMovement()
                        this.handlePlayerBomb()
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

export default PhaserGameSetUp;
