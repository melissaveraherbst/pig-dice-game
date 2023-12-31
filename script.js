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
const btnRollDie = document.querySelector("#btn--roll");
const btnHold = document.querySelector("#btn--hold");
const btnNew = document.querySelector("#btn--new");
// modal
const modal = document.querySelector("#modal");
const btnToggleModal = document.querySelector("#btn--open-modal");

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
	// enable roll and hold buttons
	btnRollDie.disabled = false;
	btnHold.disabled = false;
};

const switchPlayers = () => {
	player1.classList.toggle("player--active");
	player2.classList.toggle("player--active");
};

// game starting conditions
newGame();
winningScore = 100;

// roll the die functionalities
btnRollDie.addEventListener("click", () => {
	// generate random number 1-6
	const dieRoll = Math.trunc(Math.random() * 6) + 1;
	imgDie.src = `/images/die-${dieRoll}.png`;
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
	// die animation
	imgDie.classList.remove("animate");
	setTimeout(() => imgDie.classList.add("animate"), 0);
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
	// 2. check if current player's score is >= the winning score (default is 100)
	if (scoreP1 >= winningScore) {
		player1.classList.add("player--winner");
		btnRollDie.disabled = true;
		btnHold.disabled = true;
	} else if (scoreP2 >= winningScore) {
		player2.classList.add("player--winner");
		btnRollDie.disabled = true;
		btnHold.disabled = true;
	} else {
		// 3. reset current round scores
		resetCurrentScores();
		// 4. switch players
		switchPlayers();
	}
});

btnNew.addEventListener("click", () => {
	newGame();
});

btnToggleModal.addEventListener("click", (e) => {
	e.target.innerText === "Instructions" ?
		e.target.innerHTML = `<i class="fa-solid fa-caret-left"></i>Back to Game` :
		e.target.innerHTML = `<i class="fa-solid fa-circle-info"></i>Instructions`;
	modal.classList.toggle("hidden");
});