class Banner {
    constructor(self) {
        this.self = self
    }

    createProbQuestionHolder() {
         // --- Bottom banners (treated as one container) ---
        const bannerLeft = this.self.add.image(555, this.self.bottomBannerY, "leftBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerMid = this.self.add.image(740, this.self.bottomBannerY, "middleBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerRight = this.self.add.image(925, this.self.bottomBannerY, "rightBanner").setDisplaySize(185, this.self.bottomBannerHeight);

        const bottomContainer = this.self.add.container(0, 0, [bannerLeft, bannerMid, bannerRight]);

        // Create text BEFORE the circle
        const textBefore = this.self.add.text(640, this.self.bottomBannerY, "P(", {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Create the circle image
        const redCircle = this.self.add.image(672, this.self.bottomBannerY, "redCircle").setDisplaySize(30, 30);

        // Create text AFTER the circle
        const textAfter = this.self.add.text(760, this.self.bottomBannerY, ") = _ / _", {
            fontSize: "27px",
            color: "#fff",
            fontStyle: "bold",
            align: "center"
        }).setOrigin(0.5);

        // Add all to container (so they move together with banners)
        bottomContainer.add([textBefore, redCircle, textAfter]);

        // --- Top banners (optional, leave plain for now) ---
        const topLeft = this.self.add.image(540, 70, "leftBanner").setDisplaySize(200, 140);
        const topMid = this.self.add.image(740, 70, "middleBanner").setDisplaySize(200, 140);
        const topRight = this.self.add.image(940, 70, "rightBanner").setDisplaySize(200, 140);

        const topContainer = this.self.add.container(0, 0, [topLeft, topMid, topRight]);

        const topText = this.self.add.text(740, 70, "Sample Question", {
            fontSize: "22px",
            color: "#000",
            fontStyle: "bold",
            align: "center",
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        topContainer.add(topText);
    }
}

export default Banner