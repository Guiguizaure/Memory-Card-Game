export default class Timer {
    constructor(timerContainer) {
        this.timerContainer = timerContainer
        this.timerCount = 0
        this.timerInterval = null
    }

    startTimer() {
        this.timerIntervalHandler();
        this.timerInterval = setInterval(this.timerIntervalHandler.bind(this), 1000)
    }

    timerIntervalHandler() {
        this.timerContainer.textContent = Timer.getFormattedTimer(this.timerCount)
        this.timerCount++;
    }

    static getFormattedTimer(timerCount) {
        let secondes = timerCount % 60;
        let minutes = Math.floor(timerCount / 60);

        const timerHtml = (minutes <= 9 ? '0' : '') + minutes + ' : ' + (secondes <= 9 ? '0' : '') + secondes;

        return timerHtml;
    }

    clearTimer() {
        clearInterval(this.timerInterval)
    }
}