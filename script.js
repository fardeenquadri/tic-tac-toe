// Tic-Tac-Toe (Two-player)
// Requirements covered: turns, win/tie check, status display, prevent moves after end, reset.

const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const cells = Array.from(document.querySelectorAll(".cell"));

let board = Array(9).fill(null); // "X" | "O" | null
let currentPlayer = "X";
let gameOver = false;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function setStatus(message) {
  statusEl.textContent = message;
}

function getWinnerInfo() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

function isTie() {
  return board.every((v) => v !== null);
}

function endGame(message, winningLine = null) {
  gameOver = true;
  setStatus(message);

  // Disable all cells to prevent further moves after game ends
  cells.forEach((cell) => (cell.disabled = true));

  // Highlight winning cells
  if (winningLine) {
    winningLine.forEach((idx) => cells[idx].classList.add("win"));
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setStatus(`Player ${currentPlayer}'s turn`);
}

function handleCellClick(e) {
  const cell = e.currentTarget;
  const index = Number(cell.dataset.index);

  if (gameOver) return;
  if (board[index] !== null) return; // only allow empty cells

  // Place move
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.disabled = true;

  // Check winner
  const winnerInfo = getWinnerInfo();
  if (winnerInfo) {
    endGame(`Player ${winnerInfo.winner} wins!`, winnerInfo.line);
    return;
  }

  // Check tie
  if (isTie()) {
    endGame("It's a tie!");
    return;
  }

  switchPlayer();
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("win");
  });

  setStatus("Player X's turn");
}

// Wire up events
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);

// Initial status
setStatus("Player X's turn");
