import StageOne from "./Stage1Class";
import Stage2 from "./Stage2Class";
class Banner {
    constructor(self) {
        this.self = self
        this.stageOne = null
        this.stage2 = null
    }

    createProbQuestionHolder() {
        if (this.self.bottomContainer) {
            this.self.bottomContainer.destroy(true); // destroy with children
            this.self.bottomContainer = null;
        }
        if (this.self.topContainer) {
            this.self.topContainer.destroy(true);
            this.self.topContainer = null;
        }

        // Create NEW sprites each time (instead of reusing constructor ones)
        const bannerLeft = this.self.add.image(555, this.self.bottomBannerY, "leftBanner")
            .setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerMid = this.self.add.image(740, this.self.bottomBannerY, "middleBanner")
            .setDisplaySize(185, this.self.bottomBannerHeight);
        const bannerRight = this.self.add.image(925, this.self.bottomBannerY, "rightBanner")
            .setDisplaySize(185, this.self.bottomBannerHeight);

        this.self.bottomContainer = this.self.add.container(0, 0, [bannerLeft, bannerMid, bannerRight]);

        const topLeft = this.self.add.image(540, 70, "leftBanner").setDisplaySize(200, 140);
        const topMid = this.self.add.image(740, 70, "middleBanner").setDisplaySize(200, 140);
        const topRight = this.self.add.image(940, 70, "rightBanner").setDisplaySize(200, 140);

        this.self.topContainer = this.self.add.container(0, 0, [topLeft, topMid, topRight]);

        if (this.self.stage == 1) {
            if (!this.stageOne) {
                this.stageOne = new StageOne(this.self);
            }
            this.stageOne.addBothBannerText();
        }
        else if (this.self.stage == 2) {
            if (!this.stage2) {
                this.stage2 = new Stage2(this.self);
            }
            this.stage2.addBothBannerText();
            console.log("No errors")
        }


        
    }


}

export default Banner