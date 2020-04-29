/*
 * TD GAME
 * THE ENCHANTED FOREST 
 *
 * AUTHORS: KEVIN, ALEK
 *
 */

let grid = []; // grid[y][x]
for (let y = 0; y < NUM_TILES.y; y++){
  grid.push([]);
  for (let x = 0; x < NUM_TILES.x; x++){
    grid[y].push(new Tile(TILE_TYPES.EMPTY, pvec(x, y), null));
  }
}
let towerIdGrid = [];
for (let y = 0; y < NUM_TILES.y; y++){
  towerIdGrid.push([]);
  for (let x = 0; x < NUM_TILES.x; x++){
    towerIdGrid[y].push(null);
  }
}

let player = new Player();
let wave_data;
let wave_ct = 0;
let wave_speed = 1000*10; // miliseconds per wave
let mob_spawn_space = 1000; // in miliseconds

let mobs = [];
let mobImages = {};
let towerImages = {};
let mobPath = [];
let spawnPos = pvec(0,0);
let fortressPos;
let bgImage;

let current_map = "basic_map"; // load this map

function mapLoadedCallback(data){
  let tile_ids = data.tiles;
  for(let y=0; y < data.layers.map.length; y++){
    for(let x=0; x < data.layers.map[y].length; x++){
      grid[y][x] = new Tile(tile_ids[data.layers.map[y][x]].tilename, pvec(x, y), null); // tilename is a TILE_TYPE
      if (grid[y][x].type == TILE_TYPES.SPAWN)
        spawnPos = pvec(x,y);
      if (grid[y][x].type == TILE_TYPES.FORTRESS)
        fortressPos = pvec(x,y);
    }
  }

  let cctt = 0;
  let cur_pos = spawnPos;
  let last_pos = cur_pos;
  while(!equal_pvecs(cur_pos, fortressPos)){
    cctt++; 
    if(cctt > NUM_TILES.x*NUM_TILES.y) // prevent potential infinite loops from impossible maps
      break;
    let next_pos;
    let ds = [pvec(-1,0),pvec(1,0),pvec(0,1),pvec(0,-1)];
    for(let i in ds){
      let nx = cur_pos.x + ds[i].x;
      let ny = cur_pos.y + ds[i].y;
      let npos = pvec(nx, ny);
      if(nx >= 0 && ny >= 0 && nx < NUM_TILES.x && ny < NUM_TILES.y && !equal_pvecs(npos, last_pos)){
        if(grid[ny][nx].type == TILE_TYPES.PATH){
          next_pos = copy_pvec(npos);
          break;
        }
      }
    }
    mobPath.push(copy_pvec(cur_pos));
    // could only add it if its in a different direction...
    last_pos = copy_pvec(cur_pos);
    if(next_pos){
      cur_pos = copy_pvec(next_pos);
    }
    else{
      mobPath.push(fortressPos);
      break;
    }

  }
}

function spawnSpacedMobs(mobs_left_to_spawn, mob_type){
  if(mobs_left_to_spawn>0){
    mobs.push(new Mob(spawnPos, mob_type));
    setTimeout(()=>{spawnSpacedMobs(mobs_left_to_spawn-1, mob_type)}, mob_spawn_space*(0.5+random()));
  }
}

function nextWave(){
  if(wave_ct < wave_data.length){
    wave_ct++;
		$("#waveCounter").text(`${wave_ct}/${wave_data.length}`);
    for(let i in wave_data[wave_ct]){
      spawnSpacedMobs(wave_data[wave_ct][i], i);// i must be a MOB_TYPES
    }
  }
  else{
    $.notify("waves over");
  }
  setTimeout(nextWave, wave_speed)
}

function setup(){
  let canvas = createCanvas(TILE_SIZE*NUM_TILES.x,TILE_SIZE*NUM_TILES.y);
  canvas.id("p5canvas");

  bgImage = loadImage(`assets/maps/${current_map}/tilemap.png`);
  let map_load_promise = $.getJSON(`assets/maps/${current_map}/tilemap.json`);
  let waves_load_promise = $.getJSON(`assets/maps/${current_map}/waves.json`);

  // promises are epic!
  $.when(waves_load_promise, map_load_promise).done((data_wave_load, data_map_load)=>{ 
    mapLoadedCallback(data_map_load[0]);
    wave_data = data_wave_load[0];
    nextWave(); 
  });

  for(let i in MOB_TYPES){
    mobImages[MOB_TYPES[i]] = loadImage(`assets/mob_${MOB_TYPES[i]}.png`);
  }

	towerImages["blob"] = loadImage(`assets/towerBlob.png`);
	towerImages["institute"] = loadImage(`assets/towerInstitute.png`);
	towerImages["witch"] = loadImage(`assets/towerWitch.png`);
	towerImages["demon"] = loadImage(`assets/towerDemon.png`);

}

function draw(){
	background(200);
  image(bgImage, 0, 0, width, height);

  stroke(0,0,0,20);
  for(let x = 0; x < NUM_TILES.x; x++){
    line(TILE_SIZE*x, 0, TILE_SIZE*x, TILE_SIZE*NUM_TILES.y);
  }
  for(let y = 0; y < NUM_TILES.y; y++){
    line(0, TILE_SIZE*y, TILE_SIZE*NUM_TILES.x, TILE_SIZE*y);
  }
	for(let y = 0; y < NUM_TILES.y; y++){
		for(let x = 0; x < NUM_TILES.x; x++){
			text(`${y},${x}`, TILE_SIZE*x, TILE_SIZE*(y+1/2));
		}
	}

  player.renderTowers(xylocation_to_pos(mouseX, mouseY));

	for (let i=mobs.length-1; i >= 0; i--){
		mobs[i].update();
		mobs[i].render();
    mobs[i].collideTile();
    if(mobs[i].health <= 0){
      mobs.splice(i, 1);
    }
	}

  fill(0,255,255);
  noStroke();
  ellipse(mouseX, mouseY, 15,15);
}

function mousePressed(){
	if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
		let currentMousePos = xylocation_to_pos(mouseX, mouseY);
		if (player.focussed_tower == null)
			return;
		else if (player.focussed_tower.locationValid())
			player.finishPlacingTower();
		else if ((player.mode == PLAYER_MODES.NOTHING || player.mode == PLAYER_MODES.UPGRADING) && grid[currentMousePos.y][currentMousePos.x].type == TILE_TYPES.TOWER){
				player.towers[player.selectedTowerId].selected = false;
				player.selectedTowerId = towerIdGrid[currentMousePos.y][currentMousePos.x];
				player.selectTowerMode();
		}
		else if (player.mode == PLAYER_MODES.HOVERING)
      $.notify("hey, don't place that there");

  }
}

function keyPressed(){
	if (keyCode === 27) {		// Esc
		player.placeTowerMode();
		player.focussed_tower = null;
		player.mode = PLAYER_MODES.NOTHING;
	}
}

