class Timer {
    constructor(self) {
        this.self = self
    }

    startTimer() {
        // Timer
        this.self.startTime = this.self.time.now; // store start time in ms
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
        const elapsedMs = this.self.time.now - this.self.startTime;
        const elapsedSec = Math.floor(elapsedMs / 1000);

        const minutes = Math.floor(elapsedSec / 60);
        const seconds = elapsedSec % 60;

        // Format seconds with leading zero if needed
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        this.self.timeText.setText(`Time: ${minutes}:${formattedSeconds}`);
    }
}

export default Timer