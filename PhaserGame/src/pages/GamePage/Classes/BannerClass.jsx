class Banner {
    constructor(self) {
        this.self = self
    }

    createProbQuestionHolder() {
        const addBanner = (x, y, texture, w, h) => {
            const banner = this.self.add.image(x, y, texture);
            banner.setDisplaySize(w, h);
            return banner;
        };
        // bottom row
        const bottomBanners = [
            { x: 555, y: this.self.bottomBannerY, texture: "leftBanner", w: 185, h: this.self.bottomBannerHeight },
            { x: 740, y: this.self.bottomBannerY, texture: "middleBanner", w: 185, h: this.self.bottomBannerHeight },
            { x: 925, y: this.self.bottomBannerY, texture: "rightBanner", w: 185, h: this.self.bottomBannerHeight },
        ];
        // top row
        const topBanners = [
            { x: 540, y: 70, texture: "leftBanner", w: 200, h: 140 },
            { x: 740, y: 70, texture: "middleBanner", w: 200, h: 140 },
            { x: 940, y: 70, texture: "rightBanner", w: 200, h: 140 },
        ];
        // create all banners
        [...bottomBanners, ...topBanners].forEach(cfg =>
            addBanner(cfg.x, cfg.y, cfg.texture, cfg.w, cfg.h)
        );
    }
}

export default Banner