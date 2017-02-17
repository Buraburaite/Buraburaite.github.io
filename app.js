//Create Game object
let GAME = {};
Game();

function loadSounds () {
  ion.sound({
    sounds: [{name: "ambience", loop: true}],

    path: "./lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 0.1
  });
}

function changeInputBoxStyling() {
  let box = $('.input-box');
  let player = GAME.currentPlayer;
  let players = GAME.players;

  box.removeClass(player.house.toLowerCase());

  if (player === players[0]) {
    player = players[1];
    GAME.currentPlayer = player;
  }
  else {
    player = players[0];
    GAME.currentPlayer = player;

  }

  box.addClass(player.house.toLowerCase());
}

$(document).ready(() => {
  GAME.startGame();
  loadSounds();
  ion.sound.play('ambience');

  let ordersBox = $('.input-box');
  let ordersBtn = $('.input-btn');
  ordersBtn.on('click', () => {
    let success = GAME.placeOrders(ordersBox.html());
    ordersBox.empty();
    if (success) {
      changeInputBoxStyling();
    }
  });

  let ifEnterPlaceOrders = (e) => {
    if (e.which === 13) {
      let success = GAME.placeOrders(ordersBox.html());
      ordersBox.empty();
      if (success) {
        changeInputBoxStyling();
      }
    }
  };

  ordersBox.on('keydown', ifEnterPlaceOrders);


  changeInputBoxStyling();
});
