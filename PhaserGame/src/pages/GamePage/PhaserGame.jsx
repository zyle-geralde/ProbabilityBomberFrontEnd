import React, { useEffect, useRef,useState } from 'react';
import { useLocation } from 'react-router-dom';
import Wall from './Classes/WallClass';

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
                        this.wallGroup = null;
                        this.wallDim = 60
                        this.wallDimy = 60
                        this.wallDimx = 60
                        this.holdItemDim = 74
                        this.cols = 13//odd
                        this.rows = 6//even
                        this.totalWallWidth = this.cols * this.wallDim;
                        this.totalWallHeight = this.rows * this.wallDim;
                        this.outsidewall = null;
                        this.topwall = null;
                        this.rightwall = null;
                        this.bottomwall = null;
                        this.unbrkWallList = []
                        this.brkWallList = []
                        this.brkWallGroup = null
                        
                        const self = this

                        //game setUp
                        this.createBackground = function () {
                            self.add.sprite(-70,-500,'ground').setOrigin(0,0).setScale(0.8)
                        }

                        this.createWalls = function () {
                            self.wallGroup = this.physics.add.group();
                            self.createLeftWall();
                            /*self.createTopWall();
                            self.createRightWall();
                            self.createBottomWall();*/

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


                        //Method calls
                        this.createBackground()
                        this.createWalls()
                        
                    },
                    update: function () {
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
    },[]);

    return <div ref={gameRef} style={{ margin: "0", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#282c34" }} />;
}

export default PhaserGameSetUp;
