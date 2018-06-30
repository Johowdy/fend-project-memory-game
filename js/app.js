/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
const openCardsArray = []
const cardDeck = document.querySelector('.deck');
function respondtoClick(event) {
  showCard(event.target);
  cardMatch(event.target);
  openCard(event.target);
}

function showCard (target) {
  target.classList.add('open', 'show');
}

function openCard (target) {
  openCardsArray.push(target);
}

function cardMatch(target) {
  if (openCardsArray.length > 0) {
    const icon = target.getElementsByTagName('i')[0];
    const match = openCardsArray.find(function(element) {
      if (icon.className === element.getElementsByTagName('i')[0].className) {
        return true;
      } else {
        return false;
      }
    });
    if (match) {
      lockCards(match, target);
    } else {

    }

  }
}

function lockCards(match, target) {
  target.classList.add('match');
  match.classList.add('match');
}
cardDeck.addEventListener('click', respondtoClick);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)done!
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)done!
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
