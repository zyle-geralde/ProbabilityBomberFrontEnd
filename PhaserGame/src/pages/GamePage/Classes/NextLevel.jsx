class NextLevel{
    constructor(self) {
        this.self = self
    }

    checkNextLevel() {
        this.self.levelIndic += 1
        if (this.self.levelIndic == 2) {
            this.self.pointNeed = 14
            this.self.enemyLimit = 5
            this.self.itemLimit = 3
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if(this.self.levelIndic == 3) {
            this.self.pointNeed = 21
            this.self.enemyLimit = 6
            this.self.itemLimit = 4
            this.self.availableEnemyList = [1]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if (this.self.levelIndic == 4) {
            this.self.pointNeed = 28
            this.self.enemyLimit = 8
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if (this.self.levelIndic == 5) {
            this.self.pointNeed = 38
            this.self.enemyLimit = 8
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if (this.self.levelIndic == 6) {
            this.self.pointNeed = 48
            this.self.enemyLimit = 10
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if (this.self.levelIndic == 7) {
            this.self.pointNeed = 58
            this.self.enemyLimit = 12
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if (this.self.levelIndic == 8) {
            this.self.pointNeed = 68
            this.self.enemyLimit = 14
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
        else if (this.self.levelIndic == 9) {
            this.self.pointNeed = 78
            this.self.enemyLimit = 15
            this.self.itemLimit = 6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 1: 1
        }
    }
}

export default NextLevel