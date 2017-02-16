function Game() {

  GAME = { //Public variables
    currentPlayer : null,
    fight : null,
    god : $({}),
    latestArmyQuery : null,
    queryArmies : null,
    map : $('.map'),
    moveArmies: null,
    orders : null,
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

  function startGame() {


    GAME.turn = 0;
    // promptForPlayers();
    players.push(Player('Durkee', 1, 'Baratheon'));
    players.push(Player('Javi', 2, 'Targaeryn'));

    addArmy(players[0], waypoints[0]);
    addArmy(players[1], waypoints[3]);

  }
  GAME.startGame = startGame;

  function addArmy(player, waypoint) {
    Army(player, waypoint);
    updateWorld();
  }

  function fight(battlefield) {
    let query = queryArmies();
    let armies = query[battlefield];

    commanders = [];
    armies.forEach((army) => {
      if (!commanders.includes(army.player)) { commanders.push(army.player); }
    });

    let victor = _.sample(commanders);
    console.log(victor.name + ' of House ' + victor.house + ' has won the Game of Thrones!');
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

  function moveArmies(originNum, targetNum) {
    player = players[0];
    origin = waypoints[originNum];
    let query = queryArmies(player, origin);
    query[waypoints[originNum].name].forEach((army) => { army.moveTo(waypoints[targetNum]); });
    updateWorld();
  }
  GAME.moveArmies = moveArmies;

  function updateWorld() { god.trigger('worldUpdate', queryArmies()); }
  GAME.updateWorld = updateWorld;

  return GAME;
}
