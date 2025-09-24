import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Wall from './Classes/WallClass';
import Player from './Classes/PlayerClass';
import SideItems from './Classes/SideItems';

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
                pixelArt: true,
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
                        this.load.image('heartFixed', 'images/heartFixedBG.png')
                        this.load.image('explodeFixed', 'images/explodeFixedBG.png')
                        this.load.image('bombFixed', 'images/bombFixed.png')
                        this.load.image('winloseback', 'images/winloseback.jpg')
                        this.load.image('fastenemy', 'images/fastenemy.png')
                        this.load.image('advanceenemy', 'images/advanceenemy.png')
                        this.load.image('sideItemFixed', 'images/sideItem.png')
                        this.load.image('redHexagon', 'images/redHexagon.png')
                        this.load.image('bootsItemBG', 'images/bootsItemBG.png')
                        this.load.image('shieldFixedBG', 'images/shieldFixedBG.png')
                        this.load.image('leftBanner', 'images/leftSmallBanner.png')
                        this.load.image('middleBanner', 'images/middleSmallBanner.png')
                        this.load.image('rightBanner', 'images/rightSmallBanner.png')
                        this.load.image('blackCircle', 'images/blackCircle.png')
                        this.load.image('blueCircle', 'images/blueCircle.png')
                        this.load.image('greenCircle', 'images/greenCircle.png')
                        this.load.image('orangeCircle', 'images/orangeCircle.png')
                        this.load.image('redCircle', 'images/redCircle.png')
                        this.load.image('whiteCircle', 'images/whiteCircle.png')
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
                        this.insideWallCount = 6
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
                        this.explosionRange = 1;
                        this.disableRightExplosion = false
                        this.disableLeftExplosion = false
                        this.disableTopExplosion = false
                        this.disableBottomExplosion = false

                        //Item
                        this.itemLocation = []
                        this.itemLimit = 5
                        this.itemGroup = this.physics.add.group({ immovable: true });
                        this.singleItemSpawnDuration = 2000//7 seconds

                        //Enemy
                        this.enemyLimit = 10
                        this.enemyStartingLimit = 5
                        this.enemyGroup = this.physics.add.group()
                        this.advanceEnemyGroup = this.physics.add.group()
                        this.singleEnemySpawnDuration = 2000//7 seconds

                        //SideItems
                        this.lifeSideItem = null;
                        this.heartImage = null;
                        this.bootsImage = null
                        this.shieldImage = null
                        this.explodeImage = null;
                        this.explodeTween = null
                        this.bootsTween = null;
                        this.shieldTweenSide = null

                        //Banner
                        this.bottomBannerHeight = 100
                        this.bottomBannerY = 150

                        //Classes
                        this.Wall = new Wall(this)
                        this.Player = new Player(this, this.Wall)
                        this.SideItem = new SideItems(this)

                        //assign this to self
                        const self = this

                        //game setUp
                        this.createBackground = function () {
                            self.add.sprite(-70, -500, 'ground').setOrigin(0, 0).setScale(0.8)
                        }
                        this.createSideItems = function () {
                            self.SideItem.createSideItems()
                        };
                        this.throbHeart = () => {
                            self.SideItem.throbHeart()
                        };
                        this.throbExplosion = () => {
                            self.SideItem.throbExplosion()
                        };
                        this.stopThrobExplosion = () => {
                            self.SideItem.stopThrobExplosion()
                        };
                        this.throbBoots = () => {
                            self.SideItem.throbBoots()
                        };
                        this.stopThrobBoots = () => {
                            self.SideItem.stopThrobBoots()
                        };
                        this.throbShield = () => {
                            self.SideItem.throbShield()
                        };
                        this.stopThrobShield = () => {
                            self.SideItem.stopThrobShield()
                        };
                        this.createProbQuestionHolder = function () {
                            const addBanner = (x, y, texture, w, h) => {
                                const banner = self.add.image(x, y, texture);
                                banner.setDisplaySize(w, h);
                                return banner;
                            };
                            // bottom row
                            const bottomBanners = [
                                { x: 555, y: self.bottomBannerY, texture: "leftBanner", w: 185, h: self.bottomBannerHeight },
                                { x: 740, y: self.bottomBannerY, texture: "middleBanner", w: 185, h: self.bottomBannerHeight },
                                { x: 925, y: self.bottomBannerY, texture: "rightBanner", w: 185, h: self.bottomBannerHeight },
                            ];
                            // top row
                            const topBanners = [
                                { x: 540, y: 70, texture: "leftBanner", w: 200, h: 140 },
                                { x: 740, y: 70, texture: "middleBanner", w: 200, h: 140 },
                                { x: 940, y: 70, texture: "rightBanner", w: 200, h: 140 },
                            ];
                            // create all banners
                            [...bottomBanners, ...topBanners].forEach(cfg =>
                                addBanner(cfg.x, cfg.y, cfg.texture, cfg.w, cfg.h)
                            );
                        };



                        this.createWalls = function () {

                            self.createLeftWall();
                            self.createTopWall();
                            self.createInsideWall()
                            self.createRightWall()
                            self.createBoottomWall()
                            self.createRandomInsideWall(this.insideWallCount)


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
                        this.startItemSpawnLoop = function () {
                            self.Wall.startItemSpawnLoop(this.singleItemSpawnDuration);
                        }
                        this.startEnemySpawnLoop = function () {
                            self.Wall.startEnemySpawnLoop(this.singleEnemySpawnDuration)
                        }
                        this.createStartingEnemies = function () {
                            self.Wall.createStartingEnemies()
                        }
                        this.handleEnemyCollision = (enemy) => { enemy.getData("ref").changeDirection() };
                        this.handleEnemyBehavior = () => {
                            this.enemyGroup.children.iterate((enemySprite) => {
                                if (!enemySprite) return;

                                const enemy = enemySprite.getData('ref');
                                if (!enemy) return;

                                // chance per frame to change direction
                                if (Phaser.Math.Between(0, 1000) < 7) {
                                    enemy.changeDirection();
                                }
                            });
                        }
                        this.hanldeExplosionWallOverlap = (explosion, wall) => {

                            self.tweens.add({
                                targets: wall,
                                alpha: 0,
                                duration: 100,
                                onComplete: () => wall.destroy()
                            });

                            this.brkWallList = this.brkWallList.filter(w => !(w.x === wall.x && w.y === wall.y));

                            console.log(`Breakable wall destroyed at x:${wall.x}, y:${wall.y}`);
                        }
                        this.handleExplosionEnemyOverlap = (explosion, enemy) => {
                            //Fade out then destroy
                            this.tweens.add({
                                targets: enemy,
                                alpha: 0,
                                duration: 100,
                                onComplete: () => {
                                    enemy.destroy();
                                }
                            });

                            console.log("Enemy destroyed at", enemy.x, enemy.y);
                        };
                        this.handleExplosionPlayerOverlap = () => {
                            if (!this.player.isHit && this.Player.shieldSprite == null) {
                                this.handlePlayerHit();
                                this.Player.decreaseLife()
                            }
                        }
                        this.handleItemPlayerOverlap = (player, item) => {

                            //disable body to prevent overlap
                            item.disableBody(true, false);

                            self.tweens.add({
                                targets: item,
                                alpha: 0,
                                duration: 100,
                                onComplete: () => {
                                    item.destroy()
                                }
                            });

                            this.itemLocation = this.itemLocation.filter(i => !(i.x === item.x && item.y === item.y));

                            console.log(`Item acuired at x:${item.x}, y:${item.y}`);
                            console.log(this.itemLocation)

                            if (item.texture.key === 'shieldItem') {
                                this.Player.activateShield(5000);
                            }
                            else if (item.texture.key === 'heartItem') {
                                this.Player.lifeItemOverlap();
                            }
                            else if (item.texture.key === "bootsItem") {
                                this.Player.activateSpeed(5000)
                            }
                            else if (item.texture.key === "explodeItem") {
                                this.Player.activateExplosionBuff(5000)
                            }
                        }
                        this.handlePlayerEnemyOverlap = () => {
                            if (!this.player.isHit && this.Player.shieldSprite == null) {
                                this.handlePlayerHit();
                                this.Player.decreaseLife()
                            }
                        }




                        //Method calls
                        //this.createBackground()
                        this.createPlayer()
                        this.createWalls()
                        this.createRandomItems()
                        this.startItemSpawnLoop()
                        this.startEnemySpawnLoop()
                        this.createStartingEnemies()
                        this.createSideItems()
                        this.createProbQuestionHolder()


                        //enable keyboard press
                        this.cursors = this.input.keyboard.createCursorKeys();

                        //Collision functions
                        this.physics.add.collider(this.player, this.outsidewall);
                        this.physics.add.collider(this.player, this.insidewall);
                        this.physics.add.collider(this.player, this.rightwall);
                        this.physics.add.collider(this.player, this.bottomwall);
                        this.physics.add.collider(this.player, this.topwall);
                        this.physics.add.collider(this.player, this.breakablewall);

                        this.physics.add.collider(this.enemyGroup, this.outsidewall, this.handleEnemyCollision);
                        this.physics.add.collider(this.enemyGroup, this.rightwall, this.handleEnemyCollision);
                        this.physics.add.collider(this.enemyGroup, this.bottomwall, this.handleEnemyCollision);
                        this.physics.add.collider(this.enemyGroup, this.topwall, this.handleEnemyCollision);
                        this.physics.add.collider(this.enemyGroup, this.insidewall, this.handleEnemyCollision);
                        this.physics.add.collider(this.enemyGroup, this.breakablewall, this.handleEnemyCollision);

                        this.physics.add.collider(this.advanceEnemyGroup, this.outsidewall, this.handleEnemyCollision);
                        this.physics.add.collider(this.advanceEnemyGroup, this.rightwall, this.handleEnemyCollision);
                        this.physics.add.collider(this.advanceEnemyGroup, this.bottomwall, this.handleEnemyCollision);
                        this.physics.add.collider(this.advanceEnemyGroup, this.topwall, this.handleEnemyCollision);




                        //OverlapFunctions
                        //Explosion overlaps with breakable wall
                        this.physics.add.overlap(this.explosionGroup, this.breakablewall, this.hanldeExplosionWallOverlap);
                        // Explosion overlaps with player
                        this.physics.add.overlap(this.player, this.explosionGroup, this.handleExplosionPlayerOverlap);
                        // Player overlaps with item
                        this.physics.add.overlap(this.player, this.itemGroup, this.handleItemPlayerOverlap);
                        //Player overlaps with enemy
                        this.physics.add.overlap(this.player, this.enemyGroup, this.handlePlayerEnemyOverlap);
                        this.physics.add.overlap(this.player, this.advanceEnemyGroup, this.handlePlayerEnemyOverlap);
                        //Explosion and enemy overlap
                        //Explosion kills normal enemies
                        this.physics.add.overlap(this.explosionGroup, this.enemyGroup, this.handleExplosionEnemyOverlap);

                        //Explosion kills advanced enemies
                        this.physics.add.overlap(this.explosionGroup, this.advanceEnemyGroup, this.handleExplosionEnemyOverlap);


                    },
                    update: function () {
                        this.handlePlayerMovement()
                        this.handlePlayerBomb()
                        this.Player.updateShield();
                        this.handleEnemyBehavior()
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
