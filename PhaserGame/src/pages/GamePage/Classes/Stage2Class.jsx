class Stage2 {
    constructor(self) {
        this.self = self
    }

    addTopTextDeckFormat(deckImageKey, eventA, eventB) {

        if (!this.self.topContainer) {
            console.warn("Top container not created yet. Call createProbQuestionHolder() first.");
            return;
        }


        const centerX = 740;
        const y = 70;

        const objectsToAdd = [];

        // --- Add "Given:" text ---
        const givenText = this.self.add.text(centerX - 150, y, "Given:", {
            fontSize: "24px",
            color: "#fff",
            fontStyle: "bold"
        }).setOrigin(0.5);
        objectsToAdd.push(givenText);

        // --- Add deck image next to it ---
        const deckImage = this.self.add.image(centerX, y, deckImageKey).setDisplaySize(120, 90);
        objectsToAdd.push(deckImage);

        // --- Add Event A ---
        const eventAText = this.self.add.text(centerX, y + 100, `A: ${eventA}`, {
            fontSize: "24px",
            color: "#fff",
            fontStyle: "bold",
            align: "left",
            wordWrap: { width: 500 }
        }).setOrigin(0.5, 0);
        objectsToAdd.push(eventAText);

        // --- Add Event B ---
        const eventBText = this.self.add.text(centerX, y + 150, `B: ${eventB}`, {
            fontSize: "24px",
            color: "#fff",
            fontStyle: "bold",
            align: "left",
            wordWrap: { width: 500 }
        }).setOrigin(0.5, 0);
        objectsToAdd.push(eventBText);

        // Add everything into the top container
        this.self.topContainer.add(objectsToAdd);

        console.log("Deck format top text created:", { eventA, eventB });
    }

    addBottomTextWithEvents(randomSign) {
        if (!this.self.bottomContainer) {
            console.warn("Bottom container not created yet. Call createProbQuestionHolder() first.");
            return;
        }

        // Destroy previous objects
        if (this.self.textBottom) {
            this.self.textBottom.destroy();
            this.self.textBottom = null;
        }

        const xBase = 740;   // center alignment
        const yBase = this.self.bottomBannerY;

        // Decide order (A ∪ B or B ∪ A)
        const eventText = randomSign
            ? "P(A ∪ B) = -- / --"
            : "P(B ∪ A) = -- / --";

        // Create text
        this.self.textBottom = this.self.add.text(xBase, yBase, eventText, {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Add into container
        this.self.bottomContainer.add(this.self.textBottom);
    }

    addBothBannerText() {

        this.addTopTextDeckFormat("tileDisplay", "Red Card", "White Card")
        this.addBottomTextWithEvents(Phaser.Math.Between(0, 1) === 1)
    }
}

export default Stage2