class NextLevel{
    constructor(self) {
        this.self = self
    }

    checkNextLevel() {
        this.self.levelIndic += 1
        if (this.self.levelIndic == 2) {
            this.self.pointNeed = 6
            this.self.enemyLimit = this.self.stage == 1?4:this.self.stage == 2?5:5
            this.self.itemLimit = this.self.stage == 1?3:this.self.stage == 2?4:4
            this.self.availableEnemyList = [1,2]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if(this.self.levelIndic == 3) {
            this.self.pointNeed = 9
            this.self.enemyLimit = this.self.stage == 1?5:this.self.stage == 2?7:7
            this.self.itemLimit = this.self.stage == 1?4:this.self.stage == 2?5:5
            this.self.availableEnemyList = [1,2,3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 4) {
            this.self.pointNeed = 12
            this.self.enemyLimit = this.self.stage == 1?7:this.self.stage == 2?9:9
            this.self.itemLimit = this.self.stage == 1?5:this.self.stage == 2?6:6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 5) {
            this.self.pointNeed = 16
            this.self.enemyLimit = this.self.stage == 1?8:this.self.stage == 2?10:10
            this.self.itemLimit = this.self.stage == 1?5:this.self.stage == 2?6:6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 6) {
            this.self.pointNeed = 20
            this.self.enemyLimit = this.self.stage == 1?10:this.self.stage == 2?12:12
            this.self.itemLimit = this.self.stage == 1?5:this.self.stage == 2?6:6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 7) {
            this.self.pointNeed = 24
            this.self.enemyLimit = this.self.stage == 1?12:this.self.stage == 2?14:14
            this.self.itemLimit = this.self.stage == 1?5:this.self.stage == 2?6:6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 8) {
            this.self.pointNeed = 28
            this.self.enemyLimit = this.self.stage == 1?14:this.self.stage == 2?15:15
            this.self.itemLimit = this.self.stage == 1?5:this.self.stage == 2?6:6
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
        else if (this.self.levelIndic == 9) {
            this.self.pointNeed = 32
            this.self.enemyLimit = this.self.stage == 1?15:this.self.stage == 2?17:17
            this.self.itemLimit = this.self.stage == 1?6:this.self.stage == 2?7:7
            this.self.availableEnemyList = [1, 2, 3]
            this.self.durationNeed += this.self.stage == 1? 10:20
        }
    }
}

export default NextLevel