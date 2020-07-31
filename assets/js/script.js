var gameCardsContainer = document.querySelector('#gameCards');
var resetButton = document.querySelector('#reset-button');
var modal = document.querySelector('.modal-container');
var modalText = document.querySelector('.modal-text');

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

// Dynamic Card Shuffle

var cardFrontDeck = [
    'card-front-1',
    'card-front-2',
    'card-front-3',
    'card-front-4',
    'card-front-5',
    'card-front-6',
    'card-front-7',
    'card-front-8',
    'card-front-9',
    'card-front-1',
    'card-front-2',
    'card-front-3',
    'card-front-4',
    'card-front-5',
    'card-front-6',
    'card-front-7',
    'card-front-8',
    'card-front-9'
]

window.addEventListener('load', startGame);

function createCards() {
    var cardContainer = document.querySelectorAll('.card');
    for (var j = 0; j < cardFrontDeck.length; j++) {
        var frontCardDiv = document.createElement('div');
        var backCardDiv = document.createElement('div');
        frontCardDiv.classList.add('card-front', cardFrontDeck[j]);
        backCardDiv.classList.add('card-back');
        cardContainer[j].append(frontCardDiv, backCardDiv);
    }
}

function shuffleCardArray(array) {
    for (var s = 0; s < array.length; s++) {
        var randomNum = Math.floor(Math.random() * array.length);
        var randomCard = array[s];
        array[s] = array[randomNum];
        array[randomNum] = randomCard;
    }
}

function startGame() {
    shuffleCardArray(cardFrontDeck);
    createCards();
    setTimeout(loseGame, 180000);
}

// Handle Click

gameCardsContainer.addEventListener('click', handleClick);

function handleClick(event) {
    if (event.target.className.indexOf('card-back') === -1) {
        return;
    }
    var cardClicked = event.target;
    cardClicked.className += ' hidden'

    if (!firstCardClicked) {
        firstCardClicked = cardClicked;
        var firstCardClickedSib = firstCardClicked.previousElementSibling;
        firstCardClasses = firstCardClickedSib.className;
    } else {
        secondCardClicked = cardClicked;
        var secondCardClickedSib = secondCardClicked.previousElementSibling;
        secondCardClasses = secondCardClickedSib.className;
        gameCardsContainer.removeEventListener('click', handleClick);

        if (firstCardClasses === secondCardClasses) {
            gameCardsContainer.addEventListener('click', handleClick);
            firstCardClicked = null;
            secondCardClicked = null;
            matches++;
            attempts++;
            displayStats();
            if (matches === maxMatches) {
                modalText.textContent = "Congrats! You've won!";
                modal.classList.remove('hidden');
            }
        } else {
            setTimeout(function(){
                firstCardClicked.classList.remove('hidden');
                secondCardClicked.classList.remove('hidden');
                gameCardsContainer.addEventListener('click', handleClick);
                firstCardClicked = null;
                secondCardClicked = null;
                attempts++;
                displayStats();
            }, 1500)
        }
    }

    if (attempts === 10) {
        loseGame();
    }
}

// Stats Bar

function displayStats() {
    var gamesPlayedNum = document.querySelector('#games-played-number');
    var attemptsNum = document.querySelector('#attempts-number');
    var accuracyNum = document.querySelector('#accuracy-number');

    gamesPlayedNum.textContent = gamesPlayed;
    attemptsNum.textContent = attempts;
    accuracyNum.textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
    if (!attempts) {
        return '0%';
    }
    var accuracyNum = matches / attempts;
    return Math.round(accuracyNum * 100) + '%';
}

// Reset Game

function resetGame() {
    attempts = 0;
    matches = 0;
    gamesPlayed++;
    displayStats();
    resetCards();
    modal.classList.add('hidden');
    startGame();
}

function resetCards() {
    var hiddenCards = document.querySelectorAll('.card-back');
    for (var i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
    }
}

resetButton.addEventListener('click', resetGame)


// Lose Game



function loseGame() {
    modalText.textContent = "Oh no! You've Lost!";
    modal.classList.remove('hidden');
}
