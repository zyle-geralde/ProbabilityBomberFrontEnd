class Points {
    constructor(self) {
        this.self = self
    }

    createPoints() {
        this.self.pointText = this.self.add.text(1200, 140, `Points: ${this.self.pointCount}`, {
            fontSize: "23px",
            color: "#ffffffff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3// black outline
        }).setOrigin(0.5);
    }
    addPoints() {
        //Add points
        this.self.pointCount += 1;
        if (this.self.pointText) {
            this.self.pointText.destroy()
            this.self.pointText = null;
        }
    }
}

export default Points