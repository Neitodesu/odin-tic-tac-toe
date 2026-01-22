const resetBtn = document.querySelector('#resetBtn');
const container = document.querySelector('.main-container');

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
  const player1 = createPlayer('Nate', 'X');
  const player2 = createPlayer('Amaya', 'O');
  const status = document.querySelector('.game-status');
  let board = [];
  let turn = false;
  let gameOver = false;
  let num = 9;

  const grid = () => {
    status.textContent = `${player1.name}, your turn!`;
    for (i = 0; i < 9; i++) {
      let div = document.createElement('div');
      div.classList.add('square');
      div.setAttribute('id', i);
      container.appendChild(div);

      board.push(i);

      div.addEventListener('click', () => {
        if (gameOver) {
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

  resetBtn.addEventListener('click', () => {
    window.location.reload();
  });

  return { grid };
};

const gameBoard = createBoard();
gameBoard.grid();
