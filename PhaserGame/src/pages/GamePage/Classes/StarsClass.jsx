class Stars{
    constructor(self) {
        this.self = self
        this.size = 32
    }
    createStars() {
        this.self.star1 = this.self.add.image(1150, 90, "halfStar").setDisplaySize(this.size, this.size);
        this.self.star2 = this.self.add.image(1192, 70, "halfStar").setDisplaySize(this.size, this.size);
        this.self.star3 = this.self.add.image(1234, 90, "halfStar").setDisplaySize(this.size, this.size);
    }
}

export default Stars