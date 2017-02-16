function Orders() {

  let orders = {};
  GAME.players.forEach((player) => {
    orders[player.name] = {};

    GAME.waypoints.forEach((waypoint) => {
      orders[player.name][waypoint.name] = null;

    });
  });


  return orders;
}
