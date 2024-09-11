const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const resetButton = document.getElementById('reset');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null);

const checkWinner = () => {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }

    return boardState.includes(null) ? null : 'Tie';
};

const handleClick = (e) => {
    const index = e.target.dataset.index;

    if (boardState[index] || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        displayResult(winner);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const displayResult = (result) => {
    resultScreen.style.display = 'block';
    if (result === 'Tie') {
        resultMessage.textContent = 'It\'s a tie!';
    } else {
        resultMessage.textContent = `${result} wins!`;
    }
    gameActive = false;
};

const resetGame = () => {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    resultScreen.style.display = 'none';
    gameActive = true;
    currentPlayer = 'X';
};

const startNewGame = () => {
    resetGame();
    resultScreen.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', startNewGame);
