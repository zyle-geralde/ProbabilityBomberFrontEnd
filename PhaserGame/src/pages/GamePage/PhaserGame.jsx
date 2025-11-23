import React, { useEffect, useRef, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Wall from './Classes/WallClass';
import Player from './Classes/PlayerClass';
import SideItems from './Classes/SideItems';
import Banner from './Classes/BannerClass';
import OverlapCollision from './Classes/OverlapCollisionClass';
import Points from './Classes/PointsClass';
import Stars from './Classes/StarsClass';
import Timer from './Classes/TimerClass';
import NextLevel from './Classes/NextLevel';

function PhaserGameSetUp() {
    const gameRef = useRef(null);
    const gameInstance = useRef(null);
    const location = useLocation()
    const stageNum = location.state?.stageNum ?? 1

    const navigate = useNavigate();

    //then in Phaser, call this function
    const goToStage = (stage) => {
        navigate(stage === 1 ? "/stage01Page" : stage === 2 ? "/stage02Page" : "/stage03Page");
    };

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
                        //Music
                        this.load.audio('bgMusic', 'sounds/backgroundGamemusic.mp3');
                        this.load.audio('explosionMusic', 'sounds/explosion01.wav');
                        this.load.audio('collectItemMusic', 'sounds/collect.wav');
                        this.load.audio('playerHitMusic', 'sounds/playerhit.mp3');
                        this.load.audio('correctAnswerMusic', 'sounds/correct.wav');
                        this.load.audio('wrongAnswerMusic', 'sounds/wrong.wav');
                        this.load.audio('gameOverSounds', 'sounds/ThisGameIsOver.wav');

                        //Stage Background
                        this.load.image("stage1Back", 'images/background-candy.png');
                        this.load.image("stage2Back", 'images/background-cards.png');
                        this.load.image("stage3Back", 'images/background-colore-balls.png');
                        //images
                        this.load.image("background1", 'images/backgroundDispF.png');
                        this.load.image("candy1", "images/candy (1).png");
                        this.load.image("candy-cane", "images/candy-cane.png");
                        this.load.image("candy", "images/candy.png")
                        this.load.image("cotton-candy", "images/cotton-candy.png")
                        this.load.image("sweets", "images/sweets.png")
                        this.load.image("carddeck", "images/carddeck.jpg")
                        this.load.image("background2", 'images/backgroundDispS.png')
                        this.load.image("background3", 'images/backgroundDisp3.png')
                        this.load.image("backgroundStage2", "images/panel_square_screws.png")
                        this.load.image("unbrkableWallStage2", "images/panel_glass_screws.png")

                        this.load.image("brkableWallStage2", "images/button_square_header_blade_square_screws.png")
                        this.load.image("sideItemHoldStage2", "images/button_square_header_small_square.png")
                        this.load.image("titleDisplayStage2", "images/button_square_header_large_square.png")
                        this.load.image("backgroundStage3", "images/extra_dirt_top.png")
                        this.load.image("unbrkableWallStage3", "images/extra_character_e.png")
                        this.load.image("brkableWallStage3", "images/extra_crate_explosive.png")
                        this.load.image("sideItemFixedStage3", "images/extra_stone_detail.png")
                        this.load.image("titleDisplayStage3", "images/extra_stone_top.png")

                        this.load.image("tileDisplay", "images/tileDisplay.png")
                        this.load.image('ground', 'images/background-whiteArtboard 1.png');
                        this.load.image('unbrkwall', 'images/newUnbrkWall.png');
                        this.load.image('brkwall', 'images/backgroundDisp3.png')
                        this.load.image('bomb', stageNum != 3?'images/bomb.png': 'images/bombStage3.png')
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
                        this.load.image('fullStar', 'images/fullStar.png')
                        this.load.image('halfStar', 'images/halfStar.png')
                        this.load.image('leftFinalBanner', 'images/leftFinalBanner.png')
                        this.load.image('middleFinalBanner', 'images/middleFinalBanner.png')
                        this.load.image('rightFinalBanner', 'images/rightFinalBanner.png')
                        this.load.image("backGameButton", "images/backGameButton.png")
                        this.load.spritesheet('character', 'images/spritesheet (2)nncopy.png', {
                            frameWidth: 42,
                            frameHeight: 72,
                        });
                    },
                    create: function () {
                        //GameInfo
                        this.stage = stageNum;
                        this.allowInputs = true
                        this.isGameDone = false
                        this.levelEnemyPicked = null
                        this.levelIndic = 1
                        this.pointNeed = 3
                        this.durationNeed = this.stage == 1 ? 10 : 20
                        this.availableEnemyList = [1]
                        this.goToStageFunc = goToStage

                        //Wall
                        this.wallGroup = null;
                        this.wallDim = 45
                        this.wallDimy = 45
                        this.wallDimx = 45
                        this.holdItemDim = 74
                        this.cols = this.stage == 1?13:15//odd
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
                        this.numeratorAnswer = null
                        this.denominatorAnswer = null

                        //Bomb
                        this.bombLocation = []
                        this.bombLimit = 2
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
                        this.itemLimit = 2
                        this.itemGroup = this.physics.add.group({ immovable: true });
                        this.singleItemSpawnDuration = 4000//7 seconds

                        //Enemy
                        this.enemyLimit = this.stage == 1?3:this.stage == 2?4:4
                        this.enemyStartingLimit = 5
                        this.enemyGroup = this.physics.add.group()
                        this.advanceEnemyGroup = this.physics.add.group()
                        this.singleEnemySpawnDuration = 4000//7 seconds

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
                        this.wallTextGroup = this.add.group();
                        this.textAfter = null
                        this.textIndicator = 1;
                        this.randomSign = null
                        this.bottomContainer = null
                        this.topContainer = null
                        this.textBottom = null
                        this.redCircle = null

                        //Stage 1
                        this.sampleSize = null
                        this.colorPicked = null
                        this.givenSample = []
                        this.coloredBallGiven = []
                        this.probAnswer = []

                        //Stage 2
                        this.eventText = null

                        //Stage 3
                        this.colorPicked2 = null
                        this.eventType = null
                        this.pickedColorImg1 = null
                        this.pickedColorImg2 = null
                        this.textSymbol = null


                        //Probability questions and answer
                        this.probabilityNumbers = [1, 2, 25, 30, 5, 45]

                        //Points
                        this.pointCount = 0
                        this.pointText = null

                        //Stars
                        this.numberOfStars = 0
                        this.star1 = null
                        this.star2 = null
                        this.star3 = null

                        //Timer
                        this.startTime = null
                        this.timeText = null


                        //Classes
                        this.Wall = new Wall(this)
                        this.Player = new Player(this, this.Wall)
                        this.SideItem = new SideItems(this)
                        this.Banner = new Banner(this)
                        this.OverlapCollision = new OverlapCollision(this)
                        this.Points = new Points(this)
                        this.Stars = new Stars(this)
                        this.Timer = new Timer(this)
                        this.NextLevel = new NextLevel(this)

                        //Sounds
                        this.explosionSoundKey = 'explosionMusic'; 
                        this.sound.add(this.explosionSoundKey, { volume: 1 });

                        this.collectItemSoundKey = 'collectItemMusic'; 
                        this.sound.add(this.collectItemSoundKey, { volume: 1 });

                        this.playerHitSoundKey = 'playerHitMusic'; 
                        this.sound.add(this.playerHitSoundKey, { volume: 1 });

                        this.correctAnswerSoundKey = 'correctAnswerMusic'; 
                        this.sound.add(this.correctAnswerSoundKey, { volume: 1 });

                        
                        this.wrongAnswerSoundKey = 'wrongAnswerMusic'; 
                        this.sound.add(this.wrongAnswerSoundKey, { volume: 1 });

                        this.gameOverSoundKey = 'gameOverSounds'; 
                        this.sound.add(this.gameOverSoundKey, { volume: 1 });
                        

                        //assign this to self
                        const self = this

                        //game setUp
                        this.createBackground = function () {
                            self.Wall.createBackground()
                        };
                        this.createFinishPage = function () {
                            //Disable inputs
                            this.allowInputs = false;
                            this.input.keyboard.enabled = false;
                            this.input.enabled = false;

                            //Create a full screen black rectangle (initially invisible)
                            const overlay = this.add.graphics();
                            overlay.fillStyle(0x000000, 1); //full black
                            overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
                            overlay.setAlpha(0); //start transparent

                            //Put overlay above everything else
                            overlay.setScrollFactor(0);
                            overlay.setDepth(9999);

                            //Tween fade-in effect
                            this.tweens.add({
                                targets: overlay,
                                alpha: 0.5,          //final opacity
                                duration: 800,       //fade-in time (ms)
                                ease: 'Power2'       //easing curve
                            });
                        };

                        this.createPoints = function () {
                            self.Points.createPoints()
                        }
                        this.createStars = function () {
                            self.Stars.createStars()
                        }
                        this.createTimer = function () {
                            this.Timer.startTimer()
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
                            self.Banner.createProbQuestionHolder()
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
                        this.resetTextAfter = function () {
                            self.OverlapCollision.resetTextAfter()
                        };
                        this.handleEnemyCollision = (enemy) => { enemy.getData("ref").changeDirection() };
                        this.handleEnemyBehavior = () => {
                            self.OverlapCollision.handleEnemyBehavior()
                        }
                        this.hanldeExplosionWallOverlap = (explosion, wall) => {

                            self.OverlapCollision.hanldeExplosionWallOverlap(explosion, wall)
                        }
                        this.handleExplosionEnemyOverlap = (explosion, enemy) => {
                            self.OverlapCollision.handleExplosionEnemyOverlap(explosion, enemy)
                        };
                        this.handleExplosionPlayerOverlap = () => {
                            self.OverlapCollision.handleExplosionPlayerOverlap()
                        }
                        this.handleItemPlayerOverlap = (player, item) => {

                            self.OverlapCollision.handleItemPlayerOverlap(player, item)
                        }
                        this.handlePlayerEnemyOverlap = () => {
                            self.OverlapCollision.handlePlayerEnemyOverlap()
                        }
                        this.handlePlayerWallTextOverlap = function () {
                            self.OverlapCollision.handlePlayerWallTextOverlap()

                        }
                        this.handleResetAnswer = function () {
                            self.OverlapCollision.handleResetAnswer()
                        }



                        //Play background music
                        this.bgMusic = this.sound.add('bgMusic', {
                            loop: true,
                            volume: 0.2
                        });
                        this.bgMusic.play();

                        //Method calls
                        this.createBackground()
                        this.createTimer()
                        this.createProbQuestionHolder()
                        this.createPoints()
                        this.createStars()
                        this.createPlayer()
                        this.createWalls()
                        //this.createRandomItems()
                        this.startItemSpawnLoop()
                        this.startEnemySpawnLoop()
                        //this.createStartingEnemies()
                        this.createSideItems()



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
                        this.handlePlayerWallTextOverlap()
                        this.handleResetAnswer()
                        this.Timer.updateTimer()
                    }
                },
                parent: gameRef.current,
            };

            gameInstance.current = new window.Phaser.Game(config);

            return () => {
                if (gameInstance.current) {
                    gameInstance.current.sound?.stopAll();
                    gameInstance.current.destroy(true);
                    gameInstance.current = null
                }
            };
        }
    }, []);

    return <div ref={gameRef} style={{ margin: "0", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#282c34" }} />;
}

export default PhaserGameSetUp;
