import MemoryCardsGame from "./Components/MemoryCardsGame.js";

//Activate the game by clicking on start button
const startBtn = document.querySelector("#start");
const cardsContainer = document.querySelector('.card-container');

startBtn.addEventListener("click", function() {

    let memoryCardsGame = new MemoryCardsGame(
        {
            cardLength : 16
        }
    )
    memoryCardsGame.startGame();
    startBtn.style.display = "none"
    document.querySelector('.card-container').style.visibility = "visible";
    
});