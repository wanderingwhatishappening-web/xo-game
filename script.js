const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const resetButton = document.getElementById("resetButton");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameOver = false;

const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];

function checkWinner() {

    for (let combination of winningCombinations) {

        const a = combination[0];
        const b = combination[1];
        const c = combination[2];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return board[a];

        }

    }

    return null;
}

function checkDraw() {

    return board.every(cell => cell !== "");

}

function handleClick(event) {

    const index = event.target.dataset.index;

    if (board[index] !== "" || gameOver) {
        return;
    }

    board[index] = currentPlayer;

    event.target.textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {

        status.textContent =
            `Player ${winner} wins!`;

        gameOver = true;

        return;
    }

    if (checkDraw()) {

        status.textContent = "It's a draw!";

        gameOver = true;

        return;
    }

    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }

    status.textContent =
        `Player ${currentPlayer}'s turn`;

}

function resetGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameOver = false;

    status.textContent = "Player X's turn";

    cells.forEach(cell => {

        cell.textContent = "";

    });

}

cells.forEach(cell => {

    cell.addEventListener("click", handleClick);

});

resetButton.addEventListener("click", resetGame);