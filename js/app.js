/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const openCardsArray = [];
const cardDeck = document.querySelector('.deck');
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
//shows the card, checks for match, increments move #, updates stars
function respondtoClick(event) {
  if (event.target.classList.contains('card') &&
      !event.target.classList.contains('match') &&
      !event.target.classList.contains('open') &&
      !event.target.classList.contains('show')) {
    showCard(event.target);
    moveCounter();
    starRating();
    cardMatchCheck(event.target);
  }
}
//flips cards over
function showCard (target) {
  target.classList.add('open', 'show');
}
//adds a card to the openCardsArray, called in cardMatchCheck function
function addtoOpenList (target) {
  openCardsArray.push(target);
}

//function to search for matched card in the openCardsArray, either locks or
//hides card pending match
function cardMatchCheck(target) {
  if (openCardsArray.length > 0) {
    //grabs the 'i' tag underneath the clicked card
    const icon = target.getElementsByTagName('i')[0];
    //match variable = contains either matching card or undefined
    const match = openCardsArray.find(function(element) {
      if (icon.className === element.getElementsByTagName('i')[0].className) {
        return true;
      } else {
        return false;
      }
    });
    //locks cards when matched
    if (match !== undefined) {
      lockCards(match, target);
      //empties array after match occurs
      openCardsArray.pop();
      checkWinGame();
    } else {
      //hiding card that was just clicked, hiding card in the array after a
      //time delay
      setTimeout(function() {
        hideCard(target);
        hideCard(openCardsArray.pop());
      }, 250);
    }
  } else {
    //adds the first card that's clicked to the array
    addtoOpenList(target);
  }
}
//removes the open & show CSS classes to hide the card, called in cardMatchCheck
function hideCard(card) {
  card.classList.remove('open','show');
}
//function to lock both cards if they match, called in cardMatchCheck
function lockCards(match, target) {
  target.classList.add('match');
  target.classList.remove('open','show');
  match.classList.add('match');
  match.classList.remove('open','show');
}

//function to increment the move counter and dislay it on the page & put
//functionality in another function called from this one
let moves = 0;
function moveCounter () {
  moves += 1;
  document.querySelector('.moves').textContent = moves;
}

//function to display a timer when a player starts a game and stops once the
//player wins the game
function timeKeeper() {

}

//function to display the star rating to reflect player's performance. It should
//decrement after a certain # of moves, then again after a certain # of moves
//also decrements modal stars
function starRating() {
  let lastStar;
  let lastModalStar;
  const deckStars = document.querySelectorAll('.stars .fa-star')
  const modalStars = document.querySelectorAll('.winStars .fa-star')
  if (moves === 5) {
    lastStar = deckStars[2];
    lastModalStar = modalStars[2];
  } else if (moves === 10) {
    lastStar = deckStars[1];
    lastModalStar = modalStars[1];
  } else if (moves === 11) {
    lastStar = deckStars[0];
    lastModalStar = modalStars[0];
  }
  if (lastStar !== undefined) {
    lastStar.classList.replace('fa-star', 'fa-star-o');
    lastModalStar.classList.replace('fa-star', 'fa-star-o');
  }
}

//function to congratulate player on winning, ask if they want to play again,
//and provide summary of time to win and star starRating
function checkWinGame() {
  //check if player has won
  if (document.querySelectorAll('.match').length === 16) {
    //create a modal with text
    document.querySelector('.modal').classList.remove('hidden');
    //display win time
    //display move number
    document.querySelector('.winMoves').textContent = moves;
  }
}

//function to restart the game board, the timer, the star rating
function restart() {
  //empty openCardsArray
  openCardsArray.pop();
  //reset move counter
  moves = 0;
  document.querySelector('.moves').textContent = moves;
  //reset time
  //reset stars
  document.querySelectorAll('.fa-star-o').forEach(function(element) {
    element.classList.replace('fa-star-o', 'fa-star');
  });
  //flip cards upside down
  document.querySelectorAll('.card').forEach(function(element) {
    element.classList.remove('match', 'open', 'show');
  });
  deckShuffle();
}
//updates the gameboard with shuffled cards
function deckShuffle() {
  const shuffled = shuffle(Array.from(document.querySelectorAll('.card')));
  shuffled.forEach(function(element) {
    element.remove();
  });
  shuffled.forEach(function(element) {
    cardDeck.appendChild(element)
  });
}

deckShuffle();
document.querySelector('.fa-repeat').addEventListener('click', restart);
document.querySelector('.replayButton').addEventListener('click', function() {
  document.querySelector('.modal').classList.add('hidden');
  restart();
});
document.querySelector('.closeButton').addEventListener('click', function() {
  document.querySelector('.modal').classList.add('hidden');
});
cardDeck.addEventListener('click', respondtoClick);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)done!
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)done!
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)done!
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)done!
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
