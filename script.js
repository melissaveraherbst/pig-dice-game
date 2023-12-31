// assign DOM elements to variables
// player 1
const player1 = document.querySelector("#player--1");
const scoreElementP1 = document.querySelector("#score--1");
const currentScoreElementP1 = document.querySelector("#current--1");
// player 2
const player2 = document.querySelector("#player--2");
const scoreElementP2 = document.querySelector("#score--2");
const currentScoreElementP2 = document.querySelector("#current--2");
// buttons
const imgDie = document.querySelector("#die");
const btnDie = document.querySelector("#btn--roll");
const btnHold = document.querySelector("#btn--hold");
const btnNew = document.querySelector("#btn--new");

// functions
const resetCurrentScores = () => {
	currentScoreP1 = 0;
	currentScoreElementP1.textContent = currentScoreP1;
	currentScoreP2 = 0;
	currentScoreElementP2.textContent = currentScoreP2;
};

const resetTotalScores = () => {
	scoreP1 = 0;
	scoreElementP1.textContent = scoreP1;
	scoreP2 = 0;
	scoreElementP2.textContent = scoreP2;
};

const newGame = () => {
	// remove winner class
	player1.classList.remove("player--winner");
	player2.classList.remove("player--winner");
	// reset active player class
	player1.classList.add("player--active");
	player2.classList.remove("player--active");
	// reset current and total scores
	resetCurrentScores();
	resetTotalScores();
};

const switchPlayers = () => {
	player1.classList.toggle("player--active");
	player2.classList.toggle("player--active");
};

// game starting conditions
newGame();
winningScore = 100;

// roll the die functionalities
btnDie.addEventListener("click", () => {
	// generate random number 1-6
	const dieRoll = Math.trunc(Math.random() * 6) + 1;
	imgDie.src = `die-${dieRoll}.png`;
	imgDie.classList.remove("hidden");
	if (dieRoll !== 1) {
		if (player1.classList.contains("player--active")) {
			// P1 is active
			currentScoreP1 = currentScoreP1 + dieRoll;
			currentScoreElementP1.textContent = currentScoreP1;
		} else {
			// P2 is active
			currentScoreP2 = currentScoreP2 + dieRoll;
			currentScoreElementP2.textContent = currentScoreP2;
		}
	} else {
		// switch player
		resetCurrentScores();
		switchPlayers();
	}
});

btnHold.addEventListener("click", () => {
	// 1. Add current scores to total score
	if (player1.classList.contains("player--active")) {
		// P1 is active
		scoreP1 = scoreP1 + currentScoreP1;
		scoreElementP1.textContent = scoreP1;
	} else {
		// P2 is active
		scoreP2 = scoreP2 + currentScoreP2;
		scoreElementP2.textContent = scoreP2;
	}
	// 2. check if current player's score is >= 100
	if (scoreP1 >= 100) {
		player1.classList.add("player--winner");
	} else if (scoreP2 >= 100) {
		player2.classList.add("player--winner");
	} else {
		// 3. reset current scores
		resetCurrentScores();
		// 4. switch players
		switchPlayers();
	}
});

btnNew.addEventListener("click", () => {
	newGame();
});
