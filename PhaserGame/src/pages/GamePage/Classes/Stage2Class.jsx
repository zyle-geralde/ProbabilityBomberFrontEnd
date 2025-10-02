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
        const givenText = this.self.add.text(centerX - 220, y, "Given:\nDeck \nof \nCards", {
            fontSize: "20px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);
        objectsToAdd.push(givenText);

        // --- Add deck image next to it ---
        const deckImage = this.self.add.image(givenText.x + givenText.width / 2 + 40, y, deckImageKey)
            .setDisplaySize(50, 50);
        objectsToAdd.push(deckImage);

        // ✅ Compute safe X for Event A & B (after deck image)
        const safeX = deckImage.x + deckImage.displayWidth / 2 + 30;

        // --- Add Event A ---
        const eventAText = this.self.add.text(safeX, y - 20, `A: ${eventA}`, {
            fontSize: "20px",
            color: "#fff",
            fontStyle: "bold",
            align: "left",
            wordWrap: { width: 400 } // reduce wrap width
        }).setOrigin(0, 0); // 👈 left align so it never overlaps left
        objectsToAdd.push(eventAText);

        // --- Add Event B ---
        const eventBText = this.self.add.text(safeX, y + 10, `B: ${eventB}`, {
            fontSize: "20px",
            color: "#fff",
            fontStyle: "bold",
            align: "left",
            wordWrap: { width: 400 }
        }).setOrigin(0, 0);
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

        this.addTopTextDeckFormat("carddeck", "Number 1 Card", "blue Card")
        this.addBottomTextWithEvents(Phaser.Math.Between(0, 1) === 1)
    }
}

export default Stage2