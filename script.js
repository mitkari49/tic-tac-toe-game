let currentPlayer = 1;
let player1, player2;
const board = ['', '', '', '', '', '', '', '', ''];
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

document.getElementById('submit').addEventListener('click', function() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (player1 && player2) {
        document.querySelector('.player-names').style.display = 'none';
        document.querySelector('.game').style.display = 'block';
        document.querySelector('.message').innerText = `${player1}, you're up!`;
    } else {
        alert("Please enter names for both players.");
    }
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        const index = this.id - 1;

        if (board[index] === '') {
            board[index] = currentPlayer === 1 ? 'X' : 'O';
            this.innerText = board[index];

            const winningIndex = checkWin();
            if (winningIndex) {
                drawWinningLine(winningIndex);
                document.querySelector('.message').innerText = `${currentPlayer === 1 ? player1 : player2}, congratulations you won!`;
                document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none'); // Disable further clicks
            } else if (board.every(cell => cell !== '')) {
                document.querySelector('.message').innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch players
                document.querySelector('.message').innerText = `${currentPlayer === 1 ? player1 : player2}, you're up!`;
            }
        }
    });
});

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return combination; // Return the winning combination
        }
    }
    return null; // No winner
}

function drawWinningLine(combination) {
    const canvas = document.getElementById('winnerLine');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous lines
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    const cellSize = 100; // Size of each cell
    const offset = 10; // Offset for the line

    // Determine the starting and ending coordinates for the line
    const startX = (combination[0] % 3) * cellSize + cellSize / 2; // Center of the first cell
    const startY = Math.floor(combination[0] / 3) * cellSize + cellSize / 2;
    const endX = (combination[2] % 3) * cellSize + cellSize / 2; // Center of the last cell
    const endY = Math.floor(combination[2] / 3) * cellSize + cellSize / 2;

    // Draw the winning line
    ctx.beginPath();
    ctx.moveTo(startX + offset, startY + offset);
    ctx.lineTo(endX + offset, endY + offset);
    ctx.stroke();
    canvas.style.display = 'block'; // Show the canvas with the winning line
}
