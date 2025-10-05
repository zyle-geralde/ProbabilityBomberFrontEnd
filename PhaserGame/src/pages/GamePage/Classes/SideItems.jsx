class SideItems {
    constructor(self) {
        this.self = self
    }

    createSideItems() {
        let yPos = 300;
        const yPosAdd = 85;

        //helper for items with optional text
        const addItem = (texture, size, text = null) => {
            const item = this.self.add.image(280, yPos, texture);
            item.setDisplaySize(size, size);

            let label = null;
            if (text !== null) {
                label = this.self.add.text(item.x, item.y, text, {
                    fontSize: Math.floor(size / 2) + 'px',
                    color: '#ffffff',
                    fontStyle: 'bold',
                    stroke: '#000',
                    strokeThickness: 2
                }).setOrigin(0.5);
            }

            yPos += yPosAdd;
            return { item, label };
        };

        // --- Fixed side items (scaled versions) ---
        ['sideItemFixed', 'sideItemFixed', 'sideItemFixed', 'sideItemFixed']
            .forEach(() => {
                const item = this.self.add.image(280, yPos, this.self.stage == 1?'sideItemFixed':this.self.stage == 2? "sideItemHoldStage2": "sideItemFixedStage3");
                item.setDisplaySize(80,80)
                yPos += yPosAdd;
            });

        // --- Hexagons ---
        yPos = 342;
        ['redHexagon', 'redHexagon', 'redHexagon']
            .forEach(() => {
                const item = this.self.add.image(280, yPos, 'redHexagon');
                item.setDisplaySize(40,40);
                yPos += yPosAdd;
            });

        // --- Fixed Items with display size + optional text ---
        yPos = 300;

        // Heart with life counter
        const { item: heartFixed, label: lifeText } = addItem('heartFixed', 45, this.self.Player.life);
        this.self.heartImage = heartFixed;
        this.self.lifeSideItem = lifeText;

        //Explode
        //addItem('explodeFixed', 45)
        const { item: explodeFixed } = addItem('explodeFixed', 45);
        this.self.explodeImage = explodeFixed; //keep reference for tween

        // Boots
        const { item: bootsFixed } = addItem('bootsItemBG', 45);
        this.self.bootsImage = bootsFixed; // keep reference for tween

        // Shield
        const { item: shieldFixed } = addItem('shieldFixedBG', 45);
        this.self.shieldImage = shieldFixed; // keep reference for tween

    }

    throbHeart() {
        if (this.self.heartImage) {
            const currentScaleX = this.self.heartImage.scaleX;
            const currentScaleY = this.self.heartImage.scaleY;

            this.self.tweens.add({
                targets: this.self.heartImage,
                scaleX: { from: currentScaleX, to: currentScaleX * 1.3 },
                scaleY: { from: currentScaleY, to: currentScaleY * 1.3 },
                duration: 150,
                yoyo: true,
                ease: 'Sine.easeInOut'
            });
        }
    }
    throbExplosion() {
        if (this.self.explodeImage) {
            const currentScaleX = this.self.explodeImage.scaleX;
            const currentScaleY = this.self.explodeImage.scaleY;

            // if there's already a tween, don't add duplicates
            if (this.self.explodeTween && this.self.explodeTween.isPlaying()) return;

            this.self.explodeTween = this.self.tweens.add({
                targets: this.self.explodeImage,
                scaleX: { from: currentScaleX, to: currentScaleX * 1.3 },
                scaleY: { from: currentScaleY, to: currentScaleY * 1.3 },
                duration: 250,
                yoyo: true,
                repeat: -1, // keeps throbbing
                ease: 'Sine.easeInOut'
            });
        }
    }
    stopThrobExplosion() {
        if (this.self.explodeTween) {
            this.self.explodeTween.stop();
            this.self.explodeTween = null;

            // reset to normal scale
            if (this.self.explodeImage) {
                this.self.explodeImage.setScale(45 / this.self.explodeImage.width);
            }
        }
    }
    throbBoots() {
        if (this.self.bootsImage) {
            const currentScaleX = this.self.bootsImage.scaleX;
            const currentScaleY = this.self.bootsImage.scaleY;

            if (this.self.bootsTween && this.self.bootsTween.isPlaying()) return;

            this.self.bootsTween = this.self.tweens.add({
                targets: this.self.bootsImage,
                scaleX: { from: currentScaleX, to: currentScaleX * 1.3 },
                scaleY: { from: currentScaleY, to: currentScaleY * 1.3 },
                duration: 250,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    stopThrobBoots() {
        if (this.self.bootsTween) {
            this.self.bootsTween.stop();
            this.self.bootsTween = null;

            // reset to normal scale
            if (this.self.bootsImage) {
                this.self.bootsImage.setScale(45 / this.self.bootsImage.width);
            }
        }
    }
    throbShield() {
        if (this.self.shieldImage) {
            const currentScaleX = this.self.shieldImage.scaleX;
            const currentScaleY = this.self.shieldImage.scaleY;

            if (this.self.shieldTweenSide && this.self.shieldTweenSide.isPlaying()) return;

            this.self.shieldTweenSide = this.self.tweens.add({
                targets: this.self.shieldImage,
                scaleX: { from: currentScaleX, to: currentScaleX * 1.3 },
                scaleY: { from: currentScaleY, to: currentScaleY * 1.3 },
                duration: 250,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    stopThrobShield() {
        if (this.self.shieldTweenSide) {
            this.self.shieldTweenSide.stop();
            this.self.shieldTweenSide = null;

            if (this.self.shieldImage) {
                this.self.shieldImage.setScale(45 / this.self.shieldImage.width);
            }
        }
    }
}

export default SideItems