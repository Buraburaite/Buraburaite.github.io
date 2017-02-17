function Waypoint(percentageArr, waypointType, waypointName = parseString(positionArr)) {

  const percentPosition = percentageArr;
  let type = waypointType;
  let name = waypointName;
  let residingPlayer = null;
  let banner = 'Neutral';
  // let armies; eventually, we want a variable like to auto-refresh

  let armyCount = 0;
  const god = GAME.god;
  const mapEl = GAME.map;
  const players = GAME.players;

  let domEl = $('<span/>')
  .addClass('waypoint')
  .addClass('neutral')
  .attr('id', name)
  .html(armyCount)
  .css('left',   percentPosition[0] + '%')
  .css('bottom', percentPosition[1] + '%');
  mapEl.append(domEl);

  let tooltip = $('<span/>')
  .addClass('myTooltip')
  .addClass('neutral')
  .attr('id', name + '-myTooltip')
  .html('<em>' + name + '</em><br>' + 'Banner: ' + banner)
  .css('left',   percentPosition[0] - 5 + '%')
  .css('bottom', percentPosition[1] + 8 + '%');
  mapEl.append(tooltip);

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
      domEl.removeClass(banner.toLowerCase());
      domEl.addClass(newBanner.toLowerCase());
      tooltip.removeClass(banner.toLowerCase());
      tooltip.addClass(newBanner.toLowerCase());
      tooltip.html('<em>' + name + '</em><br>' + 'Banner: ' + newBanner);
      banner = newBanner;
    },
  };

  return thisWaypoint;
}
