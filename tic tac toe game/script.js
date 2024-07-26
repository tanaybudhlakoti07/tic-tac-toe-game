const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const modeSelect = document.getElementById('mode');
let currentPlayer = 'X';
let gameMode = '2P';
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const cellIndex = clickedCell.getAttribute('data-index');

  if (clickedCell.textContent !== '' || !gameActive) {
    return;
  }

  clickedCell.textContent = currentPlayer;
  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    alert('Draw!');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameMode === 'AI' && currentPlayer === 'O') {
    setTimeout(makeAiMove, 500);
  }
};

const checkWin = () => {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
};

const isBoardFull = () => {
  return [...cells].every(cell => cell.textContent !== '');
};

const makeAiMove = () => {
  let availableCells = [...cells].filter(cell => cell.textContent === '');
  let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
  randomCell.textContent = 'O';

  if (checkWin()) {
    alert(`O wins!`);
    gameActive = false;
    return;
  }

  if (isBoardFull()) {
    alert('Draw!');
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
};

const restartGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameActive = true;
};

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

modeSelect.addEventListener('change', (e) => {
  gameMode = e.target.value;
  restartGame();
});
