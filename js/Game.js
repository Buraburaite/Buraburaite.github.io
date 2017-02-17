function Game() {

  GAME = { //Public variables
    placeArmies : null,
    currentPlayer : null,
    fight : null,
    god : $({}),
    latestArmyQuery : null,
    queryArmies : null,
    map : $('.map-container'),
    marchArmies: null,
    orders : null,
    placeOrders: placeOrders,
    players : [],
    turn : null,
    updateWorld : null,
    waypoints : []
  };

  /*====
  It is only okay to create shortened references
  for these four parts of GAME, anywhere in the program
  (world is not part of GAME)
  ====*/
  const god = GAME.god;
  const map = GAME.map;
  const players = GAME.players;
  const world = World();
  const waypoints = GAME.waypoints;

  function placeOrders(orders) {

    let sections = orders.split(',');
    sections = sections.map((sec) => sec.trim() );

    let origin, destination, battlefield, success = false;

    //Placement
    if (sections[0] === 'Place') {
      if (sections[1]) {
        destination = waypoints.find((wp) => wp.name === sections[1]);
        if (destination) {
          success = true;
          placeArmies(GAME.currentPlayer.name, destination.name);
        }
      }
    }
    //Marching
    if (sections[0] === 'March') {
      if (sections[1] && sections[2]) {
        origin      = waypoints.find((wp) => wp.name === sections[1]);
        destination = waypoints.find((wp) => wp.name === sections[2]);
        if (origin && destination) {
          success = true;
          marchArmies(origin.name, destination.name);
        }
      }
    }
    //Fight
    if (sections[0] === 'Fight') {
      if (sections[1]) {
        battlefield = waypoints.find((wp) => wp.name === sections[1]);
        if (battlefield) {
          success = true;
          fight(battlefield.name);
        }
      }
    }

    // let player      = players.find(  (p)  => p.name  === playerName);
    // let destination = waypoints.find((wp) => wp.name === destinationName);
    console.log(sections);

    return success;
  }

  function startGame() {


    GAME.turn = 0;
    // promptForPlayers();
    players.push(Player('Durkee', 1, 'Baratheon'));
    players.push(Player('Javi', 2, 'Targaryen'));
    GAME.currentPlayer = players[1];

    placeArmies('Durkee', 'King\'s Landing');
    placeArmies('Javi', 'Valyria');

  }
  GAME.startGame = startGame;

  function placeArmies(playerName, destinationName, num = 1) {
    let player      = players.find(  (p)  => p.name  === playerName);
    let destination = waypoints.find((wp) => wp.name === destinationName);
    _.times(num, Army(player, destination));
    updateWorld();
  }
  GAME.placeArmies = placeArmies;

  function fight(battlefieldName) {
    let query = queryArmies();
    let armies = query[battlefieldName];

    commanders = [];
    armies.forEach((army) => {
      if (!commanders.includes(army.player)) { commanders.push(army.player); }
    });

    let victor = _.sample(commanders);

    //Specify winner in message
    $('#bottom-win-msg')
    .html('House ' + victor.house + '!');
    $('.win-banner')
    .attr('src', 'Assets/Factions/House ' + victor.house + '.png');

    //Animate the banner
    let winBanner = $('.win-div');

    winBanner
    .css('display', 'block')
    .css('opacity', '0');

    let counter = 0;
    let accel   = 0;
    let increaseOpacity = () => {
      if (counter < 1) {
        accel   += 0.01;
        if (accel > 0.8) {
          accel = 0.8;
        }
        counter += accel;
        winBanner.css('opacity', counter.toString());
      }
      else {
        clearInterval(interval);
      }
    };
    let interval = setInterval(increaseOpacity, 100);
  }
  GAME.fight = fight;

  function queryArmies() {
    let query = {};
    players.forEach((p)  => {
      waypoints.forEach((wp) => {
        query[p.name]  = [];
        query[wp.name] = [];
        query[p.name + ':' + wp.name] = [];
        query[wp.name + ':' + p.name] = [];
      });
    });
    god.trigger('queryArmies', query);
    GAME.latestArmyQuery = query;

    return query;
  }
  GAME.queryArmies = queryArmies;

  function marchArmies(originName, destinationName) {
    let player = players[0];
    let origin = waypoints.find((wp) => wp.name === originName);
    let destination = waypoints.find((wp) => wp.name === destinationName);

    let query = queryArmies(player, origin);
    query[origin.name].forEach((army) => {
      army.moveTo(destination);
    });
    updateWorld();
  }
  GAME.marchArmies = marchArmies;

  function updateWorld() { god.trigger('worldUpdate', queryArmies()); }
  GAME.updateWorld = updateWorld;

  return GAME;
}
