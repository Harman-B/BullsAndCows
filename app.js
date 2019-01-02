function BullsAndCows(word) {
  this.instance = null;
  this.word = word;
  this.hasEnded = false;
  this.check = null;
  this.lastGuess = null;
  this.nbGuesses = 0;
}

BullsAndCows.prototype.checkGuessWord = function (guessWord) {
  this.lastGuess = guessWord;
  nbGuesses++;
  var check, letterComparisonArr;
  this.check = {
    bulls: 0,
    cows: 0,
    guesses: 0
  };
  letterComparisonArr = [];

  if (guessWord.length === 4) {
    this.check.guesses++;
    for (var i = 0; i<4; i++) {
      letterComparisonArr[i] = guessWord.indexOf(this.word.charAt(i));
      if (letterComparisonArr[i] === i) {
        this.check.bulls++;
      } else if (letterComparisonArr[i] !== -1) {
        this.check.cows++;
      }
    }
  }
}

BullsAndCows.prototype.hasGuessedCorrectly = function() {
  if(this.check == null && this.word !== null) {
    return false;
  }
  if (this.check.bulls === 4) {
    return true;
  }
  return false;
}

BullsAndCows.prototype.getCurrentStatus = function() {
  return this.check;
}

BullsAndCows.prototype.getLastGuess = function() {
  return this.lastGuess;
}

BullsAndCows.prototype.create = function(word) {
  if(this.instance == null) {
    if(word.length === 4) {
      this.instance = new BullsAndCows(word);
    }else {
      return null;
    }
  }
  return this.instance;
}

$(document).ready(function(){
  $("#add_word").click(function(){
    startGame();
  });
  $("#reset").click(function(){
    resetGame();
  });

  $("#add_guess").click(function(){
    makeGuess();
  });

});

function startGame() {
  console.log('Game is about to start.');
  getWord();
  if (model !== undefined) {
    document.getElementById('word').value = '';
    document.getElementById('add_word').disabled = true;
    document.getElementById('error').innerText = '';
    document.getElementById('playArea').style.display = 'block';
    document.getElementById('guessWord').focus();
    document.addEventListener('keypress', play);
    console.log('Game started.');

  }else {
      console.log('Game did not start.');
  }
}

function resetGame() {
  document.querySelector('.guess_list').innerHTML = '';
  document.getElementById('add_word').disabled = false;
}

function play(event) {
  if (event.keyCode === 13) {
    makeGuess();
  }
}

function makeGuess() {
  var guess, check;
  guess = getGuessWord();
  model.checkGuessWord(guess);
  displayResult();
  clearField();
  if(model.hasGuessedCorrectly()) {
    endGame();
  }
}

function endGame() {
  document.querySelector('.guess_list').insertAdjacentHTML('beforeend', 'You Guessed it Right!!');
  document.getElementById('add_guess').disabled = true;
  document.removeEventListener('keypress', play);
}

function getWord() {
  var word = document.getElementById('word').value;
  model = BullsAndCows.create(word);
  if (model === null) {
    showError();
}

function getGuessWord() {
  return document.getElementById('guessWord').value;
}

function showError() {
  document.getElementById('error').innerText = 'Enter a four letter word!';
}

function displayResult() {
  var html, newHtml, result, el;

  el = document.querySelector('.guess_list');
  var check = model.getCurrentStatus();
  result = check.bulls + 'B' + check.cows + 'C';

  html = '<p>%guess%: %result%<p>';
  newHtml = html.replace('%guess%', model.getLastGuess());
  newHtml = newHtml.replace('%result%', result);

  el.insertAdjacentHTML('beforeend', newHtml);
}

function clearField() {
  document.getElementById('guessWord').value = '';
}
