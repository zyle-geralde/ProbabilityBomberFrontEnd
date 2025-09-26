import StageOne from "./Stage1Class";
class Banner {
    constructor(self) {
        this.self = self
        this.stageOne = new StageOne(this.self)
    }

    createProbQuestionHolder() {
        // --- Bottom banners (grouped into a container) ---
        const bannerLeft = this.self.add.image(555, this.self.bottomBannerY, "leftBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerMid = this.self.add.image(740, this.self.bottomBannerY, "middleBanner").setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerRight = this.self.add.image(925, this.self.bottomBannerY, "rightBanner").setDisplaySize(185, this.self.bottomBannerHeight);

        // store container so we can add text later
        this.self.bottomContainer = this.self.add.container(0, 0, [bannerLeft, bannerMid, bannerRight]);

        // --- Top banners (leave plain for now) ---
        const topLeft = this.self.add.image(540, 70, "leftBanner").setDisplaySize(200, 140);
        const topMid = this.self.add.image(740, 70, "middleBanner").setDisplaySize(200, 140);
        const topRight = this.self.add.image(940, 70, "rightBanner").setDisplaySize(200, 140);

        this.self.topContainer = this.self.add.container(0, 0, [topLeft, topMid, topRight]);

        this.stageOne.addBothBannerText()
        
    }

    
}

export default Banner