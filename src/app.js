import MemoryCardsGame from "./Components/MemoryCardsGame.js";
import Leaderboard from "./Components/Learderboard.js";

//Activate the game by clicking on start button
const easySettingBtn = document.querySelector("#easy-setting");
const difficultSettingBtn = document.querySelector("#difficult-setting");
const cardsContainer = document.querySelector('.card-container');
const leaderboard = new Leaderboard(document.querySelector('.leaderboard-container'));


easySettingBtn.addEventListener("click", function() {

    let memoryCardsGame = new MemoryCardsGame(
        leaderboard,
        {
            cardLength : 16
        }
    )
    memoryCardsGame.startGame();
    easySettingBtn.style.display = "none"
    difficultSettingBtn.style.display = "none"
    document.querySelector('.card-container').style.visibility = "visible";
    
});

// difficultSettingBtn.addEventListener("click", function() {

//     let memoryCardsGame = new MemoryCardsGame(
//         leaderboard,
//         {
//             cardLength : 16
//         }
//     )
//     memoryCardsGame.startGame();
//     easySettingBtn.style.display = "none"
//     difficultSettingBtn.style.display = "none"
//     document.querySelector('.card-container').style.visibility = "visible";
    
// });
