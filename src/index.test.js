import { Ship, Gameboard, Player } from './index';

test('ship factory creates an object with length property', () => {
  const testShip = Ship(4);
  expect(testShip.length).toBe(4);
});

test('ship factory creates an object with hit function and sunk function', () => {
  const testShip = Ship(4);
  expect(typeof testShip.hit).toBe('function');

  testShip.hit(1);
  testShip.hit(2);
  testShip.hit(3);
  expect(testShip.isSunk()).toBe(false);

  testShip.hit(4);
  expect(testShip.isSunk()).toBe(true);
});

test('receiveAttack function sends hit function upon successful hit', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(2, 2, 2, 'horizontal');

  const testShip = gameboard.board[3][2];
  testShip.hit = jest.fn();
  gameboard.receiveAttack(2, 2);
  expect(testShip.hit).toHaveBeenCalled();
});

test('receiveAttack function updates missedShots upon failed hit', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(1, 2, 1, 'horizontal');

  gameboard.receiveAttack(3, 2);
  expect(gameboard.missedShots).toContainEqual([3, 2]);
});

test('isAllSunk function returns true when all ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(3, 3, 1, 'horizontal');
  gameboard.placeShip(4, 2, 2, 'vertical');

  gameboard.receiveAttack(3, 3);
  gameboard.receiveAttack(4, 2);
  gameboard.receiveAttack(4, 3);
  expect(gameboard.isAllSunk()).toBe(true);
});

test('isAllSunk function returns false when no ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(5, 3, 1, 'horizontal');
  gameboard.placeShip(4, 5, 2, 'vertical');

  expect(gameboard.isAllSunk()).toBe(false);
});

test('isAllSunk function returns false when only some ships are sunk', () => {
  const gameboard = Gameboard();
  gameboard.placeShip(5, 3, 1, 'horizontal');
  gameboard.placeShip(4, 5, 2, 'vertical');
  gameboard.placeShip(1, 4, 1, 'vertical');

  expect(gameboard.isAllSunk()).toBe(false);
});

test('when player 1 calls attack function, player 2 receives attack', () => {
  const players = Player();

  players.Player2.receiveAttack = jest.fn();
  players.attack(2, 3); // attack from player 1
  expect(players.Player2.receiveAttack).toHaveBeenCalledWith(2, 3);
});

test('computer auto-attacks after player 1 plays', () => {
  const players = Player();

  players.Player1.receiveAttack = jest.fn();
  players.attack(2, 3); // switches to player 2

  expect(players.Player1.receiveAttack).toHaveBeenCalled();
});
