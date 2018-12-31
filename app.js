var word;

function startGame() {
  word = getWord();
  if (word !== undefined) {
    document.getElementById('word').value = '';
    document.getElementById('add_word').disabled = true;
    document.getElementById('error').innerText = '';
    document.getElementById('playArea').style.display = 'block';
    document.getElementById('guessWord').focus();
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13) {
        makeGuess();
      }
    });
  }
}

function makeGuess() {
  var guess, check;
  guess = getGuessWord();
  check = checkGuessWord(word, guess);
  displayResult(guess, check);
  clearField

  x();
  if (check.bulls === 4) {
    endGame();
  }

}

function endGame() {
  document.querySelector('.guess_list').insertAdjacentHTML('beforeend', 'You Guessed it Right!!');
  document.getElementById('add_guess').disabled = true;
}

function getWord() {
  var word = document.getElementById('word').value;
  if (word.length === 4) {
    return word;
  } else {
    showError();
  }
}

function getGuessWord() {
  return document.getElementById('guessWord').value;
}

function  checkGuessWord(word, guessWord) {

  var check, letterComparisonArr;

  check = {
    bulls: 0,
    cows: 0,
    guesses: 0
  };
  letterComparisonArr = [];

  if (guessWord.length === 4) {
    check.guesses++;
    for (var i = 0; i<4; i++) {
      letterComparisonArr[i] = guessWord.indexOf(word.charAt(i));
      if (letterComparisonArr[i] === i) {
        check.bulls++;
      } else if (letterComparisonArr[i] !== -1) {
        check.cows++;
      }
    }
  }
  return check;
}

function showError() {
  document.getElementById('error').innerText = 'Enter a four letter word!';
}

function displayResult(guessWord, check) {
  var html, newHtml, result, el;

  el = document.querySelector('.guess_list');
  result = check.bulls + 'B' + check.cows + 'C';

  html = '<p>%guess%: %result%<p>';
  newHtml = html.replace('%guess%', guessWord);
  newHtml = newHtml.replace('%result%', result);

  el.insertAdjacentHTML('beforeend', newHtml);
}

function clearField() {
  document.getElementById('guessWord').value = '';
}
