// The unordered list where the player’s guessed letters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const buttonGuess = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const displayRemaining = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const buttonPlayAgain = document.querySelector(".play-again");
//magnolia is the placeholder/starting word for testing the game
const word = "magnolia";

// Display circle symbols as placeholders for the chosen word's letters
const progressUpdate = function (word) {
    const wordLength = [];
    for (const letter of word) {
      console.log(letter);
      wordLength.push("●");
    }
    wordInProgress.innerText = wordLength.join("");
  };
progressUpdate(word);

//guess button click event to capture input and then clear input field
buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = letterInput.value;
    console.log(inputValue);
    letterInput.value = "";
});