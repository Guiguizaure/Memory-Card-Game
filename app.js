class MemoryCardsGame {
    constructor(settings) {
        this.settings = settings;
        this.cards = [];
    }

    startGame() {
        this.createCards();
        this.randomizeCardsOrder();
        this.renderCardsDOM();
        this.handleUserClickEvents();
    }

    createCards() {
        let colors = ['blue', 'pink', 'yellow', 'brown', 'green', 'orange', 'purple', 'red'];
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
            document.querySelector('.card-container').appendChild(this.cards[i]);
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
                    firstClickedCard = null;
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
}

let memoryCardsGame = new MemoryCardsGame(
    {
        cardLength : 16
    }
)

memoryCardsGame.startGame();

/**
isItPair.push(card);
                // totalCard.push(card);
                console.log(isItPair.indexOf(e.target));
                

                // if (totalCard.length < this.settings.cardLength) {
                        if (isItPair.length > 2) {
                            return;
                            // card.classList.add('card-hidden');
                        }
                        if (isItPair.length > 1) {
                            // card.classList.add('card-hidden');
                            // setTimeout(() => {
                                const firstIndex = isItPair.indexOf(isItPair[0]);
                                const secondIndex = isItPair.indexOf(isItPair[1]);
                                
                                if (isItPair[1].dataset.id !== isItPair[0].dataset.id) {
                                    // card.classList.remove('card-hidden');
                                    setTimeout(() => {
                                        for (let i = 0; i < isItPair.length; i++) {
                                            isItPair[i].classList.add('card-hidden');
                                        }
                                        isItPair = [];
                                    }, 1000);

                                } else if (firstIndex == secondIndex){
                                    setTimeout(() => {
                                        for (let i = 0; i < isItPair.length; i++) {
                                            isItPair[i].classList.add('card-hidden');
                                        }
                                        isItPair = [];
                                    }, 1000);
                                } else if (firstIndex !== secondIndex){
                                    setTimeout(() => {
                                        console.log('well done!');
                                    }, 200);
                                }

                            // }, 1000);
                            console.log(isItPair[0].dataset)
                            console.log(isItPair[1].dataset)
                        }
                // }

*/