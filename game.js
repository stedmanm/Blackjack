const WIN = 'win';
const LOSS = 'loss';
const DRAW = 'draw';

let wins = 0;
let losses = 0;
let draws = 0;

let you = new Player(0, 'your-score', 'your-cards');
let dealer = new Player(0, 'dealer-score', 'dealer-cards');
let deck = new Deck();

function blackjackHit() {
    dealCard(you);
    playCardSound();
    if (you.score > 21) {
        endGame(LOSS);
    }
}

async function blackjackStand() {
    displayButtons(false, false, false);

    while (dealer.score <= 16) {
        dealCard(dealer);
        playCardSound();
        await sleep(1000);
    }

    if (dealer.score === you.score) {
        endGame(DRAW);
    }
    else if (dealer.score > 21) {
        endGame(WIN);
    }
    else {
        endGame(you.score > dealer.score ? WIN : LOSS);
    }

}

function blackjackDeal() {
    deck.reset();
    resetPlayer(you);
    resetPlayer(dealer);

    displayButtons(true, true, false);
    displayGameResult("Let's play!", 'black');

    dealCard(you);
    dealCard(you);

    dealCard(dealer);

    playCardSound();
}

function dealCard(player) {
    let card = deck.drawCard();

    let cardImage = document.createElement('img');
    cardImage.src = `images/${card.imageName}`;

    document.getElementById(player.cardAreaDivId).appendChild(cardImage);

    updateScore(player, card);
}

function updateScore(player, card) {
    let scoresByCards = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10 };
    let score = 0;

    if (card.rank !== 'A') {
        score = scoresByCards[card.rank];
    } else {
        if (player.score + 11 <= 21) {
            score = 11;
        } else {
            score = 1;
        }
    }
    
    setScore(player, player.score + score);
}

function setScore(player, score) {
    player.score = score;
    if (player.score <= 21) {
        document.getElementById(player.scoreSpanId).textContent = player.score;
        document.getElementById(player.scoreSpanId).style.color = 'white';
    } else {
        document.getElementById(player.scoreSpanId).textContent = 'BUST!';
        document.getElementById(player.scoreSpanId).style.color = 'red';
    }
}

function endGame(result) {
    if (result === WIN) {
        wins++;
        document.getElementById('wins').textContent = wins;
        displayGameResult('You won!', 'green');
        playWinSound();
    }
    else if (result === LOSS) {
        losses++;
        document.getElementById('losses').textContent = losses;
        displayGameResult('You lost!', 'red');
        playLoseSound();
    }
    else if (result === DRAW) {
        draws++;
        document.getElementById('draws').textContent = draws;
        displayGameResult('Draw!', 'yellow');
    }

    displayButtons(false, false, true);
}

function displayGameResult(message, color) {
    let element = document.getElementById('result');
    element.textContent = message;
    element.style.color = color;
}

function resetPlayer(player) {
    clearCardImages(player);
    setScore(player, 0);
}

function displayButtons(hit, stand, deal) {
    clearButtons();

    if (hit) {
        addButton('Hit', blackjackHit, 'btn-primary');
    }

    if (stand) {
        addButton('Stand', blackjackStand, 'btn-warning');
    }

    if (deal) {
        addButton('Deal', blackjackDeal, 'btn-danger');
    }
}

function addButton(name, onClickAction, buttonClass) {
    let button = document.createElement('button');
    button.textContent = name;
    button.classList.add('btn-lg');
    button.classList.add(buttonClass);
    button.classList.add('mr-2');
    button.addEventListener('click', onClickAction);

    let buttonDiv = document.getElementById('button-div')
    buttonDiv.appendChild(button);
}

function clearCardImages(player) {
    let images = document.getElementById(player.cardAreaDivId).getElementsByTagName('img');
    while (images.length !== 0) {
        images[0].remove();
    }
}

function clearButtons() {
    let buttons = document.getElementById('button-div').getElementsByTagName('button');
    while (buttons.length !== 0) {
        buttons[0].remove();
    }
}

function playCardSound() {
    new Audio('sounds/swish.m4a').play();
}

function playWinSound() {
    new Audio('sounds/cash.mp3').play();
}

function playLoseSound() {
    new Audio('sounds/aww.mp3').play();
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}