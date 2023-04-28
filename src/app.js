import MemoryCardsGame from "./Components/MemoryCardsGame.js";
import Leaderboard from "./Components/Learderboard.js";

const difficultyButtons = document.querySelectorAll(".difficulty-button")
const cardsContainer = document.querySelector('.card-container');
const leaderboard = new Leaderboard(document.querySelector('.leaderboard-container'));
const colorSchemes = [
    ['#2B59C3', '#D36582', '#B7CE63', '#c9a690', '#8FB339', '#FFEECF', '#B98389', '#DF2935'],
    ['#0081AF', '#00ABE7', '#2DC7FF', '#EAD2AC', '#EABA6B', '#03256C', '#941C2F', '#C1CFDA', '#8B5D33', '#869D7A', '#FDE74C', '#F6511D', '#FFB400', '#E7C8DD', '#86626E', '#4B3B47', '#E01A4F', '#8332AC']
]

//Activate the game by clicking on start button
for(const difficultyButton of difficultyButtons) {
    difficultyButton.addEventListener("click", function() {
        let memoryCardsGame = new MemoryCardsGame(
            leaderboard,
            {
                cardLength : this.dataset.cardLength,
                colorScheme: colorSchemes[this.dataset.colorSchemeId]
            }
        )
        memoryCardsGame.startGame();
        this.parentNode.style.display = 'none'
        document.querySelector('.card-container').style.visibility = "visible";
    });
}