import {Ship, GameBoard, Player} from './ship.js'

const computerBoard = document.querySelector('.computer-board');
const playerBoard = document.querySelector('.player-board');

const msg = document.querySelector('p.msg');
const numTheirs = document.querySelector('.num-theirs');
const numYours = document.querySelector('.num-yours');
const regenButton = document.querySelector('.btn-regen');
const body = document.querySelector('body');

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
      newBtn.dataset.cell = [i, j];
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

export function buildPlayerBoard(player) {
  playerBoard.textContent = '';
  for (let i = 0; i < player.board.size; i++ ) {
    let newRow = document.createElement('div');
    newRow.classList.add('hum-row-div');
    for (let j = 0; j < player.board.size; j++) {
      let newCol = document.createElement('div');
      newCol.classList.add('hum-col-div');
      newCol.textContent = '~';
      newRow.appendChild(newCol);
    }
    playerBoard.appendChild(newRow);
  }
  
  
  const ships = player.board.ships;

  ships.forEach(ship => {
    ship.loc.forEach(xy => {
      let cell = findCellFromXY(xy, player);
      cell.textContent = 'O';
      cell.style.color = 'lawngreen';
    })
  })
}

export function printMsg(str) {
  msg.textContent = str;
}

export function findCellFromXY(xy, player) {

  let rows;

  if (player.type == 'human') {
    rows = playerBoard.children;
  } else {
    rows = computerBoard.children;
  }

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].children;
    for (let j = 0; j < cells.length; j++) {
      if (xy[0] == i && xy[1] == j) {
        if (player.type == 'human') {
          return cells[j];
        } else {
          return cells[j].firstElementChild;
        }
      }
    }
  }
  return null;
}

export function attachAttackListeners(computer, human) {
  for (let i = 0; i < computer.board.size; i++) {
    for (let j = 0; j < computer.board.size; j++){
      let xy = [i,j];
      let cell = findCellFromXY(xy, computer);
      cell.addEventListener('click', () => {
        regenButton.disabled = true;
        msg.textContent = '';
        let xy = cell.dataset.cell.split(',');
        makeAttack(xy, cell, computer);
        if ((computer.board.shipsLeft() == false)) {
          alert("You've won! Click 'Restart Game' to play again!")
        }
        body.style.pointerEvents = 'none';
        setTimeout(() => {
          body.style.pointerEvents = 'auto';
        }, 1000);
        makeComputerAttack(human);
        if (human.board.shipsLeft() == false) {
          alert("You've lost! Hit 'Restart Game' to play again!")
        }
      })
    }
  }
}

export function makeAttack(xy, cell, player) {
  if (cell.disabled == true || !(player.board.validShot(xy))) {
    printMsg('Invalid shot - already fired there!');
  } else {
    let whatDidWeHit = player.board.receiveAttack(xy);
    if (whatDidWeHit != false) {
      cell.textContent = 'X';
      cell.style.color = 'red';
      cell.disabled = true;
      if (whatDidWeHit.isSunk()) {
        printMsg(`Sunk a ${whatDidWeHit.name}!`);
        if (player.type == 'human') {
          numYours.textContent = +(numYours.textContent) -1;
        } else {
          numTheirs.textContent = +(numTheirs.textContent) - 1;
        }
      } else {
        printMsg(`Hit a ${whatDidWeHit.name}!`);
      }
    } else {
      cell.textContent = '*';
      cell.style.color = 'lightgrey';
      cell.disabled = true;
      printMsg('You missed!')
    }

  }
}

export function makeComputerAttack(human) {
  let shot;
  let legalShot = false;
  while (!legalShot) {
    shot = [];
    let x = Math.floor(Math.random() * human.board.size);
    let y = Math.floor(Math.random() * human.board.size);
    shot.push(x);
    shot.push(y);
    legalShot = human.board.validShot(shot);
  }
  let cell = findCellFromXY(shot, human);
  let whatGotHit = human.board.receiveAttack(shot)
  if (whatGotHit != false) {
    cell.textContent = 'X';
    cell.style.color = 'red';
    if (whatGotHit.isSunk()) {
      printMsg(`Computer sunk a ${whatGotHit.name}!`)
      numYours.textContent = +(numYours.textContent) -1;
    } else {
      printMsg(`Computer hit a ${whatGotHit.name}!`)
    }
  } else {
    cell.textContent = '*';
      cell.style.color = 'lightgrey';
      printMsg('Computer missed!')
  }
}

