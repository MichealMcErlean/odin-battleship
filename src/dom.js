import {Ship, GameBoard, Player} from './ship.js'

const computerBoard = document.querySelector('.computer-board');
const playerBoard = document.querySelector('.player-board');

const msg = document.querySelector('p .msg');
const numTheirs = document.querySelector('.num-theirs');
const numYours = document.querySelector('.num-yours');

export function buildComputerBoard(player) {
  computerBoard.textContent = '';
  for (let i = 0; i < player.board.size; i++ ) {
    let newRow = document.createElement('div');
    newRow.classList.add('comp-row-div');
    for (let j = 0; j < player.board.size; j++) {
      let newCol = document.createElement('div');
      newCol.classList.add('comp-col-div');
      let newBtn = document.createElement('button');
      newBtn.classList.add('comp-cell-btn');
      newBtn.textContent = '~';
      newBtn.dataset.cell = `[${i},${j}]`;
      newCol.appendChild(newBtn);
      newRow.appendChild(newCol);
    }
  computerBoard.appendChild(newRow);
  }
    
}

export function placeComputerShips(player) {
  let newShips = [
    new Ship(2, 0, false, [], 'Destroyer'),
    new Ship(3, 0, false, [], "Cruiser"),
    new Ship(3, 0, false, [], 'Submarine'),
    new Ship(4, 0, false, [], 'Battleship'),
    new Ship(5, 0, false, [], 'Carrier')
  ];
  newShips.forEach(ship => {
    let shipPlaced = false;
    while (shipPlaced == false) {
      let newLoc = player.board.generateRandomShipPlace(ship);
      shipPlaced = player.board.placeShip(ship, newLoc);
    }
  })
  numTheirs.textContent = 5;
}

export function placePlayerShips(player) {
  let newShips = [
    new Ship(2, 0, false, [], 'Destroyer'),
    new Ship(3, 0, false, [], "Cruiser"),
    new Ship(3, 0, false, [], 'Submarine'),
    new Ship(4, 0, false, [], 'Battleship'),
    new Ship(5, 0, false, [], 'Carrier')
  ];
  newShips.forEach(ship => {
    let shipPlaced = false;
    while (shipPlaced == false) {
      let newLoc = player.board.generateRandomShipPlace(ship);
      shipPlaced = player.board.placeShip(ship, newLoc);
    }
  })
  numYours.textContent = 5;
}