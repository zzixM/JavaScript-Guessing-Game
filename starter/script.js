'use strict';
// global constants
const doc = document;
const docQ = query => document.querySelector(query)

/**
 * ! DOM comes from web APIs not JS
 * * bellow is working out code and not used
 */
/*


// gets text value from the HTML tag with the class "message"
console.log(document.querySelector(".message").textContent); 
document.querySelector(".message").textContent = "Correct Number";

// updating the number element and score
document.querySelector(".number").textContent = 23;
document.querySelector(".score").textContent = 610;

// setting value of input field
doc.querySelector(".guess").value = 10;
console.log(doc.querySelector(".guess").value); 
*/

/**
 * ? seting up event lisiners
 * ! addEventListener requiers they have a type of event and 
 * ! a function value to be passed as arguments
 * * CSS manipulation in win section
 */

// Game globals
const genNumber = () => {
    const GAMENUMBER = Math.trunc(Math.random() * 20) + 1; // .random returns a number between 1 and 0
    return GAMENUMBER
}
let _GAMENUMBER = genNumber()
let gameScore;
let highScore = 0;

// initializing game
resetGameScore();

// Game logic for checking if the user has guessed the number
doc.querySelector(".check").addEventListener("click", function() {
    const guess = Number(doc.querySelector(".guess").value);
    console.log("Guess:", guess);

    // if no guess is passed its falsy so code activates
    if (!guess) {
        docQ(".message").textContent = "Please enter a number.";

    } else if (guess === _GAMENUMBER) {
        // checks if the player has lost and prevents a win
        if (gameScore <= 0) {
            lostGame();

        } else { // if they haven't lost player wins
            docQ(".number").textContent = _GAMENUMBER;
            docQ(".message").textContent = "Correct number.";
            setHighScore();
            resetGameScore();

            // updartes background to green
            /**
             ** CSS manipulation 
             * ! CSS atributes with more than one word are accessed in JS with cammelCase
             * ? CSS manipulation needs to be used with strings
             */
            docQ("body").style.backgroundColor = "#60b347";
            docQ(".number").style.width = "30rem";
        }

        // sees if the guess is incorect and if it is decreses gameScore
    } else if (guess > _GAMENUMBER) { 
        docQ(".message").textContent = "Guess is too high.";
        decreaseScore();

        // sees if the guess is incorect and if it is decreses gameScore
    } else if (guess < _GAMENUMBER) {
        docQ(".message").textContent = "Guess is too low.";
        decreaseScore();
    }
});

// Handles click event of the "Again" button to restart game
docQ(".again").addEventListener("click", function() {
    // restets veriables and texts
    resetGameScore();
    docQ(".number").textContent = "?";
    docQ(".message").textContent = "Start guessing...";
    docQ(".guess").value = "";

    // re-generates a random number
    let _tempGameNumber = genNumber();

    // resteing game style
    docQ("body").style.backgroundColor = "#222";
    docQ(".number").style.width = "15rem";

    // Dev - Logging
    console.log(`Game score: ${gameScore}`)
    console.log(_tempGameNumber);

    // returns new game number
    return _GAMENUMBER = _tempGameNumber;
})


// used for decreasing score
const decreaseScore = function() {
    gameScore--;
    if (gameScore <= 0) {
        lostGame();
    }
    docQ(".score").textContent = gameScore;
}

// used for setting high score
const setHighScore = function() {
    if (highScore < gameScore) {
        highScore = gameScore;
        docQ(".highscore").textContent = highScore;
    }
    
}
// stops gameScore from passing 0 and updates .message to loss mesage
const lostGame = function() {
    docQ(".message").textContent = "You Lost the game";
    gameScore = 0;
}

// used for restest game score
function resetGameScore() {
    gameScore = 20;
    docQ(".score").textContent = gameScore;
}


/**
 * * FOR GitHub -
 * ! game code writen by - @zzixM
 * ! index.html and style.css writen by - @jonasschmedtmann
 * ? project from "The Complete JavaScript Course 2024: From Zero to Expert!"
 * ? this project was not a colaberation
 */