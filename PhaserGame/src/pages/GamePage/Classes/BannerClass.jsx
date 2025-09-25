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

            // Destroy previous textAfter if it exists
        if (this.self.textAfter) {
            this.self.textAfter.destroy();
            this.self.textAfter = null
        }

        const xBase = 640;   // textBefore x
        const yBase = this.self.bottomBannerY;

        // Text BEFORE the circle
        const textBefore = this.self.add.text(xBase, yBase, "P(", {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Circle image
        const redCircle = this.self.add.image(672, yBase, imageName).setDisplaySize(30, 30);

        // Decide AFTER text and position
        const afterConfig = randomSign
            ? { x: 780, text: "') = -- / --" }
            : { x: 775, text: ") = -- / --" };

        this.self.textAfter = this.self.add.text(afterConfig.x, yBase, afterConfig.text, {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Add them into the container (so they move with banners)
        this.bottomContainer.add([textBefore, redCircle, this.self.textAfter]);
    }
    addTopTextWithCircle(imageNames) {
        if (!this.topContainer) {
            console.warn("Top container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        // Middle banner center
        const centerX = 740;
        const y = 70;

        // Randomly pick 2 or 3 terms
        const termCount = Phaser.Math.Between(2, 4);

        // Measure approximate width per term
        const termWidth = 90; // adjust spacing if needed
        const totalWidth = termCount * termWidth + 100; // +100 for "Given"
        let startX = centerX - totalWidth / 2;

        const objectsToAdd = [];

        // --- Add "Given" text first ---
        const givenText = this.self.add.text(startX + 20, y, "Given:", {
            fontSize: "24px",
            color: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5);
        objectsToAdd.push(givenText);

        // Move startX forward for the terms
        startX += 100;

        // --- Add random terms ---
        for (let i = 0; i < termCount; i++) {
            // Random number (1–9)
            const num = Phaser.Math.Between(1, 9);

            // Random circle image
            const circle = imageNames[Math.floor(Math.random() * imageNames.length)];

            // Number text
            const numberText = this.self.add.text(startX - 15, y, `${num} x`, {
                fontSize: "24px",
                color: "#fff",
                fontStyle: "bold"
            }).setOrigin(0.5);

            // Circle image
            const circleImg = this.self.add.image(startX + 25, y, circle).setDisplaySize(30, 30);

            objectsToAdd.push(numberText, circleImg);

            startX += termWidth;
        }

        // Add everything into the top container
        this.topContainer.add(objectsToAdd);
    }
}

export default Banner