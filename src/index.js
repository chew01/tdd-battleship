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
      for (let i = yCoord; i <= yCoord + length; i += 1) {
        board[xCoord][i] = newShip;
      }
    } else {
      for (let i = xCoord; i <= xCoord + length; i += 1) {
        board[i][yCoord] = newShip;
      }
    }
  };

  const missedShots = [];

  const receiveAttack = (xCoord, yCoord) => {
    const gridHit = board[xCoord][yCoord];
    if (gridHit === undefined) {
      missedShots.push([xCoord, yCoord]);
    } else {
      gridHit.hit();
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

  return { board, placeShip, missedShots, receiveAttack, isAllSunk };
};

export { Ship, Gameboard };
