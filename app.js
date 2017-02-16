//Create Game object
let GAME = {};
Game();

let counter = 0;

let testBtn = $('#test-btn');
testBtn.click(() => {
  counter++;
  if (counter === 1) {
    GAME.moveArmies(0,1);
  }
  else if (counter === 2) {
    GAME.moveArmies(3,2);
  }
  else if (counter === 3) {
    GAME.moveArmies(1,2);
  }
  else if (counter === 4) {
    GAME.fight();
  }
});


$(document).ready(() => {
  GAME.startGame();
});
