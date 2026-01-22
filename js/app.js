function createPlayer(name, char) {
  function getChar() {
    return char;
  }
  return { name, getChar };
}

const createBoard = () => {
  const player1 = createPlayer('Nate', 'X');
  const player2 = createPlayer('Amaya', 'O');
  let board = [];
  let turn = true;
  let container = document.querySelector('.main-container');

  const grid = () => {
    for (i = 0; i < 9; i++) {
      let div = document.createElement('div');
      div.classList.add('square');
      div.setAttribute('id', i);
      container.appendChild(div);

      board.push(div);

      div.addEventListener('click', () => {
        toggleTurn();
        updateGrid(div);
      });
    }
  };

  const updateGrid = (div) => {
    if (!div.textContent == '') {
      return;
    }
    divIndex = div.getAttribute('id');
    console.log(divIndex);
    board[divIndex] = player1.getChar();
    console.log(board);
    div.textContent = player1.getChar();
    // checkWinner(board);
  };

  const toggleTurn = () => {
    return;
  };

  return { grid };
};

const gameBoard = createBoard();
gameBoard.grid();
