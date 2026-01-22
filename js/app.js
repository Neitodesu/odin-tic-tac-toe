const resetBtn = document.querySelector('#resetBtn');
const startBtn = document.querySelector('#startBtn');
const container = document.querySelector('.main-container');
const playerOneInput = document.querySelector('#name1');
const playerTwoInput = document.querySelector('#name2');

function createPlayer(name, char) {
  const getChar = () => {
    return char;
  };
  const winner = () => {
    return `${name} Wins!`;
  };
  return { name, getChar, winner };
}

const createBoard = () => {
  let player1;
  let player2;
  const status = document.querySelector('.game-status');
  let board = [];
  let isStarted = false;
  let turn = false;
  let gameOver = false;
  let num = 9;

  const grid = () => {
    status.textContent = `Enter names to play!`;
    for (i = 0; i < 9; i++) {
      let div = document.createElement('div');
      div.classList.add('square');
      div.setAttribute('id', i);
      container.appendChild(div);

      board.push(i);

      div.addEventListener('click', () => {
        if (gameOver || !isStarted) {
          return;
        }
        updateGrid(div);
      });
    }
  };

  const updateGrid = (div) => {
    if (!div.textContent == '') {
      return;
    }

    toggleTurn(turn);

    if (turn) {
      divIndex = div.getAttribute('id');
      board[divIndex] = player1.getChar();
      div.textContent = player1.getChar();
    }

    if (!turn) {
      divIndex = div.getAttribute('id');
      board[divIndex] = player2.getChar();
      div.textContent = player2.getChar();
    }

    num--;
    checkWinner();
  };

  const toggleTurn = () => {
    if (turn == true) {
      turn = false;
      status.textContent = `${player1.name}, your turn!`;
    } else {
      turn = true;
      status.textContent = `${player2.name}, your turn!`;
    }
  };

  const checkWinner = () => {
    if (board[0] == board[1] && board[0] == board[2]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[0] == board[3] && board[0] == board[6]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[0] == board[4] && board[0] == board[8]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[3] == board[4] && board[3] == board[5]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[6] == board[7] && board[6] == board[8]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[1] == board[4] && board[1] == board[7]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[2] == board[5] && board[2] == board[8]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (board[2] == board[4] && board[2] == board[6]) {
      if (turn == true) {
        status.textContent = player1.winner();
      } else {
        status.textContent = player2.winner();
      }
      gameOver = true;
    }
    if (num == 0) {
      gameOver = true;
      status.textContent = 'TIE GAME! Hit reset for new game';
    }
  };

  const validatePlayers = () => {
    //FIX: able to add more names while game is playing
    if (playerOneInput.value == '' || playerTwoInput.value == '') {
      return;
    }
    player1 = createPlayer(playerOneInput.value, 'X');
    player2 = createPlayer(playerTwoInput.value, 'O');

    playerOneInput.value = '';
    playerTwoInput.value = '';
    isStarted = true;
    status.textContent = `${player1.name}, your turn!`;
  };

  const startGame = () => {
    validatePlayers();
  };

  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startGame();
  });

  resetBtn.addEventListener('click', () => {
    window.location.reload();
  });

  return { grid };
};

const gameBoard = createBoard();
gameBoard.grid();
