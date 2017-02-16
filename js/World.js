function World() {

  const god       = GAME.god;
  const map       = GAME.map;
  const waypoints = GAME.waypoints;

  // waypoints.push(Waypoint([250,400], $('#Tengoku'), 'Landmark', 'Tengoku'));
  // waypoints.push(Waypoint([400,325], $('#Eudaimonia'), 'Landmark', 'Eudaimonia'));
  // waypoints.push(Waypoint([400,175], $('#Circumstancia'), 'Landmark', 'Circumstancia'));
  // waypoints.push(Waypoint([250,100], $('#Oblivion'), 'Landmark', 'Oblivion'));
  // waypoints.push(Waypoint([100,175], $('#Samsara'), 'Landmark', 'Samsara'));
  // waypoints.push(Waypoint([100,325], $('#Nirvana'), 'Landmark', 'Nirvana'));

  addWaypoint(50, 50, 'Landmark', 'Tengoku');
  addWaypoint(80, 60, 'Landmark', 'Eudaimonia');
  addWaypoint(70, 35, 'Landmark', 'Circumstancia');
  addWaypoint(57, 20, 'Landmark', 'Oblivion');
  addWaypoint(20, 35, 'Landmark', 'Samsara');
  addWaypoint(21, 81, 'Landmark', 'Nirvana');

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
