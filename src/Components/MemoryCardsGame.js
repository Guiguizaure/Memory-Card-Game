import Timer from "./Timer.js";
import Leaderboard from "./Learderboard.js";

export default class MemoryCardsGame {
    constructor(leaderboard, settings) {
        this.leaderboard = leaderboard;
        this.settings = settings;
        this.cardsContainer = document.querySelector('.card-container');
        this.timerContainer = document.querySelector('.timer-container');
        this.endGameModalContainer = document.querySelector('.end-game-modal');
        this.cards = [];
        this.turnedCards = [];
        this.timer = new Timer(this.timerContainer)
    }

    startGame() {
        this.createCards();
        this.randomizeCardsOrder();
        this.renderCardsDOM();
        this.handleUserClickEvents();
        this.timer.startTimer();
        
    }

    createCards() {
        let colors = ['#2B59C3', '#D36582', '#B7CE63', '#c9a690', '#8FB339', '#FFEECF', '#B98389', '#DF2935'];
        let counter = 0;

        for (let i = 0; i < this.settings.cardLength; i++){
            let card = document.createElement('div');
            card.classList.add('card');
            card.id = i;
            this.cards.push(card);

            //Creation des pairs 
            if (i % 2 === 0 ) {
                counter++;
            }

            this.cards[i].dataset.id = counter;
            this.cards[i].style.backgroundColor = colors[counter - 1];
        }
    }

    randomizeCardsOrder() {
        for (let i = 0; i < this.cards.length; i++) {
            let randomNum = Math.floor(Math.random() * 15);
            const temp = this.cards[i];

            this.cards[i] = this.cards[randomNum];
            this.cards[randomNum] = temp;
        }
    }

    renderCardsDOM() {
        for (let i = 0; i < this.cards.length; i++){
            this.cardsContainer.appendChild(this.cards[i]);
            this.cards[i].classList.add('card-hidden');
        }
    }

    handleUserClickEvents() {
        let firstClickedCard = null;
        let isClickable = true;
        this.cards.forEach((card) => 
            card.addEventListener('click', () => {
                if(!isClickable) return;

                card.classList.remove('card-hidden');

                if (!firstClickedCard) {
                    firstClickedCard = card;
                    return;
                }

                if(firstClickedCard.id === card.id) {
                    console.log('Même carte cliquée, veuillez cliquez sur une autre carte');
                    return;
                }

                if (firstClickedCard.dataset.id === card.dataset.id) {
                    this.turnedCards.push(firstClickedCard, card);
                    firstClickedCard = null;
                    this.maybeEndGame()
                } else {
                    isClickable = false;
                    setTimeout(() => {
                        firstClickedCard.classList.add('card-hidden');
                        card.classList.add('card-hidden');
                        isClickable = true;
                        firstClickedCard = null;
                    }, 1000);
                }
            })
        );
    }

    maybeEndGame() {
        if (this.turnedCards.length == 2) {
            this.endGame()
        }
    }

    endGame(){
        this.storeScore();

        this.cardsContainer.style.visibility = "hidden";
        //On active la modal de fin de jeu
        this.endGameModalContainer.style.display = "block";

        //On enlève le memory card game de la page et le timer
        this.cardsContainer.innerHTML = '';
        this.timer.clearTimer();
        this.timerContainer.innerHTML = '';

        let timeScoreHtml = "you did it in " + Timer.getFormattedTimer(this.timer.timerCount) + "s";
        document.querySelector('.game-time').textContent = timeScoreHtml;

        this.handleRestart();
    }

    handleRestart() {
        let restartBtn = document.createElement('button');
        restartBtn.classList.add('restart-btn');
        restartBtn.innerHTML = "<i class='fa-solid fa-arrow-rotate-left'></i>";
        document.querySelector('.restart-btn-container').appendChild(restartBtn);
        
        //On ajoute un click event au bouton restart pour réinitialiser le jeu
        restartBtn.addEventListener("click", () => {
            this.cardsContainer.style.visibility = "visible";
            this.cardsContainer.style.display = "flex";
            this.leaderboard.leaderboardContainer.style.display = "none";
            this.endGameModalContainer.style.display = "none";
            let memoryCardsGame = new MemoryCardsGame(
                this.leaderboard,
                {
                    cardLength : 16
                }
            )
            memoryCardsGame.startGame();
            restartBtn.remove();
        }); 
    }

    storeScore() {
        //When all cards have been turned : disply the leaderboard
        this.leaderboard.leaderboardContainer.style.display = "block";

        this.leaderboard.addNewScore(this.timer.timerCount);

        this.leaderboard.renderScores();

    }

} //End of Memory card game class


