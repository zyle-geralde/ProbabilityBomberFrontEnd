class Banner {
    constructor(self) {
        this.self = self
    }

    createProbQuestionHolder() {
        //Create the three bottom banners (treated as one group)
        const bannerLeft = this.self.add.image(555, this.self.bottomBannerY, "leftBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerMid = this.self.add.image(740, this.self.bottomBannerY, "middleBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerRight = this.self.add.image(925, this.self.bottomBannerY, "rightBanner").setDisplaySize(185, this.self.bottomBannerHeight);

        //Put them into a container
        const bottomContainer = this.self.add.container(0, 0, [bannerLeft, bannerMid, bannerRight]);

        //Add a single text object across all three
        const bannerText = this.self.add.text(740, this.self.bottomBannerY, "This is one big text across banners", {
            fontSize: "20px",
            color: "#000",
            fontStyle: "bold",
            align: "center",
            wordWrap: { width: 555 } //wraps text within ~width of 3 banners
        }).setOrigin(0.5);

        //Add the text into the same container (so it moves with the banners if needed)
        bottomContainer.add(bannerText);

        //Do the same for top banners if needed
        const topLeft = this.self.add.image(540, 70, "leftBanner").setDisplaySize(200, 140);
        const topMid = this.self.add.image(740, 70, "middleBanner").setDisplaySize(200, 140);
        const topRight = this.self.add.image(940, 70, "rightBanner").setDisplaySize(200, 140);

        const topContainer = this.self.add.container(0, 0, [topLeft, topMid, topRight]);

        const topText = this.self.add.text(740, 70, "Top Row Combined Text", {
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