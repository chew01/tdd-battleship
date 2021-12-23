const displayFirstGameboard = (game) => {
  const player1 = document.querySelector('#player1');
  for (let i = 0; i < 10; i += 1) {
    for (let n = 0; n < 10; n += 1) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.id = `p1_${i}_${n}`;
      if (!game.player2IsComputer) {
        grid.addEventListener('click', () => {
          game.attack(i, n);
        });
      }
      player1.appendChild(grid);
    }
  }
};

const displaySecondGameboard = (game) => {
  const player2 = document.querySelector('#player2');
  for (let i = 0; i < 10; i += 1) {
    for (let n = 0; n < 10; n += 1) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.id = `p2_${i}_${n}`;
      grid.addEventListener('click', () => {
        game.attack(i, n);
      });
      player2.appendChild(grid);
    }
  }
};

const updateBoard = (gameboard, player) => {
  const { hitShots } = gameboard;
  const { missedShots } = gameboard;

  hitShots.forEach((pair) => {
    const xCoord = pair[0];
    const yCoord = pair[1];
    const grid = document.querySelector(`#${player}_${xCoord}_${yCoord}`);

    grid.setAttribute('style', 'background-color:pink');
  });

  missedShots.forEach((pair) => {
    const xCoord = pair[0];
    const yCoord = pair[1];
    const grid = document.querySelector(`#${player}_${xCoord}_${yCoord}`);

    grid.setAttribute('style', 'background-color:gray');
  });
};

const displayTurn = (currentTurn) => {
  const turn = document.querySelector('#turn');

  if (currentTurn === 'player1') {
    turn.textContent = 'Current turn: Player 1';
  } else {
    turn.textContent = 'Current turn: Player 2';
  }
};

const displayWinner = (winner) => {
  const win = document.querySelector('#winner');

  win.textContent = `${winner} wins!`;
};

export {
  displayFirstGameboard,
  displaySecondGameboard,
  updateBoard,
  displayTurn,
  displayWinner,
};
