class Banner {
    constructor(self) {
        this.self = self
    }

    createProbQuestionHolder() {
        // --- Bottom banners (grouped into a container) ---
        const bannerLeft = this.self.add.image(555, this.self.bottomBannerY, "leftBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerMid = this.self.add.image(740, this.self.bottomBannerY, "middleBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerRight = this.self.add.image(925, this.self.bottomBannerY, "rightBanner").setDisplaySize(185, this.self.bottomBannerHeight);

        // store container so we can add text later
        this.bottomContainer = this.self.add.container(0, 0, [bannerLeft, bannerMid, bannerRight]);

        // --- Top banners (leave plain for now) ---
        const topLeft = this.self.add.image(540, 70, "leftBanner").setDisplaySize(200, 140);
        const topMid = this.self.add.image(740, 70, "middleBanner").setDisplaySize(200, 140);
        const topRight = this.self.add.image(940, 70, "rightBanner").setDisplaySize(200, 140);

        this.topContainer = this.self.add.container(0, 0, [topLeft, topMid, topRight]);

        const imageNames = ["redCircle", "whiteCircle", "blueCircle", "blackCircle", "greenCircle", "orangeCircle"]

        const randomImage = imageNames[Math.floor(Math.random() * imageNames.length)];

        const isComplement = [true, false]
        const randomSign = isComplement[Math.floor(Math.random() * isComplement.length)];

        this.addBottomTextWithCircle(randomImage, randomSign)
        this.addTopTextWithCircle(imageNames);
    }

    addBottomTextWithCircle(imageName, randomSign) {
        if (!this.bottomContainer) {
            console.warn("Bottom container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        let textBefore = null
        let redCircle = null
        let textAfter = null
        if (!randomSign) {
            // Text BEFORE the circle
            textBefore = this.self.add.text(640, this.self.bottomBannerY, "P(", {
                fontSize: "27px",
                color: "#fff",
                fontStyle: "bold",
                align: "center"
            }).setOrigin(0.5);

            // Circle image
            redCircle = this.self.add.image(672, this.self.bottomBannerY, imageName).setDisplaySize(30, 30);

            // Text AFTER the circle
            textAfter = this.self.add.text(760, this.self.bottomBannerY, ") = _ / _", {
                fontSize: "27px",
                color: "#fff",
                fontStyle: "bold",
                align: "center"
            }).setOrigin(0.5);
        }
        else {
            // Text BEFORE the circle
            textBefore = this.self.add.text(640, this.self.bottomBannerY, "P(", {
                fontSize: "27px",
                color: "#fff",
                fontStyle: "bold",
                align: "center"
            }).setOrigin(0.5);

            // Circle image
            redCircle = this.self.add.image(672, this.self.bottomBannerY, imageName).setDisplaySize(30, 30);

            // Text AFTER the circle
            textAfter = this.self.add.text(760, this.self.bottomBannerY, " ') = _ / _", {
                fontSize: "27px",
                color: "#fff",
                fontStyle: "bold",
                align: "center"
            }).setOrigin(0.5);
        }


        // Add them into the container (so they move with banners)
        this.bottomContainer.add([textBefore, redCircle, textAfter]);
    }
    addTopTextWithCircle(imageNames) {
    if (!this.topContainer) {
        console.warn("Top container not created yet. Call createProbQuestionHolder() first.");
        return;
    }

    // Middle banner center (x=740 is your middle banner's x)
    const centerX = 740;
    const y = 70;

    // Randomly pick 2 or 3 terms
    const termCount = Phaser.Math.Between(2, 3);

    // Measure approximate width per term (number + "x" + circle + spacing)
    const termWidth = 90; // adjust if spacing looks off
    const totalWidth = termCount * termWidth;
    let startX = centerX - totalWidth / 2 + termWidth / 2;

    const objectsToAdd = [];

    for (let i = 0; i < termCount; i++) {
        // Random number (1–9)
        const num = Phaser.Math.Between(1, 9);

        // Random circle image
        const circle = imageNames[Math.floor(Math.random() * imageNames.length)];

        // Number text
        const numberText = this.self.add.text(startX - 15, y, ` ${num} x`, {
            fontSize: "24px",
            color: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Circle image
        const circleImg = this.self.add.image(startX + 35, y, circle).setDisplaySize(30, 30);

        objectsToAdd.push(numberText, circleImg);

        startX += termWidth;
    }

    this.topContainer.add(objectsToAdd);
}
}

export default Banner