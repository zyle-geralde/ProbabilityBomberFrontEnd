class StageOne {
    constructor(self) {
        this.self = self
    }

    addBottomTextWithCircle(imageName, randomSign) {
        if (!this.self.bottomContainer) {
            console.warn("Bottom container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        // Destroy previous textAfter if it exists
        if (this.self.textAfter) {
            this.self.textAfter.destroy();
            this.self.textAfter = null
        }
        if (this.self.textBottom) {
            this.self.textBottom.destroy()
            this.self.textBottom = null
        }
        if (this.self.redCircle) {
            this.self.redCircle.destroy()
            this.self.redCircle = null
        }

        const xBase = 640;   // textBefore x
        const yBase = this.self.bottomBannerY;

        // Text BEFORE the circle
        this.self.textBottom = this.self.add.text(xBase, yBase, "P(", {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Circle image
        this.self.redCircle = this.self.add.image(672, yBase, this.self.colorPicked).setDisplaySize(30, 30);

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
        this.self.bottomContainer.add(this.self.redCircle);
        this.self.bottomContainer.add([this.self.textBottom, this.self.textAfter]);
    }
    addTopTextWithCircle(imageNames) {
        if (!this.self.topContainer) {
            console.warn("Top container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        if (this.self.coloredBallGiven.length > 0) {
            this.self.coloredBallGiven = []
        }
        // Middle banner center
        const centerX = 740;
        const y = 70;

        // Randomly pick 2 or 3 terms
        const termCount = Phaser.Math.Between(2, 4);

        // Clone imageNames so we can remove used colors
        let availableImages = [...imageNames];

        // Measure approximate width per term
        const termWidth = 90; // adjust spacing if needed
        const totalWidth = termCount * termWidth + 100; // +100 for "Given"
        let startX = centerX - totalWidth / 2;

        const objectsToAdd = [];
        const imageToAdd = []

        // --- Add "Given" text first ---
        const givenText = this.self.add.text(startX + 20, y, "Given:", {
            fontSize: "24px",
            color: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5);
        objectsToAdd.push(givenText);

        // Move startX forward for the terms
        startX += 100;

        // --- Add random terms without repeating colors ---
        for (let i = 0; i < termCount && availableImages.length > 0; i++) {
            // Random number (1–9)
            const num = Phaser.Math.Between(1, 9);

            // Random circle image (pick from available list)
            const randomIndex = Math.floor(Math.random() * availableImages.length);
            const circle = availableImages[randomIndex];

            // Remove this circle from available list (avoid duplicates)
            availableImages.splice(randomIndex, 1);

            // Store in givenSample and coloredBallGiven
            this.self.givenSample.push({ [circle]: num });
            this.self.coloredBallGiven.push(circle);
            this.self.sampleSize += num;

            // Number text
            const numberText = this.self.add.text(startX - 15, y, `${num} x`, {
                fontSize: "24px",
                color: "#fff",
                fontStyle: "bold"
            }).setOrigin(0.5);

            // Circle image
            const circleImg = this.self.add.image(startX + 25, y, circle).setDisplaySize(30, 30);

            imageToAdd.push(circleImg);
            objectsToAdd.push(numberText)
        

            startX += termWidth;
        }

        // Pick one of the used colors as target
        let selectedColor = this.self.coloredBallGiven[
            Math.floor(Math.random() * this.self.coloredBallGiven.length)
        ];
        this.self.colorPicked = selectedColor;

        // --- Find GCD and reduce fraction ---
        let numerator = 0;
        this.self.givenSample.forEach(entry => {
            if (entry[this.self.colorPicked] !== undefined) {
                numerator = entry[this.self.colorPicked];
            }
        });

        if (this.self.randomSign == true) {
            numerator = this.self.sampleSize - numerator;
        }
        let denominator = this.self.sampleSize;

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;

        this.self.probAnswer = [numerator, denominator];

        // Add everything into the top container
        this.self.topContainer.add(imageToAdd);
        this.self.topContainer.add(objectsToAdd);

        console.log("Samples:", this.self.givenSample);
        console.log("Colors:", this.self.coloredBallGiven);
        console.log("Sample size:", this.self.sampleSize);
        console.log("Picked:", this.self.colorPicked);
        console.log("Reduced Answer:", this.self.probAnswer);

        this.generateNumbersForBlocks(numerator, denominator)
    }

    generateNumbersForBlocks(numerator, denominator) {
        this.self.probabilityNumbers = [];

        this.self.probabilityNumbers.push(numerator);
        this.self.probabilityNumbers.push(denominator);

        for (let loop = 1; loop <= 4; loop++) {
            let randNum = Math.floor(Math.random() * 30) + 1;
            this.self.probabilityNumbers.push(randNum);
        }
    }

    addBothBannerText() {
        //For Stage 1
        const imageNames = ["redCircle", "whiteCircle", "blueCircle", "blackCircle", "greenCircle", "orangeCircle"]

        const randomImage = imageNames[Math.floor(Math.random() * imageNames.length)];

        const isComplement = [true, false]
        this.self.randomSign = isComplement[Math.floor(Math.random() * isComplement.length)];

        this.addTopTextWithCircle(imageNames);
        this.addBottomTextWithCircle(randomImage, this.self.randomSign)
    }


}

export default StageOne