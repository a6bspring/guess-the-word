// The unordered list where the player’s guessed letters will appear.
const guessedLettersDisplay = document.querySelector(".guessed-letters");
// The button with the text “Guess!” in it.
const buttonGuess = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter");
// The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const displayRemainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const displayRemainingSpan = document.querySelector(".remaining span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const buttonPlayAgain = document.querySelector(".play-again");

//magnolia is the placeholder/starting word for testing the game
let word = "magnolia";
//This array contains all the letters the player guesses
const guessedLetters = [];
//The value 8 is the maximum number of guesses the player can make.
let remainingGuesses = 8;

const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //console.log(randomIndex);
    word = wordArray[randomIndex].trim();
    //console.log(word);
    placeholder(word);
};
//this starts the game
getWord();

// Display circle symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const wordLength = [];
    for (const letter of word) {
      //console.log(letter);
      wordLength.push("●");
    }
    wordInProgress.innerText = wordLength.join("");
  };
//placeholder(word); now this is in the getWord function created after.

//guess button click event to capture input and then clear input field
buttonGuess.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const inputValue = letterInput.value;
    //console.log(inputValue);
    const validGuess = validateInput(inputValue);
    //console.log(validGuess);
    if (validGuess) {
        makeGuess(inputValue);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a single letter A-Z.";
    } else {
        return input;
    }
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You have already guessed that letter!";
    } else {
        guessedLetters.push(letter);
        //console.log(guessedLetters);
        guessCount(letter);
        showGuesses();
        progressUpdate(guessedLetters);
    }
};

const showGuesses = function () {
    guessedLettersDisplay.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersDisplay.append(li);
    }
};

const progressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
      } else {
        revealWord.push("●");
      }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    successfulGuess();
};

const guessCount = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText =`The word does not contain ${guess}!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Hooray! The word contains ${guess}!`;
    }

    if (remainingGuesses === 0) {
        displayRemainingGuesses.innerHTML = `Game over! The word was <span class="highlight"> ${word.toUpperCase()}</span>.`;
    } else if (remainingGuesses === 1) {
        displayRemainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        displayRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const successfulGuess = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    } 
};