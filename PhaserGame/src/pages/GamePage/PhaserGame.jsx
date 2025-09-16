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

                        //Classes
                        this.Wall = new Wall(this)
                        this.Player = new Player(this)

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


                        //Method calls
                        this.createBackground()
                        this.createPlayer()
                        this.createWalls()
                        

                        //enable keyboard press
                        this.cursors = this.input.keyboard.createCursorKeys();

                        //Collision functions
                        this.physics.add.collider(this.player, this.outsidewall);
                        this.physics.add.collider(this.player, this.insidewall);
                        this.physics.add.collider(this.player, this.rightwall);
                        this.physics.add.collider(this.player, this.bottomwall);
                        this.physics.add.collider(this.player, this.topwall);
                        this.physics.add.collider(this.player, this.breakablewall);



                    },
                    update: function () {
                        this.handlePlayerMovement()
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
