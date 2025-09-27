class Points {
    constructor(self) {
        this.self = self
    }

    createPoints() {
        this.self.pointText = this.self.add.text(1200, 140, `Points: ${this.self.pointCount}`, {
            fontSize: "23px",
            color: "#ffffffff",
            fontStyle: "bold",
            stroke: "#000000",    // black outline
        }).setOrigin(0.5);
    }
}

export default Points