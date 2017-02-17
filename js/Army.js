function Army(commandingPlayer, startWaypoint) {

  const player = commandingPlayer;
  let waypoint = startWaypoint;

  const god       = GAME.god;
  const mapEl     = GAME.map;
  const img       = new Image();
  let actionsLeft = 2;

  let mons = [
    'Abomasnow',
    'Abra',
    'Absol',
    'Accelgor',
    'Aegislash- A',
    'Aegislash- D',
    'Aerodactyl',
    'AeroVeedramon',
    'Aggron',
    'Agnimon',
    'Agumon',
    'Aipom',
    'Airdramon',
    'Alakazam',
    'Aldamon',
    'Allomon',
    'Alomomola',
    'Alphamon',
    'Alraumon',
    'Altaria',
    'Amaura',
    'Ambipom',
    'Amoonguss',
    'Ampharos',
    'AncientBeetlemon',
    'AncientGarurumon',
    'AncientGreymon',
    'AncientKazemon',
    'AncientMegatheriumon',
    'AncientMermaimon',
    'AncientSphinxmon',
    'AncientTroiamon',
    'AncientVolcamon',
    'Andromon',
    'Angemon',
    'Angewomon',
    'Ankylomon',
    'Anorith',
    'Antiramon',
    'Anubimon',
    'Apemon',
    'Apocalymon',
    'Apollomon',
    'Aquilamon',
    'Arachnimon',
    'Arbok',
    'Arcanine',
    'Arceus',
    'Archelomon',
    'Archen',
    'Archeops',
    'Argomon'
  ];


  //Create army image
  img.src = 'Assets/Mons/' + _.sample(mons) + '.png';
  img.width = 100;
  img.height = 60;
  img.className = 'army';
  mapEl.append(img);

  //Place army image
  waypoint.banner = player.house;
  // img.style.left = waypoint.x;
  img.style.left = +waypoint.x.replace('px','') + 20 + 'px';
  img.style.bottom = waypoint.y;

  function moveTo(newWaypoint) {

    let armies = newWaypoint.getArmies();
    if (armies.length > 0) {
      waypoint.banner = 'neutral';
      newWaypoint.banner = 'conflict';
      img.style.left = +newWaypoint.x.replace('px','') - 70 + 'px';
      img.style.bottom = newWaypoint.y;
    }
    else {
      waypoint.banner = 'neutral';
      newWaypoint.banner = player.house;
      img.style.left = +newWaypoint.x.replace('px','') + 20 + 'px';
      img.style.bottom = newWaypoint.y;

      waypoint.residingPlayer = player;
    }


    waypoint = newWaypoint;
  }

  function onQueryArmies(e, query) {

    query[player.name].push(thisArmy);
    query[waypoint.name].push(thisArmy);
    query[player.name + ':' + waypoint.name].push(thisArmy);
    query[waypoint.name + ':' + player.name].push(thisArmy);
  }


  //Add events
  god.on('queryArmies', (e, query)  => { onQueryArmies (e, query);  });

  let thisArmy = {
    moveTo : moveTo,
    player : player,
    waypoint : waypoint
  };

  return thisArmy;
}
