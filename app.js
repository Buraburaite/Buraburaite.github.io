//Create Game object
let GAME = {};
Game();

function loadSounds () {
  ion.sound({
    sounds: [{name: "ambience"}, {name: 'tap'}],

    path: "./lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 0.1
  });
}


$(document).ready(() => {
  GAME.startGame();
  loadSounds();
  ion.sound.play('ambience');
});
