class Stars {
    constructor(self) {
        this.self = self
        this.size = 32
    }
    createStars() {
        this.self.star1 = this.self.add.image(1150, 90, "halfStar").setDisplaySize(this.size, this.size);
        this.self.star2 = this.self.add.image(1192, 70, "halfStar").setDisplaySize(this.size, this.size);
        this.self.star3 = this.self.add.image(1234, 90, "halfStar").setDisplaySize(this.size, this.size);
    }

    changeStars() {
        const animateStar = (starRef, x, y) => {
            if (!starRef) return;

            // Fade out the half star
            this.self.tweens.add({
                targets: starRef,
                alpha: 0,
                duration: 300,
                ease: "Power1",
                onComplete: () => {
                    starRef.destroy();

                    // Create new full star at the same position
                    let fullStar = this.self.add.image(x, y, "fullStar")
                        .setDisplaySize(0, 0)  // start from 0
                        .setAlpha(0);

                    // Animate display size to desired size
                    this.self.tweens.add({
                        targets: fullStar,
                        alpha: 1,
                        displayWidth: this.size,
                        displayHeight: this.size,
                        duration: 300,
                        ease: "Power1"
                    });

                    return fullStar;
                }
            });
        };

        if (this.self.pointCount == 3) {
            this.self.numberOfStars+=1
            this.self.star1 = animateStar(this.self.star1, 1150, 90) || this.self.star1;
        }
        if (this.self.pointCount == 6) {
            this.self.numberOfStars+=1
            this.self.star2 = animateStar(this.self.star2, 1192, 70) || this.self.star2;
        }
        if (this.self.pointCount == 9) {
            this.self.numberOfStars+=1
            this.self.star3 = animateStar(this.self.star3, 1234, 90) || this.self.star3;
        }
    }
}

export default Stars