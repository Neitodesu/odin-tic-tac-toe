const container = document.querySelector('.main-container');
const resetBtn = document.querySelector('#resetBtn');
const startBtn = document.querySelector('#startBtn');
const playerOneInput = document.querySelector('#first');
const playerTwoInput = document.querySelector('#second');
const gameStatus = document.querySelector('.game-status');
let hasStarted = false;

function createPlayer(name, char) {
  const getChar = () => {
    return char;
  };
  const winner = () => {
    return `${name} Wins!`;
  };
  return { name, getChar, winner };
}

function gameController() {
  let player1;
  let player2;
  let board = [];
  let empty = 9;
  let turn = false;
  let gameOver = false;

  const createGrid = () => {
    for (i = 0; i < 9; i++) {
      let div = document.createElement('div');
      div.classList.add('square');
      div.setAttribute('id', i);
      container.appendChild(div);

      board.push(i);

      div.addEventListener('click', () => {
        if (gameOver || !hasStarted) {
          return;
        }
        updateGrid(div);
      });
    }
  };

  const enablePlayer = () => {
    player1 = createPlayer(playerOneInput.value, '❌');
    player2 = createPlayer(playerTwoInput.value, '🇴');
    hasStarted = true;
  };

  const updateUi = () => {
    if (!gameOver) {
      !turn
        ? (gameStatus.textContent = `${player1.name}, your turn!`)
        : (gameStatus.textContent = `${player2.name}, your turn!`);
    }

    if (gameOver && turn) {
      gameStatus.textContent = player1.winner();
      container.classList.add('floating');
    }

    if (gameOver && !turn) {
      gameStatus.textContent = player2.winner();
      container.classList.add('floating');
    }
    if (empty == 0 && !gameOver) {
      gameStatus.textContent = 'TIE GAME!';
    }
  };

  const toggleTurn = () => {
    if (turn == true) {
      turn = false;
      updateUi();
    } else {
      turn = true;
      updateUi();
    }
  };

  const updateBoardArray = (index, mark) => {
    board[index] = mark;
  };

  const updateGrid = (div) => {
    if (!div.textContent == '') {
      return;
    }
    const index = div.id;
    const mark = turn ? player2.getChar() : player1.getChar();

    updateBoardArray(index, mark);
    div.textContent = mark;

    toggleTurn();

    empty--;

    checkWinner();
  };

  const checkWinner = () => {
    const winStates = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
    ];

    if (winStates.some((num) => num.every((index) => board[index] === '❌'))) {
      gameOver = true;
      updateUi();
    }
    if (winStates.some((num) => num.every((index) => board[index] === '🇴'))) {
      gameOver = true;
      updateUi();
    }
    if (empty == 0) {
      updateUi();
    }
  };

  return { createGrid, updateUi, enablePlayer };
}

const resetInputs = () => {
  const inputs = document.querySelector('.inputs');
  const regex = /[0-9!@#$%^&*(){}<>\-|/?.,\\'';:""``~+_=]/g;
  if (playerOneInput.value == '' || playerTwoInput.value == '') {
    gameStatus.textContent = 'You must enter names to play';
    return;
  }
  if (playerOneInput.value.match(regex)) {
    gameStatus.textContent = `No numbers or special characters allowed`;
    return;
  }

  control.enablePlayer();
  control.updateUi();
  playerOneInput.value = '';
  playerTwoInput.value = '';
  inputs.classList.add('hidden');
};

const control = gameController();

control.createGrid();

startBtn.addEventListener('click', () => {
  if (hasStarted) {
    return;
  }
  resetInputs();
});

resetBtn.addEventListener('click', () => {
  window.location.reload();
});
