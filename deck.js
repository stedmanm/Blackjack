class Deck {
    #cards;

    constructor() {
        this.reset();
    }

    drawCard() {
        let randomIndex = Math.floor(Math.random() * this.#cards.length);
        let card = this.#cards[randomIndex];
        this.#cards = this.#cards.filter(c => c !== card);
        return card;
    }

    reset() {
        this.#cards = new Array();
        let possibleRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let possibleSuits = ['C', 'D', 'H', 'S'];

        for (let i = 0; i < possibleRanks.length; i++) {
            for (let j = 0; j < possibleSuits.length; j++) {
                this.#cards.push(new Card(possibleRanks[i], possibleSuits[j]));
            }
        }
    }
}

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.imageName = rank + suit + '.png';
    }
}