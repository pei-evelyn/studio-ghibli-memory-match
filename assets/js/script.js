var gameCardsContainer = document.querySelector('#gameCards');

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;

var maxMatches = 9;
var matches = 0;

var attempts = 0;
var gamesPlayed = 0;

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
                var modal = document.querySelector('.modal-container');
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
}

function displayStats() {
    var gamesPlayedNum = document.querySelector('#games-played-number');
    var attemptsNum = document.querySelector('#attempts-number');
    var accuracyNum = document.querySelector('#accuracy-number');

    gamesPlayedNum.textContent = gamesPlayed;
    attemptsNum.textContent = attempts;
    accuracyNum.textContent = calculateAccuracy(attempts, matches);
}

function calculateAccuracy(attempts, matches) {
    var accuracyNum = matches / attempts;
    return Math.round(accuracyNum * 100) + '%';
}
