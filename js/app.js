const openCardsArray = [];
const cardDeck = document.querySelector('.deck');
let timePassed = 0;
let intervalID;
let moves = 0;

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

//function to flip cards over
function showCard (target) {
  target.classList.add('open', 'show');
}

//function to remove the open & show CSS classes to hide the card
function hideCard(card) {
  card.classList.remove('open','show');
}

//function to add a card to the openCardsArray
function addtoOpenList (target) {
  openCardsArray.push(target);
}

//function to lock both cards if they match
function lockCards(match, target) {
  target.classList.add('match');
  target.classList.remove('open','show');
  match.classList.add('match');
  match.classList.remove('open','show');
}

//function to search for matched card in the openCardsArray, either locks or
//hides card pending match. Also checks for game win, time delay for card flip
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

//function to increment the move counter and dislay it on the page
function moveCounter () {
  moves += 1;
  document.querySelector('.moves').textContent = moves;
}

//function to start a timer when player clicks on first card and
//displays timer on page & win modal
function timeKeeper() {
  if (moves === 1) {
    intervalID = setInterval(function() {
      timePassed += 1;
      const minutes = parseInt(timePassed / 60, 10);
      const seconds = parseInt(timePassed % 60, 10);
      const hours = parseInt(minutes / 60, 10);
      const timeDisplay = (hours > 0 ? hours + ' hours ' : '') +
        (minutes > 0 ? minutes + ' minute' +
          (minutes >1 ? 's ' : ' ')
          : '')
        + seconds + ' seconds';
      document.querySelector('.timer').textContent = timeDisplay;
      document.querySelector('.winTime').textContent = timeDisplay;
    }, 1000)
  }
}

//function to stop timer if player wins or clicks restart button
function stopTimer() {
  clearInterval(intervalID);
}

//function to display the star rating to reflect player's performance. It should
//decrement after a certain # of moves, then again after a certain # of moves
//also decrements modal stars
function starRating() {
  let lastStar;
  let lastModalStar;
  const deckStars = document.querySelectorAll('.stars .fa-star')
  const modalStars = document.querySelectorAll('.winStars .fa-star')
  if (moves === 33) {
    lastStar = deckStars[2];
    lastModalStar = modalStars[2];
  } else if (moves === 45) {
    lastStar = deckStars[1];
    lastModalStar = modalStars[1];
  } else if (moves === 52) {
    lastStar = deckStars[0];
    lastModalStar = modalStars[0];
  }
  if (lastStar !== undefined) {
    lastStar.classList.replace('fa-star', 'fa-star-o');
    lastModalStar.classList.replace('fa-star', 'fa-star-o');
  }
}

//function to check if game won, show modal to congratulate player on winning,
//ask if they want to play again. Modal shows game stats.
function checkWinGame() {
  //check if player has won
  if (document.querySelectorAll('.match').length === 16) {
    //show hidden congrats modal
    document.querySelector('.modal').classList.remove('hidden');
    //display move number
    document.querySelector('.winMoves').textContent = moves;
    stopTimer();
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
  stopTimer();
  timePassed = 0;
  document. querySelector('.timer').textContent = '';
}

//function to show the card, check for match, increment moves, update stars, and
//start timer
function respondtoClick(event) {
  if (event.target.classList.contains('card') &&
      !event.target.classList.contains('match') &&
      !event.target.classList.contains('open') &&
      !event.target.classList.contains('show')) {
    showCard(event.target);
    moveCounter();
    starRating();
    cardMatchCheck(event.target);
    timeKeeper();
  }
}

//function to update the gameboard with shuffled cards
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
