export class Ship {
  constructor(length = 2, hits = 0, sunk = false, loc = [], name = '') {
    this.length = length;
    this.hits = hits;
    this.sunk = false;
    this.loc = loc;
    this.name = name;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
      return true;
    }
    return false;
  }
}

export class GameBoard {
  constructor(size = 10) {
    this.size = size;
    this.board = this.#buildBoard(this.size);
    this.ships = [];
  }

  #buildBoard(size) {
    let board = new Array(size);
    board.fill(new Array(size).fill(0));
    return board;
  }

  placeShip(ship, coords) {
    ship.loc = coords;
    let valid = true;
    this.ships.forEach(realShip => {
      realShip.loc.forEach(coord => {
        ship.loc.forEach(xy => {
          if (this.#matchCoords(coord, xy)) {
            valid = false;
          }
        })
      })
    })
    if (valid) {
      this.ships.push(ship);
      return true;
    } else {
      return false;
    }    
  }

  #matchCoords(a, b) {
    return (a[0] == b[0] && a[1] == b[1])
  }

  receiveAttack(xy) {
    let isHit = false;
    this.ships.forEach(ship => {
      ship.loc.forEach(ab => {
        if (this.#matchCoords(xy, ab)) {
          
        }
      })
    })

    return isHit
  }
}