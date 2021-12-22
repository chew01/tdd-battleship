const Ship = (length) => {
  const hitArray = [];
  const hit = (number) => {
    if (!hitArray.includes(number)) {
      hitArray.push(number);
    }
  };
  const isSunk = () => {
    if (hitArray.length === length) {
      return true;
    }
    return false;
  };

  return { length, hit, isSunk };
};

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    board.push([]);
  }

  const placeShip = (xCoord, yCoord, length, orientation) => {
    const newShip = Ship(length);
    if (orientation === 'vertical') {
      if (yCoord + length > 9) {
        throw new Error('Ship will fall off the board!');
      }
      for (let i = yCoord; i <= yCoord + length; i += 1) {
        board[xCoord][i] = newShip;
      }
    } else {
      if (xCoord + length > 9) {
        throw new Error('Ship will fall off the board!');
      }
      for (let i = xCoord; i <= xCoord + length; i += 1) {
        board[i][yCoord] = newShip;
      }
    }
  };

  const missedShots = [];
  const hitShots = [];

  const receiveAttack = (xCoord, yCoord) => {
    const gridHit = board[xCoord][yCoord];
    if (gridHit === undefined) {
      missedShots.push([xCoord, yCoord]);
    } else {
      gridHit.hit(xCoord + yCoord);
      hitShots.push([xCoord, yCoord]);
    }
  };

  const isAllSunk = () => {
    let check = false;
    for (let i = 0; i < 10; i += 1) {
      for (let n = 0; n < 10; n += 1) {
        const ship = board[i][n];
        if (ship !== undefined && ship.isSunk()) {
          check = true;
        }
      }
    }

    return check;
  };

  return { board, placeShip, missedShots, hitShots, receiveAttack, isAllSunk };
};

const Player = () => {
  const Player1 = Gameboard();
  const Player2 = Gameboard();

  let currentTurn = 'player1';

  const attack = (xCoord, yCoord) => {
    if (currentTurn === 'player1') {
      if (
        !Player2.missedShots.includes([xCoord, yCoord]) &&
        !Player2.hitShots.includes([xCoord, yCoord])
      ) {
        Player2.receiveAttack(xCoord, yCoord);
        currentTurn = 'player2';
        computerPlay();
      }
    } else if (
      !Player1.missedShots.includes([xCoord, yCoord]) &&
      !Player1.hitShots.includes([xCoord, yCoord])
    ) {
      Player1.receiveAttack(xCoord, yCoord);
      currentTurn = 'player1';
    } else {
      computerPlay();
    }
  };

  const computerPlay = () => {
    const randomXCoord = Math.floor(Math.random() * 10);
    const randomYCoord = Math.floor(Math.random() * 10);
    attack(randomXCoord, randomYCoord);
  };

  return { Player1, Player2, currentTurn, attack, computerPlay };
};

export { Ship, Gameboard, Player };
