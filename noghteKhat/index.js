const N = 4;
const M = 4;

let turn = "R";
let selectedLines = [];

const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };

const playersTurnText = (turn) =>
	`It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
	line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

const createGameGrid = () => {
	const gameGridContainer = document.getElementsByClassName(
		"game-grid-container"
	)[0];

	const rows = Array(N)
		.fill(0)
		.map((_, i) => i);
	const cols = Array(M)
		.fill(0)
		.map((_, i) => i);

	rows.forEach((row) => {
		cols.forEach((col) => {
			const dot = document.createElement("div");
			dot.setAttribute("class", "dot");

			const hLine = document.createElement("div");
			hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
			hLine.setAttribute("id", `h-${row}-${col}`);
			hLine.addEventListener("click", handleLineClick);

			gameGridContainer.appendChild(dot);
			if (col < M - 1) gameGridContainer.appendChild(hLine);
		});

		if (row < N - 1) {
			cols.forEach((col) => {
				const vLine = document.createElement("div");
				vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
				vLine.setAttribute("id", `v-${row}-${col}`);
				vLine.addEventListener("click", handleLineClick);

				const box = document.createElement("div");
				box.setAttribute("class", "box");
				box.setAttribute("id", `box-${row}-${col}`);

				gameGridContainer.appendChild(vLine);
				if (col < M - 1) gameGridContainer.appendChild(box);
			});
		}
	});

	document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const changeTurn = (nextTurn) => {
	const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

	lines.forEach((l) => {
		//if line was not already selected, change it's hover color according to the next turn
		if (!isLineSelected(l)) {
			l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
		}
	});
	// change game-status text for next player turn
	document.getElementById("game-status").innerHTML = playersTurnText(nextTurn);

	turn = nextTurn;
};

const handleLineClick = (e) => {
	const lineId = e.target.id;

	const selectedLine = document.getElementById(lineId);

	if (isLineSelected(selectedLine)) {
		//if line was already selected, return
		return;
	}

	selectedLines = [...selectedLines, lineId];

	colorLine(selectedLine);

	// check if any boxes complete when line clicked
	const { completeBoxes, nextTurn } = checkCompleteBox(lineId, turn);
	// and if so, fill the completed boxe(s) with appropriate color
	if (completeBoxes.length > 0) fillTheBox(completeBoxes, nextTurn);

	// check if game is over or not
	const isGameOver = checkGameOver();
	// and if so change the player turn
	if (!isGameOver) changeTurn(nextTurn);
};

const colorLine = (selectedLine) => {
	selectedLine.classList.remove(hoverClasses[turn]);
	selectedLine.classList.add(bgClasses[turn]);
};

const checkCompleteBox = (currentLineId, currentTurn) => {
	const [direction, row, col] = currentLineId.split("-");

	let completeBoxes = [];

	if (direction === "v") {
		completeBoxes.push(...completeBoxesOnVerticalLine(row, col));
	} else if (direction === "h") {
		completeBoxes.push(...completeBoxesOnHorizontalLine(row, col));
	} else {
		return;
	}

	const nextTurn =
		completeBoxes.length > 0 ? currentTurn : currentTurn === "R" ? "B" : "R";

	return {
		completeBoxes,
		nextTurn,
	};
};

const completeBoxesOnVerticalLine = (row, col) => {
	let completeBoxes = [];
	// check if left box of picked line gets complete
	if (
		selectedLines.includes(`v-${row}-${parseInt(col) + 1}`) &&
		selectedLines.includes(`h-${row}-${col}`) &&
		selectedLines.includes(`h-${parseInt(row) + 1}-${col}`)
	) {
		const boxRow = row;
		const boxCol = col;
		completeBoxes.push(`box-${boxRow}-${boxCol}`);
	}
	// check if right box of picked line gets complete
	if (
		selectedLines.includes(`v-${row}-${parseInt(col) - 1}`) &&
		selectedLines.includes(`h-${row}-${parseInt(col) - 1}`) &&
		selectedLines.includes(`h-${parseInt(row) + 1}-${parseInt(col) - 1}`)
	) {
		const boxRow = row;
		const boxCol = parseInt(col) - 1;
		completeBoxes.push(`box-${boxRow}-${boxCol}`);
	}
	return completeBoxes;
};

const completeBoxesOnHorizontalLine = (row, col) => {
	let completeBoxes = [];
	// check if top box of picked line gets complete
	if (
		selectedLines.includes(`h-${parseInt(row) + 1}-${col}`) &&
		selectedLines.includes(`v-${row}-${col}`) &&
		selectedLines.includes(`v-${row}-${parseInt(col) + 1}`)
	) {
		const boxRow = row;
		const boxCol = col;
		completeBoxes.push(`box-${boxRow}-${boxCol}`);
	}
	// check if bot box of picked line gets complete
	if (
		selectedLines.includes(`h-${parseInt(row) - 1}-${col}`) &&
		selectedLines.includes(`v-${parseInt(row) - 1}-${col}`) &&
		selectedLines.includes(`v-${parseInt(row) - 1}-${parseInt(col) + 1}`)
	) {
		const boxRow = parseInt(row) - 1;
		const boxCol = col;
		completeBoxes.push(`box-${boxRow}-${boxCol}`);
	}
	return completeBoxes;
};

const fillTheBox = (completeBoxes, currentTurn) => {
	completeBoxes.forEach((box) => {
		const filledBox = document.getElementById(box);
		filledBox.classList.add(`bg-${currentTurn === "R" ? "red" : "blue"}`);
	});
};

const checkGameOver = () => {
	// check if there is no more line to pick
	if (selectedLines.length === 24) {
		const blueBoxes = document.querySelectorAll(".box.bg-blue");
		const redBoxes = document.querySelectorAll(".box.bg-red");

		const winner = blueBoxes.length - redBoxes.length > 0 ? "Blue" : "Red";

		// change game status and announce the winner
		document.getElementById("game-status").innerHTML = `${winner} won`;

		return true;
	}
	return false;
};

// initilize game
createGameGrid();
