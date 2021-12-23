let lastCoordinateID = '';
const onDragStart = (event) => {
  event.dataTransfer.setData('text', event.target.id);
};

const onDragOver = (event) => {
  event.preventDefault();
};

const onDrop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  event.target.appendChild(document.getElementById(data));
  lastCoordinateID = event.target.id;
};

const createShip = (type) => {
  const rotate = (event) => {
    event.preventDefault();
    if (event.target.dataset.orientation === 'horizontal') {
      event.target.dataset.orientation = 'vertical';
    } else {
      event.target.dataset.orientation = 'horizontal';
    }
  };

  if (type === 'battleship') {
    const battleship = document.createElement('div');
    battleship.id = 'battleship';
    battleship.setAttribute('draggable', 'true');
    battleship.setAttribute('data-length', '4');
    battleship.setAttribute('data-orientation', 'horizontal');
    battleship.addEventListener('dragstart', onDragStart);
    battleship.addEventListener('dragend', () => {
      battleship.setAttribute('data-coordinate', lastCoordinateID);
    });
    battleship.addEventListener('contextmenu', rotate);

    return battleship;
  }
  if (type === 'carrier') {
    const carrier = document.createElement('div');
    carrier.id = 'carrier';
    carrier.setAttribute('draggable', 'true');
    carrier.setAttribute('data-length', '5');
    carrier.setAttribute('data-orientation', 'horizontal');
    carrier.addEventListener('dragstart', onDragStart);
    carrier.addEventListener('dragend', () => {
      carrier.setAttribute('data-coordinate', lastCoordinateID);
    });
    carrier.addEventListener('contextmenu', rotate);

    return carrier;
  }
  if (type === 'destroyer') {
    const destroyer = document.createElement('div');
    destroyer.id = 'destroyer';
    destroyer.setAttribute('draggable', 'true');
    destroyer.setAttribute('data-length', '3');
    destroyer.setAttribute('data-orientation', 'horizontal');
    destroyer.addEventListener('dragstart', onDragStart);
    destroyer.addEventListener('dragend', () => {
      destroyer.setAttribute('data-coordinate', lastCoordinateID);
    });
    destroyer.addEventListener('contextmenu', rotate);

    return destroyer;
  }
  if (type === 'submarine') {
    const submarine = document.createElement('div');
    submarine.id = 'submarine';
    submarine.setAttribute('draggable', 'true');
    submarine.setAttribute('data-length', '3');
    submarine.setAttribute('data-orientation', 'horizontal');
    submarine.addEventListener('dragstart', onDragStart);
    submarine.addEventListener('dragend', () => {
      submarine.setAttribute('data-coordinate', lastCoordinateID);
    });
    submarine.addEventListener('contextmenu', rotate);

    return submarine;
  }
  if (type === 'patrol') {
    const patrol = document.createElement('div');
    patrol.id = 'patrol';
    patrol.setAttribute('draggable', 'true');
    patrol.setAttribute('data-length', '2');
    patrol.setAttribute('data-orientation', 'horizontal');
    patrol.addEventListener('dragstart', onDragStart);
    patrol.addEventListener('dragend', () => {
      patrol.setAttribute('data-coordinate', lastCoordinateID);
    });
    patrol.addEventListener('contextmenu', rotate);

    return patrol;
  }
};

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

  const boardDescription = document.createElement('span');
  boardDescription.classList.add('description');
  boardDescription.textContent = 'Player 1';
  player1.appendChild(boardDescription);
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

  const boardDescription = document.createElement('span');
  boardDescription.classList.add('description');
  boardDescription.textContent = 'Player 2';
  player2.appendChild(boardDescription);
};

const displayFirstPlanboard = (game) => {
  const player1 = document.querySelector('#player1');
  for (let i = 0; i < 10; i += 1) {
    for (let n = 0; n < 10; n += 1) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.id = `p1_${i}_${n}`;
      grid.addEventListener('dragover', onDragOver);
      grid.addEventListener('drop', onDrop);
      player1.appendChild(grid);
    }
  }

  const boardDescription = document.createElement('span');
  boardDescription.classList.add('description');
  boardDescription.textContent = 'Player 1';
  player1.appendChild(boardDescription);

  const battleship = createShip('battleship');
  player1.appendChild(battleship);
  const carrier = createShip('carrier');
  player1.appendChild(carrier);
  const destroyer = createShip('destroyer');
  player1.appendChild(destroyer);
  const submarine = createShip('submarine');
  player1.appendChild(submarine);
  const patrol = createShip('patrol');
  player1.appendChild(patrol);
};

const displaySecondPlanboard = (game) => {
  const player2 = document.querySelector('#player2');
  for (let i = 0; i < 10; i += 1) {
    for (let n = 0; n < 10; n += 1) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.id = `p2_${i}_${n}`;
      player2.appendChild(grid);
    }
  }

  const boardDescription = document.createElement('span');
  boardDescription.classList.add('description');
  boardDescription.textContent = 'Player 2';
  player2.appendChild(boardDescription);
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

const displaySubmitPlanButton = () => {
  const commands = document.querySelector('#commands');

  const submitPlanButton = document.createElement('button');
  submitPlanButton.textContent = 'Submit Plan';
  commands.appendChild(submitPlanButton);
};

export {
  displayFirstGameboard,
  displaySecondGameboard,
  displayFirstPlanboard,
  displaySecondPlanboard,
  updateBoard,
  displayTurn,
  displayWinner,
  displaySubmitPlanButton,
};
