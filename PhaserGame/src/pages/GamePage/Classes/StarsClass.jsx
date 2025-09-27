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
    changeStars() {
        if (this.self.pointCount == 2) {
            if (this.self.star1) {
                this.self.star1.destroy()
                this.self.star1 = null
                this.self.star1 = this.self.add.image(1150, 90, "fullStar").setDisplaySize(this.size, this.size);
            }
        }
        if (this.self.pointCount == 4) {
            if (this.self.star2) {
                this.self.star2.destroy()
                this.self.star2 = null
                this.self.star2 =this.self.add.image(1192, 70, "fullStar").setDisplaySize(this.size, this.size);
            }
        }
        if (this.self.pointCount == 6) {
            if (this.self.star3) {
                this.self.star3.destroy()
                this.self.star3 = null
                this.self.star3 = this.self.add.image(1234, 90, "fullStar").setDisplaySize(this.size, this.size);
            }
        }
    }
}

export default Stars