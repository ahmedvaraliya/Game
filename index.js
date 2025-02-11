let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

const cells = document.querySelectorAll('.cell');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const restartBtn = document.getElementById('restartBtn');

function createSnowflakes() {
    const snowflakeCount = 200;
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snow');

        const randomX = Math.random();
        const randomDelay = Math.random() * 3 + 's';
        snowflake.style.setProperty('--random-x', randomX);
        snowflake.style.setProperty('--random-delay', randomDelay);

        document.body.appendChild(snowflake);
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return null;
}

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];

        if (gameBoard[index] === 'X') {
            cell.classList.add('X');
            cell.classList.remove('O');
        } else if (gameBoard[index] === 'O') {
            cell.classList.add('O');
            cell.classList.remove('X');
        } else {
            cell.classList.remove('X', 'O');
        }
    });

    const winner = checkWinner();
    if (winner) {
        if (winner === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
            scoreO--;  
            scoreOElement.textContent = scoreO;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
            scoreX--; 
            scoreXElement.textContent = scoreX;
        }
        setTimeout(() => alert(`${winner} wins!`), 100);
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        updateBoard();
    } else if (!gameBoard.includes('')) {
        setTimeout(() => alert("It's a draw!"), 100);
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        updateBoard();
    }
}

function handleCellClick(index) {
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateBoard();
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

restartBtn.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    updateBoard();
});

createSnowflakes();

