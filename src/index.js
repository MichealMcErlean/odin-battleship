import "./styles.css"
import { greeting } from "./greeting.js";
import {Ship, GameBoard, Player} from './ship.js'
import * as DM from './dom.js';
console.log(greeting);



function screenManager() {

  let human;
  let computer;

  const resetButton = document.querySelector('.btn-restart');
  const regenButton = document.querySelector('.btn-regen');

  regenButton.disabled = true;

  function startGame() {
    human = new Player('human');
    computer = new Player('computer');
    DM.buildComputerBoard(computer);
    DM.placeComputerShips(computer);
    DM.placePlayerShips(human);

  }

  resetButton.addEventListener('click', () => {
    startGame();
  })
}

screenManager();