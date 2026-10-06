//1. Instances of all nodes 
let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");

let score1 = document.querySelector("#score--0");
let score2 = document.querySelector("#score--1");

let current1 = document.querySelector("#current--0");
let current2 = document.querySelector("#current--1");

let diceE1 = document.querySelector(".dice");
let btnNew = document.querySelector(".btn--new");
let btnHold = document.querySelector(".btn--hold");
let btnRoll = document.querySelector(".btn--roll");
let btnTheme = document.querySelector(".btn--theme");


//2. declare few variables for internal working

let mainScore1, mainScore2, currentScore, activePlayer, playing;


//3. New game button functionality

let init = () => {
    //3.1 set all score to 0
    current1.textContent = 0;
    current2.textContent = 0;
    currentScore = 0;
    mainScore1 = 0;
    mainScore2 = 0;
    score1.textContent = 0;
    score2.textContent = 0;
    activePlayer = 0;
    playing = true;


    //3.2 set player 1 as active player
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
    player1.classList.remove("player--winner");
    player2.classList.remove("player--winner");

    //3.3 Remove dice image
    diceE1.classList.add("hidden");
};

init();


//4. Change the active player

let changePlayer = () => {

    //4.1 Reset current score
    currentScore = 0;

    current1.textContent = 0;
    current2.textContent = 0;

    //4.2 Change active player
    activePlayer = activePlayer === 0 ? 1 : 0;

    //4.3 Change active player styling
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
};


//5. Roll dice button functionality

btnRoll.addEventListener("click", () => {

    //5.1 Check if game is still running
    if (playing) {

        //5.2 Generate a random dice number between 1 and 6
        let dice = Math.trunc(Math.random() * 6) + 1;

        //5.3 Display the correct dice image
        diceE1.src = `./dice-${dice}.png`;
        diceE1.classList.remove("hidden");

        //5.4 If dice is not 1, add dice value to current score
        if (dice !== 1) {

            currentScore = currentScore + dice;

            //5.5 Display current score
            if (activePlayer === 0) {
                current1.textContent = currentScore;
            } else {
                current2.textContent = currentScore;
            }

        } else {

            //5.6 If dice is 1, change the player
            changePlayer();
        }
    }
});


//6. Hold button functionality

btnHold.addEventListener("click", () => {

    //6.1 Check if game is still running
    if (playing) {

        //6.2 Add current score to the main score
        if (activePlayer === 0) {

            mainScore1 = mainScore1 + currentScore;
            score1.textContent = mainScore1;

        } else {

            mainScore2 = mainScore2 + currentScore;
            score2.textContent = mainScore2;
        }


        //6.3 Check if player has reached 100 points
        if (mainScore1 >= 100 || mainScore2 >= 100) {

            //6.4 Stop the game
            playing = false;

            //6.5 Hide dice
            diceE1.classList.add("hidden");

            //6.6 Show winner
            if (mainScore1 >= 100) {
                player1.classList.add("player--winner");
            } else {
                player2.classList.add("player--winner");
            }

        } else {

            //6.7 Change player
            changePlayer();
        }
    }
});


//7. New game button functionality

btnNew.addEventListener("click", init);

//8. Dark / Light mode functionality

btnTheme.addEventListener("click", () => {

    // Add or remove dark mode
    document.body.classList.toggle("dark-mode");

    // Change button text
    if (document.body.classList.contains("dark-mode")) {
        btnTheme.textContent = "☀️ Light Mode";
    } else {
        btnTheme.textContent = "🌙 Dark Mode";
    }
});