function World() {

  const god       = GAME.god;
  const map       = GAME.map;
  const waypoints = GAME.waypoints;

  addWaypoint(38, 41, 'Landmark', 'Pentos');
  addWaypoint(37, 58, 'Landmark', 'Braavos');
  addWaypoint(43, 46, 'Landmark', 'Norvos');
  addWaypoint(48, 40, 'Landmark', 'Qohor');
  addWaypoint(41, 29, 'Landmark', 'Myr');
  addWaypoint(36, 28, 'Landmark', 'Tyrosh');
  addWaypoint(37, 15, 'Landmark', 'Lys');
  addWaypoint(49, 18, 'Landmark', 'Volantis');
  addWaypoint(85, 45, 'Landmark', 'Vaes Dothrak');
  addWaypoint(88, 10, 'Landmark', 'Qarth');
  addWaypoint(72, 27, 'Landmark', 'Mereen');
  addWaypoint(57, 4,  'Landmark', 'Valyria');
  addWaypoint(25, 43, 'Landmark', 'King\'s Landing');
  addWaypoint(12, 44, 'Landmark', 'Lannisport');
  addWaypoint(29, 19, 'Landmark', 'Sunspear');
  addWaypoint(19, 77, 'Landmark', 'Winterfell');

  function addWaypoint(xPercentage, yPercentage, type, name) {
    waypoints.push(Waypoint([xPercentage,yPercentage], type, name));
  }

  function updateWorld() {
    let query = {};
    god.trigger('queryArmies', query);
    waypoints.forEach((wp) => { waypoint.armyCount = query[wp.name]; });
  }


  return {};
}
