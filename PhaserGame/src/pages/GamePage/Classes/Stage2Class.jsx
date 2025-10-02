class Stage2 {
    constructor(self) {
        this.self = self
        this.deck = null;
    }

    addTopTextDeckFormat(deckImageKey, eventA, eventB) {

        this.buildDeck()
        //Adding random questions and answer
        const events = [
            "Red Card", "Black Card", "Ace Card", "2 Card", "3 Card", "4 Card", "5 Card", "6 Card",
            "7 Card", "8 Card", "9 Card", "10 Card", "Jack Card", "Queen Card", "King Card",
            "Club Card", "Diamond Card", "Spade Card", "Heart Card",
            "Face Card", "Number Card", "Number Card greater than 7", "Number Card less than 5"
        ];

        const q = this.generateQuestion(events, this.deck);
        console.log(q.question);
        console.log("Answer:", q.answer);

        this.self.probAnswer = [q.numerator, q.denominator];
        console.log(this.self.probAnswer)

        this.generateNumbersForBlocks(q.numerator, q.denominator)

        //

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
        const eventAText = this.self.add.text(safeX, y - 20, `A: ${q.eventA}`, {
            fontSize: "20px",
            color: "#fff",
            fontStyle: "bold",
            align: "left",
            wordWrap: { width: 400 } // reduce wrap width
        }).setOrigin(0, 0); // 👈 left align so it never overlaps left
        objectsToAdd.push(eventAText);

        // --- Add Event B ---
        const eventBText = this.self.add.text(safeX, y + 10, `B: ${q.eventB}`, {
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

    generateNumbersForBlocks(numerator, denominator) {
        this.self.probabilityNumbers = [];

        this.self.probabilityNumbers.push(numerator);
        this.self.probabilityNumbers.push(denominator);

        for (let loop = 1; loop <= 4; loop++) {
            let randNum = Math.floor(Math.random() * 30) + 1;
            this.self.probabilityNumbers.push(randNum);
        }
    }


    // Build a standard 52-card deck
    buildDeck() {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const ranks = [
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
        ];
        let deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                deck.push({ rank, suit });
            }
        }
        this.deck = deck
    }

    // Utility: is face card?
    isFace(rank) {
        return ["J", "Q", "K"].includes(rank);
    }

    // Utility: is number card?
    isNumber(rank) {
        return !isNaN(rank); // 2–10 are numeric
    }

    // Map events → set of cards
    getEventCards(eventName, deck) {
        eventName = eventName.toLowerCase();

        if (eventName === "red card") {
            return deck.filter(c => c.suit === "hearts" || c.suit === "diamonds");
        }
        if (eventName === "black card") {
            return deck.filter(c => c.suit === "spades" || c.suit === "clubs");
        }
        if (eventName.endsWith("card")) {
            let rank = eventName.replace(" card", "").toUpperCase();
            if (["A", "J", "Q", "K"].includes(rank) || !isNaN(rank)) {
                return deck.filter(c => c.rank === rank);
            }
        }
        if (eventName === "club card") return deck.filter(c => c.suit === "clubs");
        if (eventName === "diamond card") return deck.filter(c => c.suit === "diamonds");
        if (eventName === "spade card") return deck.filter(c => c.suit === "spades");
        if (eventName === "heart card") return deck.filter(c => c.suit === "hearts");

        if (eventName === "face card") return deck.filter(c => this.isFace(c.rank));
        if (eventName === "number card") return deck.filter(c => this.isNumber(c.rank));

        // Handle inequalities like "number card greater than 7"
        if (eventName.startsWith("number card greater than")) {
            let n = parseInt(eventName.split("greater than")[1].trim(), 10);
            return deck.filter(c => this.isNumber(c.rank) && parseInt(c.rank) > n);
        }
        if (eventName.startsWith("number card less than")) {
            let n = parseInt(eventName.split("less than")[1].trim(), 10);
            return deck.filter(c => this.isNumber(c.rank) && parseInt(c.rank) < n);
        }

        // default = empty
        return [];
    }

    solveUnion(eventA, eventB, deck) {
        const cardsA = this.getEventCards(eventA, deck);
        const cardsB = this.getEventCards(eventB, deck);

        // Make sets using JSON string of cards
        const setA = new Set(cardsA.map(c => JSON.stringify(c)));
        const setB = new Set(cardsB.map(c => JSON.stringify(c)));

        const union = new Set([...setA, ...setB]);

        const numerator = union.size;
        const denominator = deck.length;

        // Helper function: gcd using Euclidean algorithm
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

        const divisor = gcd(numerator, denominator);

        return {
            numerator: numerator / divisor,
            denominator: denominator / divisor,
            probability: numerator / denominator
        };
    }

    generateQuestion(events, deck) {
        const i = Math.floor(Math.random() * events.length);
        let j = Math.floor(Math.random() * events.length);
        while (j === i) j = Math.floor(Math.random() * events.length);

        const eventA = events[i];
        const eventB = events[j];

        const result = this.solveUnion(eventA, eventB, deck);

        return {
            question: `Event A: ${eventA}\nEvent B: ${eventB}\nP(A ∪ B) = ?`,
            eventA: eventA,
            eventB: eventB,
            numerator: result.numerator,
            denominator: result.denominator,
            answer: `${result.numerator}/${result.denominator} (${result.probability.toFixed(2)})`
        };
    }
}

export default Stage2