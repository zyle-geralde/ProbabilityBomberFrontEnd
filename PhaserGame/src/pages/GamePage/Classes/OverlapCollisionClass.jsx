class OverlapCollision {
    constructor(self) {
        this.self = self
    }

    resetTextAfter() {
        if (this.self.stage == 2) {
            if (this.self.textAfter) {

                this.self.textAfter.setText(this.self.eventText);


                this.self.textIndicator = 1;

                //Reset wallText visuals and pressable state
                this.self.wallTextGroup.children.iterate(wallText => {
                    wallText.setAlpha(1); // fully visible again
                    wallText.setData("pressed", false);
                });

                this.self.numeratorAnswer = null
                this.self.denominatorAnswer = null
            }
        }
        else if (this.self.stage == 3) {
            if (this.self.textAfter) {

                this.self.textAfter.setText(") = -- / --");
                

                this.self.textIndicator = 1;

                //Reset wallText visuals and pressable state
                this.self.wallTextGroup.children.iterate(wallText => {
                    wallText.setAlpha(1); // fully visible again
                    wallText.setData("pressed", false);
                });

                this.self.numeratorAnswer = null
                this.self.denominatorAnswer = null
            }
        }
        else {
            if (this.self.textAfter && this.self.randomSign != null) {
                if (this.self.randomSign) {
                    this.self.textAfter.setText("') = -- / --");
                }
                else {
                    this.self.textAfter.setText(") = -- / --");
                }

                this.self.textIndicator = 1;

                //Reset wallText visuals and pressable state
                this.self.wallTextGroup.children.iterate(wallText => {
                    wallText.setAlpha(1); // fully visible again
                    wallText.setData("pressed", false);
                });

                this.self.numeratorAnswer = null
                this.self.denominatorAnswer = null
            }
        }

    }
    handleEnemyBehavior() {
        this.self.enemyGroup.children.iterate((enemySprite) => {
            if (!enemySprite) return;

            const enemy = enemySprite.getData('ref');
            if (!enemy) return;

            // chance per frame to change direction
            if (Phaser.Math.Between(0, 1000) < 7) {
                enemy.changeDirection();
            }
        });
    }
    hanldeExplosionWallOverlap(explosion, wall) {
        this.self.tweens.add({
            targets: wall,
            alpha: 0,
            duration: 100,
            onComplete: () => wall.destroy()
        });

        this.self.brkWallList = this.self.brkWallList.filter(w => !(w.x === wall.x && w.y === wall.y));

        console.log(`Breakable wall destroyed at x:${wall.x}, y:${wall.y}`);
    }
    handleExplosionEnemyOverlap(explosion, enemy) {
        //Fade out then destroy
        this.self.tweens.add({
            targets: enemy,
            alpha: 0,
            duration: 100,
            onComplete: () => {
                enemy.destroy();
            }
        });

        console.log("Enemy destroyed at", enemy.x, enemy.y);
    }

    handleExplosionPlayerOverlap = () => {
        if (!this.self.player.isHit && this.self.Player.shieldSprite == null) {
            this.self.handlePlayerHit();
            this.self.Player.decreaseLife()
        }
    }
    handleItemPlayerOverlap(player, item) {
        //disable body to prevent overlap
        item.disableBody(true, false);

        this.self.tweens.add({
            targets: item,
            alpha: 0,
            duration: 100,
            onComplete: () => {
                item.destroy()
            }
        });

        this.self.itemLocation = this.self.itemLocation.filter(i => !(i.x === item.x && item.y === item.y));

        console.log(`Item acuired at x:${item.x}, y:${item.y}`);
        console.log(this.self.itemLocation)

        if (item.texture.key === 'shieldItem') {
            this.self.Player.activateShield(5000);
        }
        else if (item.texture.key === 'heartItem') {
            this.self.Player.lifeItemOverlap();
        }
        else if (item.texture.key === "bootsItem") {
            this.self.Player.activateSpeed(5000)
        }
        else if (item.texture.key === "explodeItem") {
            this.self.Player.activateExplosionBuff(5000)
        }
    }
    handlePlayerEnemyOverlap() {
        if (!this.self.player.isHit && this.self.Player.shieldSprite == null) {
            this.self.handlePlayerHit();
            this.self.Player.decreaseLife()
        }
    }
    handlePlayerWallTextOverlap() {
        if (this.self.wallTextGroup) {
            this.self.physics.overlap(this.self.player, this.self.wallTextGroup, (player, wallText) => {
                if (this.self.allowInputs == true && Phaser.Input.Keyboard.JustDown(this.self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S))) {

                    if (wallText.getData("pressed")) {

                        return;
                    }



                    if (this.self.textIndicator > 2) {
                        return
                    }

                    if (this.self.textAfter) {
                        const chosenNumber = wallText.text;   // number from wall
                        let currentText = this.self.textAfter.text;

                        // Split into characters so we can replace specific underscores
                        let chars = currentText.split("");
                        console.log(chars)

                        if (this.self.textIndicator === 1) {
                            if (chosenNumber.length === 1) {
                                // replace the 2nd underscore
                                let underscoreIndex = chars.indexOf("-", 1);

                                if (underscoreIndex !== -1) {
                                    chars[underscoreIndex + 1] = chosenNumber;
                                    chars[underscoreIndex] = "_"
                                }
                                console.log("single digit")
                            } else {
                                // double digit → replace 1st and 2nd underscores
                                let firstIdx = chars.indexOf("-");
                                if (firstIdx !== -1) {
                                    chars[firstIdx] = chosenNumber[0];
                                    let secondIdx = chars.indexOf("-", firstIdx + 1);
                                    if (secondIdx !== -1) chars[secondIdx] = chosenNumber[1];
                                }
                            }
                            this.self.numeratorAnswer = parseInt(chosenNumber)
                            this.self.textIndicator = 2;
                        }
                        else if (this.self.textIndicator === 2) {
                            if (chosenNumber.length === 1) {

                                let underscoreIndex = chars.indexOf("-", 1);

                                if (underscoreIndex !== -1) {
                                    chars[underscoreIndex] = chosenNumber;
                                    chars[underscoreIndex + 1] = "_"
                                }
                                console.log("single digit")

                            } else {
                                // double digit → replace 1st and 2nd underscores
                                let firstIdx = chars.indexOf("-");
                                if (firstIdx !== -1) {
                                    chars[firstIdx] = chosenNumber[0];
                                    let secondIdx = chars.indexOf("-", firstIdx + 1);
                                    if (secondIdx !== -1) chars[secondIdx] = chosenNumber[1];
                                }
                            }
                            this.self.denominatorAnswer = parseInt(chosenNumber)

                            //Checking answer
                            if (parseInt(this.self.numeratorAnswer) !== parseInt(this.self.probAnswer[0]) || parseInt(this.self.denominatorAnswer) !== parseInt(this.self.probAnswer[1])) {
                                console.log("Wrong")

                                this.self.allowInputs = false;
                                this.self.tweens.add({
                                    targets: [this.self.textAfter, this.self.textBottom,this.self.textSymbol],
                                    alpha: { from: 1, to: 0.3 },   // fade in/out
                                    duration: 500,               // quick blink
                                    repeat: 1,                   // number of flickers
                                    yoyo: true,
                                    onStart: () => {
                                        if (this.self.stage == 2) {
                                            this.self.textAfter.setColor("#ff0000")
                                        }
                                        else {
                                            if (this.self.stage == 3) {
                                                this.self.textSymbol.setColor("#ff0000")
                                            }
                                            this.self.textAfter.setColor("#ff0000")
                                            this.self.textBottom.setColor("#ff0000")
                                        }
                                    },
                                    onComplete: () => {
                                        if (this.self.stage == 2) {
                                            this.self.allowInputs = true
                                            this.self.textAfter.setColor("#ffffff");
                                            this.self.textAfter.setAlpha(1); // reset visibility
                                            this.self.resetTextAfter();
                                        }
                                        else {
                                            if (this.self.stage == 3) {
                                                this.self.textSymbol.setColor("#ffffff");
                                                this.self.textSymbol.setAlpha(1);
                                            }
                                            this.self.allowInputs = true
                                            this.self.textAfter.setColor("#ffffff");
                                            this.self.textBottom.setColor("#ffffff")
                                            this.self.textAfter.setAlpha(1); // reset visibility
                                            this.self.textBottom.setAlpha(1); // reset visibility
                                            this.self.resetTextAfter();
                                        }


                                        //change problem

                                    }
                                });

                            }
                            else {
                                console.log("Correct")

                                this.self.allowInputs = false;
                                this.self.tweens.add({
                                    targets: [this.self.textAfter, this.self.textBottom, this.self.textSymbol],
                                    alpha: { from: 1, to: 0.3 },
                                    duration: 500,
                                    repeat: 1,
                                    yoyo: true,
                                    onStart: () => {
                                        if (this.self.stage == 2) {
                                            this.self.textAfter.setColor("#00ff00"); // green
                                        }
                                        else {
                                            if (this.self.stage == 3) {
                                                this.self.textSymbol.setColor("#00ff00");
                                            }
                                            this.self.textAfter.setColor("#00ff00"); // green
                                            this.self.textBottom.setColor("#00ff00");
                                        }
                                        
                                    },
                                    onComplete: () => {
                                        this.self.allowInputs = true;
                                        if (this.self.stage == 2) {
                                            this.self.textAfter.setColor("#ffffff"); // reset to white
                                            this.self.textAfter.setAlpha(1);
                                        }
                                        else {
                                            if (this.self.stage == 3) {
                                                this.self.textSymbol.setColor("#ffffff");
                                                this.self.textSymbol.setAlpha(1);
                                            }
                                            this.self.textAfter.setColor("#ffffff"); // reset to white
                                            this.self.textBottom.setColor("#ffffff");
                                            this.self.textAfter.setAlpha(1); // reset visibility
                                            this.self.textBottom.setAlpha(1); // reset visibility
                                        }
                                        
                                        

                                        this.self.Points.addPoints();

                                        this.self.Points.createPoints()

                                        this.self.Stars.changeStars()


                                        //Destroy random inside walls
                                        if (this.self.breakablewall) {
                                            let walls = this.self.breakablewall.getChildren();
                                            let totalWalls = walls.length;  //dynamic count
                                            let destroyed = 0;

                                            walls.forEach(wall => {
                                                if (wall) {
                                                    this.self.tweens.add({
                                                        targets: wall,
                                                        alpha: 0,
                                                        duration: 300,
                                                        onComplete: () => {
                                                            wall.destroy();
                                                            destroyed++;

                                                            //respawn only when ALL are destroyed
                                                            if (destroyed === totalWalls) {
                                                                this.self.brkWallList = [];
                                                                this.self.Wall.createRandomInsideWallsEnemyAdjustment();

                                                                this.self.physics.add.collider(this.self.player, this.self.breakablewall);
                                                                this.self.physics.add.collider(this.self.enemyGroup, this.self.breakablewall, this.self.handleEnemyCollision);
                                                                this.self.physics.add.overlap(this.self.explosionGroup, this.self.breakablewall, this.self.hanldeExplosionWallOverlap);
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }


                                        //Destroy wall text numbers
                                        if (this.self.wallTextGroup) {
                                            this.self.wallTextGroup.children.iterate(wallText => {
                                                this.self.tweens.add({
                                                    targets: wallText,
                                                    alpha: 0,
                                                    duration: 300,
                                                    onComplete: () => wallText.destroy()
                                                });
                                            });
                                        }

                                        this.self.resetTextAfter();
                                        this.self.Banner.createProbQuestionHolder()
                                        console.log("Done")
                                    }
                                });
                            }
                            this.self.textIndicator = 3
                        }

                        this.self.textAfter.setText(chars.join(""));

                        //mark wallText as pressed make it transparent
                        wallText.setAlpha(0.0);
                        wallText.setData("pressed", true);
                    }
                }
                else {
                }
            });
        }
        else {
            console.log("No walltextgroup")
        }
    }

    handleResetAnswer() {
        if (this.self.allowInputs && Phaser.Input.Keyboard.JustDown(this.self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X))) {
            this.self.resetTextAfter();
        }
    }
}

export default OverlapCollision