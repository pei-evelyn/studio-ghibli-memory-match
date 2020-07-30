var gameCardsContainer = document.querySelector('#gameCards');

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses = null;
var secondCardClasses = null;

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
        } else {
            setTimeout(function(){
                firstCardClicked.classList.remove('hidden');
                secondCardClicked.classList.remove('hidden');
                gameCardsContainer.addEventListener('click', handleClick);
                firstCardClicked = null;
                secondCardClicked = null;
            }, 1500)

        }

    }
}
