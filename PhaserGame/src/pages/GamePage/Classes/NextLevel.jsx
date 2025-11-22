class NextLevel{
    constructor(self) {
        this.self = self
    }

    checkNextLevel() {
        this.self.levelIndic += 1
        if (this.self.levelIndic == 2) {
            this.self.pointNeed = 8
            this.self.enemyLimit = this.self.stage == 1?4:this.self.stage == 2?5:6
            this.self.itemLimit = 3
            this.self.availableEnemyList = [1,2]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if(this.self.levelIndic == 3) {
            this.self.pointNeed = 12
            this.self.enemyLimit = this.self.stage == 1?5:this.self.stage == 2?7:8
            this.self.itemLimit = 4
            this.self.availableEnemyList = [1,2,3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 4) {
            this.self.pointNeed = 16
            this.self.enemyLimit = this.self.stage == 1?7:this.self.stage == 2?9:10
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 5) {
            this.self.pointNeed = 21
            this.self.enemyLimit = this.self.stage == 1?8:this.self.stage == 2?10:11
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 6) {
            this.self.pointNeed = 26
            this.self.enemyLimit = this.self.stage == 1?10:this.self.stage == 2?12:13
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 7) {
            this.self.pointNeed = 31
            this.self.enemyLimit = this.self.stage == 1?12:this.self.stage == 2?14:15
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 8) {
            this.self.pointNeed = 34
            this.self.enemyLimit = this.self.stage == 1?14:this.self.stage == 2?15:16
            this.self.itemLimit = 5
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 9) {
            this.self.pointNeed = 39
            this.self.enemyLimit = this.self.stage == 1?15:this.self.stage == 2?17:18
            this.self.itemLimit = 6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
    }
}

export default NextLevel