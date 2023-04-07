class Game {

    constructor(settings) {
        this.settings = settings;
    }

    startGame() {
        let cardContainer = document.querySelector('.card-container');

        // let cardCount = 16;
        // let idNumber = Math.random() * this.settings.cardLength / 2;

        let cards = [];
        let colors = ['blue', 'pink', 'yellow', 'brown', 'green', 'orange', 'purple', 'red'];
        let counter = 0;
       
        //Instantiations des cards
        for (let i = 0; i < this.settings.cardLength; i++){
            let card = document.createElement('div');
            card.classList.add('card');
            cards.push(card);

            //Creation des pairs 
            if (i % 2 === 0 ) {
                counter++;
            }
            cards[i].dataset.id = counter;
            cards[i].style.backgroundColor = colors[counter - 1];
        }

        //randomization
        for (let i = 0; i < cards.length; i++) {
            let randomNum = Math.floor(Math.random() * 15);
            const temp = cards[i];

            cards[i] = cards[randomNum];
            cards[randomNum] = temp;
        }
        //Render cards on the DOM
        for (let i = 0; i < cards.length; i++){
            cardContainer.appendChild(cards[i]);
            cards[i].classList.add('card-hidden');
        }


        // let card = document.querySelectorAll('.card')

        // for (let i = 0; i < cards; i++){
        //     card.addEventListener('click', (e) => {
        //                 console.log('e.target.id')
        //             })
        // }

        // let removedCard = 0;
        let isItPair = [];
        let totalCard = [];

        cards.forEach((card) => 
            card.addEventListener('click', (e) => {

                card.classList.remove('card-hidden');

                isItPair.push(card);
                totalCard.push(card);
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

                
               
                
                
               
                // console.log(e.target.classList.contains('card-hidden'))
                // console.log(isItPair.length)
                // console.log(isItPair)
                // console.log(card.dataset.id)
            })
        );
        // console.log(isItPair.length)
        console.log(isItPair)
        
        // setTimeout(() => {
        //     console.log(isItPair[0].dataset.id)
        //     console.log(isItPair[1].dataset.id);
        //               }, 5000);
        
        
        // console.log(card[4])





    }
}

let game = new Game(
    {
        cardLength : 16
    }
)

game.startGame();