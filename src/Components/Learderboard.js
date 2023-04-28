import Timer from "./Timer.js";

export default class Leaderboard {
    constructor(leaderboardContainer) {
        this.leaderboardContainer = leaderboardContainer;
    }

    addNewScore(newScore) {
        if(localStorage.getItem('scores')) {
            let prevStorage = JSON.parse(localStorage.getItem('scores'))
            let newStorage = [...prevStorage, newScore]

            while(newStorage.length > 5) {
                const index = newStorage.indexOf(Math.max(...newStorage));
                if (index > -1) {
                    newStorage.splice(index, 1); // 2nd parameter means remove one item only
                }
            }

            localStorage.setItem('scores', JSON.stringify(newStorage))
        } else {
            localStorage.setItem('scores', JSON.stringify([newScore]))
        }
    }

    renderScores(){
        const scores = JSON.parse(localStorage.getItem('scores'));
        
        if(!scores) {
            return;
        } 

        scores.sort((a, b) => a - b);

        const scoresList = document.querySelector('.scores')
        scoresList.innerHTML = "";

        for (let i = 0; i < scores.length; i++){
            localStorage.setItem('score', JSON.stringify(scores[i]));
            
            const scoresElement = document.createElement('li');
            scoresElement.innerHTML = `<p>-  ${Timer.getFormattedTimer(scores[i])}s  -</p>`;
            scoresList.appendChild(scoresElement);
            
        }
        // console.log(scoresList)
    }
}