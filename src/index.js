import {
  displayFirstGameboard,
  displaySecondGameboard,
  displayTurn,
  displayWinner,
  updateBoard,
} from './gui';
import './style.css';

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
      for (let i = yCoord; i < yCoord + length; i += 1) {
        board[xCoord][i] = newShip;
      }
    } else {
      if (xCoord + length > 9) {
        throw new Error('Ship will fall off the board!');
      }
      for (let i = xCoord; i < xCoord + length; i += 1) {
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
  let gameEnded = false;
  const player2IsComputer = true;

  const arrayContainsCoordinates = (array, xCoord, yCoord) => {
    if (
      array.some((element) => element[0] === xCoord && element[1] === yCoord)
    ) {
      return true;
    }
    return false;
  };

  const checkIfAllSunk = (gameboard, winner) => {
    if (gameboard.isAllSunk()) {
      displayWinner(winner);
      gameEnded = true;
    }
  };

  const attack = (xCoord, yCoord) => {
    if (currentTurn === 'player1') {
      if (
        !arrayContainsCoordinates(Player2.missedShots, xCoord, yCoord) &&
        !arrayContainsCoordinates(Player2.hitShots, xCoord, yCoord) &&
        !gameEnded
      ) {
        Player2.receiveAttack(xCoord, yCoord);
        checkIfAllSunk(Player2, 'Player 1');
        currentTurn = 'player2';
        updateBoard(Player2, 'p2');
        displayTurn(currentTurn);

        if (player2IsComputer && !gameEnded) {
          computerPlay();
        }
      }
    } else if (
      !arrayContainsCoordinates(Player1.missedShots, xCoord, yCoord) &&
      !arrayContainsCoordinates(Player1.hitShots, xCoord, yCoord) &&
      !gameEnded
    ) {
      Player1.receiveAttack(xCoord, yCoord);
      checkIfAllSunk(Player1, 'Player 2');
      currentTurn = 'player1';
      updateBoard(Player1, 'p1');
      displayTurn(currentTurn);
    } else if (player2IsComputer && !gameEnded) {
      computerPlay();
    }
  };

  const computerPlay = () => {
    const randomXCoord = Math.floor(Math.random() * 10);
    const randomYCoord = Math.floor(Math.random() * 10);
    attack(randomXCoord, randomYCoord);
  };

  return { Player1, Player2, attack, player2IsComputer };
};

const game = Player();
game.Player1.placeShip(1, 1, 1, 'horizontal');
game.Player2.placeShip(2, 2, 2, 'vertical');

displayFirstGameboard(game);
displaySecondGameboard(game);
displayTurn('player1');

export { Ship, Gameboard, Player };
