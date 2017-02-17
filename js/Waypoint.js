function Waypoint(percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let banner = 'neutral';
  // let armies; eventually, we want a variable like to auto-refresh

  let armyCount = 0;
  const god = GAME.god;
  const mapEl = GAME.map;
  const players = GAME.players;

  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass(banner)
  .attr('id', name)
  .html(armyCount)
  .css('left',   percentPosition[0] + '%')
  .css('bottom', percentPosition[1] + '%');
  mapEl.append(domEl);

  function getArmies() { //not really good enough, could get out of sync
    return GAME.latestArmyQuery[name];
  }

  function onWorldUpdate(e, query) {
    armyCount = query[name].length;
    domEl.html(armyCount);
  }

  god.on('worldUpdate', (e, query) => { onWorldUpdate(e, query); });

  let thisWaypoint =  {
    percentageArr : percentageArr,
    domEl : domEl,
    getArmies : getArmies,
    type : type,
    name :name,

    get x() { return domEl.css('left');   },
    get y() { return domEl.css('bottom'); },

    get armyCount()         { return armyCount; },
    set armyCount(newCount) { armyCount = newCount; domEl.html(armyCount); },

    get residingPlayer()          { return residingPlayer; },
    set residingPlayer(newPlayer) { residingPlayer = newPlayer; },

    get banner() { return banner;   },
    set banner(newBanner) {
      domEl.removeClass(banner);
      domEl.addClass(newBanner);
      banner = newBanner;
    },
  };

  return thisWaypoint;
}
