const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];



const init = () => {
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
  loadGameState();
}

const saveGameState = () => {
  localStorage.setItem('gameState', JSON.stringify(gameState));
  localStorage.setItem('currentPlayer', currentPlayer);
}

const removeGameState = () => {
  localStorage.removeItem('gameState');
  localStorage.removeItem('currentPlayer');
}


const loadGameState = () => {
  const savedGameState = JSON.parse(localStorage.getItem('gameState'));
  const savedCurrentPlayer = localStorage.getItem('currentPlayer');
  if (savedGameState) {
    gameState = savedGameState;
    currentPlayer = savedCurrentPlayer;
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameState[i];
    }
  }
}


const handleCellClick = (e) => {
  const clickedCellIndex = parseInt(e.target.id.split('-')[1]);
  if (gameState[clickedCellIndex] !== '') return;
  gameState[clickedCellIndex] = currentPlayer;
  e.target.innerText = currentPlayer;
  saveGameState()
  const winningCombination = checkForWin();
  if (winningCombination) {
    handleGameEnd(winningCombination);
  } else if (gameState.includes('') === false) {
    handleGameEnd(null);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

const checkForWin = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      return winningCombinations[i];
    }
  }
  return null;
}

const handleGameEnd = (winningCombination) => {
  if (winningCombination) {
    alert(`Игрок ${currentPlayer} выиграл!`);
    for (let i = 0; i < winningCombination.length; i++) {
      const cellIndex = winningCombination[i];
      document.getElementById(`cell-${cellIndex}`).style.backgroundColor =
        'green';
    }
    removeGameState();
    setTimeout(() => location.reload(), 500)
  } else {
    alert('Ничья!');
    removeGameState();
    setTimeout(() => location.reload(), 500)
  }
  cells.forEach((cell) => cell.removeEventListener('click', handleCellClick));
}

init();