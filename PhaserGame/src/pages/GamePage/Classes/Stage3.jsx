class Stage3 {
    constructor(self) {
        this.self = self

    }

    addBottomTextWithCircle(imageName, randomSign) {
        if (!this.self.bottomContainer) {
            console.warn("Bottom container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        //Destroy previous textAfter if it exists
        if (this.self.textAfter) {
            this.self.textAfter.destroy();
            this.self.textAfter = null
        }
        if (this.self.textBottom) {
            this.self.textBottom.destroy();
            this.self.textBottom = null
        }
        if (this.self.redCircle) {
            this.self.redCircle.destroy();
            this.self.redCircle = null
        }

        const xBase = 600;   // textBefore x
        const yBase = this.self.bottomBannerY;

        // Text BEFORE the circle
        this.self.textBottom = this.self.add.text(xBase, yBase, "P(", {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Circle image
        this.self.pickedColorImg1 = this.self.add.image(xBase + 75 - 40, yBase, this.self.colorPicked).setDisplaySize(30, 30);

        this.self.textSymbol = this.self.add.text(xBase + 105 - 40, yBase, "∩", {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        this.self.pickedColorImg2 = this.self.add.image(xBase + 138 - 40, yBase, this.self.colorPicked2).setDisplaySize(30, 30);

        // Decide AFTER text and position
        const afterConfig = { x: xBase + 250 - 40, text: ") = -- / --" };

        this.self.textAfter = this.self.add.text(afterConfig.x, yBase, afterConfig.text, {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Add them into the container (so they move with banners)
        this.self.bottomContainer.add(this.self.pickedColorImg1);
        this.self.bottomContainer.add(this.self.pickedColorImg2);
        this.self.bottomContainer.add([this.self.textBottom, this.self.textAfter, this.self.textSymbol]);
    }
    addTopTextWithCircle(imageNames) {
        if (!this.self.topContainer) {
            console.warn("Top container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        if (this.self.coloredBallGiven.length > 0) {
            this.self.coloredBallGiven = []
        }
        if (this.self.givenSample.length > 0) {
            this.self.givenSample = []
        }
        if (this.self.sampleSize) {
            this.self.sampleSize = null
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
    addTopTextWithCircle(imageNames) {
        if (!this.self.topContainer) {
            console.warn("Top container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        if (this.self.coloredBallGiven.length > 0) {
            this.self.coloredBallGiven = []
        }
        if (this.self.givenSample.length > 0) {
            this.self.givenSample = []
        }
        if (this.self.sampleSize) {
            this.self.sampleSize = null
        }
        if (this.self.eventType) {
            this.self.eventType = null
        }
        // Middle banner center
        const centerX = 740;
        const y = 60;

        // Randomly pick 2 or 3 terms
        const termCount = Phaser.Math.Between(2, 3);

        // Clone imageNames so we can remove used colors
        let availableImages = [...imageNames];

        // Measure approximate width per term
        const termWidth = 90; // adjust spacing if needed
        const totalWidth = termCount * termWidth + 100; // +100 for "Given"
        let startX = centerX - totalWidth / 2;

        const objectsToAdd = [];
        const imageToAdd = [];

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
            const num = Phaser.Math.Between(1, 3);

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

        //Add hint text text first
        let eventTypeList = ["with replacement", "without replacement"]
        let selectedEventType = eventTypeList[Math.floor(Math.random() * eventTypeList.length)]
        this.self.eventType = selectedEventType

        const HintText = this.self.add.text((centerX - totalWidth / 2) + 150, y + 30, `Hint: ${selectedEventType}`, {
            fontSize: "20px",
            color: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5);
        objectsToAdd.push(HintText);


        // Pick one of the used colors as target
        let selectedColor = this.self.coloredBallGiven[
            Math.floor(Math.random() * this.self.coloredBallGiven.length)
        ];
        this.self.colorPicked = selectedColor;

        let selectedColor2 = this.self.coloredBallGiven[
            Math.floor(Math.random() * this.self.coloredBallGiven.length)
        ];
        this.self.colorPicked2 = selectedColor2;

        let numerator = 0;

        let denominator = this.self.sampleSize;

        let returned = this.solveIntersection(this.self)
        console.log("Returned")
        console.log(returned)



        this.self.topContainer.add(imageToAdd);
        this.self.topContainer.add(objectsToAdd);

        console.log("Samples:", this.self.givenSample);
        console.log("Colors:", this.self.coloredBallGiven);
        console.log("Sample size:", this.self.sampleSize);
        console.log("Picked1:", this.self.colorPicked);
        console.log("Picked2:", this.self.colorPicked2);
        console.log("EventType: ", this.self.eventType);
        //console.log("Reduced Answer:", this.self.probAnswer);

        //this.generateNumbersForBlocks(numerator, denominator)
    }

    addBothBannerText() {
        const imageNames = ["candy1", "candy-cane", "candy", "cotton-candy", "sweets"];

        this.addTopTextWithCircle(imageNames);
        this.addBottomTextWithCircle("candy1", 1)
    }

    solveIntersection(self) {
        if (!self.colorPicked || !self.colorPicked2 || !self.givenSample || !self.sampleSize) {
            console.warn("Missing data for solving Stage3 intersection.");
            return null;
        }

        // --- Extract counts for each picked color ---
        const getCount = (color) => {
            let count = 0;
            self.givenSample.forEach(entry => {
                if (entry[color] !== undefined) {
                    count = entry[color];
                }
            });
            return count;
        };

        const total = self.sampleSize;
        const countA = getCount(self.colorPicked);
        const countB = getCount(self.colorPicked2);

        let numerator, denominator;

        if (self.eventType === "with replacement") {
            // Independent
            numerator = countA * countB;
            denominator = total * total;
        } else {
            // Without replacement (dependent)
            numerator = countA * (countB - (self.colorPicked === self.colorPicked2 ? 1 : 0));
            denominator = total * (total - 1);
        }

        // Reduce fraction
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;

        return {
            expression: `P(${self.colorPicked} ∩ ${self.colorPicked2})`,
            numerator,
            denominator
        };
    }

}

export default Stage3