class Timer {
    constructor(self) {
        this.self = self
        this.running = false;
        this.elapsedMs = 0;
    }

    startTimer() {
        // Timer
        this.self.startTime = this.self.time.now; // store start time in ms
        this.running = true;
        this.self.timeText = this.self.add.text(200, 100, 'Time: 0s', {
            fontSize: '27px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        });
        this.self.timeText.setDepth(2);

    }
    updateTimer() {
        if (!this.running) return;
        const elapsedMs = this.self.time.now - this.self.startTime;
        const elapsedSec = Math.floor(elapsedMs / 1000);

        const minutes = Math.floor(elapsedSec / 60);
        const seconds = elapsedSec % 60;

        // Format seconds with leading zero if needed
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        this.self.timeText.setText(`Time: ${minutes}:${formattedSeconds}`);

        if (minutes >= this.self.durationNeed && this.self.levelIndic <= 9) {
            this.self.NextLevel.checkNextLevel()
            console.log("Next Level")
        }
    }

    stopTimer() {
        if (this.running) {
            this.running = false;
            this.elapsedMs = this.self.time.now - this.self.startTime;
        }
    }

    getElapsedTime() {

        const elapsedSec = Math.floor(this.elapsedMs / 1000);
        const minutes = Math.floor(elapsedSec / 60);
        const seconds = elapsedSec % 60;

        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
    }
}

export default Timer