import Timer from "./Timer.js";

export default class Leaderboard {
    constructor(leaderBoardContainer) {
        this.leaderBoardContainer = leaderBoardContainer;
    }

    addNewTime(formattedTime){
        const score = document.createElement('li');
        score.classList.add('current-best-score');
        score.innerHTML = `<p>-  ${formattedTime}s  -</p>`;
        document.querySelector('.scores').appendChild(score);
    }
}