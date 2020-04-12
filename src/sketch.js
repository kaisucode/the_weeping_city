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
const mobPath = [pvec(0, 0), pvec(0, 1), pvec(0, 2), pvec(0, 3), pvec(1, 3), pvec(2, 3), pvec(10,3), pvec(10, 10), pvec(15, 10), pvec(14,8)];
let bgImage;

let current_map = "basic_map"; // load this map

function mapLoadedCallback(data){
  let tile_ids = data.tiles;
  for(let y=0; y < data.layers.map.length; y++){
    for(let x=0; x < data.layers.map[y].length; x++){
      grid[y][x] = new Tile(tile_ids[data.layers.map[y][x]].tilename, pvec(x, y), null); // tilename is a TILE_TYPE
    }
  }
}

function spawnSpacedMobs(mobs_left_to_spawn, mob_type){
  if(mobs_left_to_spawn>0){
    mobs.push(new Mob(pvec(0,0), mob_type));
    setTimeout(()=>{spawnSpacedMobs(mobs_left_to_spawn-1, mob_type)}, mob_spawn_space*(0.5+random()));
  }
}

function nextWave(){
  if(wave_ct < wave_data.length){
    wave_ct++;
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
  $.getJSON(`assets/maps/${current_map}/tilemap.json`, mapLoadedCallback);
  $.getJSON(`assets/maps/${current_map}/waves.json`, (data)=>{ wave_data = data; nextWave(); });

  for(let i in MOB_TYPES){
    mobImages[MOB_TYPES[i]] = loadImage(`assets/mob_${MOB_TYPES[i]}.png`);
  }

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
		if(player.focussed_tower != null){
			player.finishPlacingTower();
		}
		else{
			let currentMousePos = xylocation_to_pos(mouseX, mouseY);
			let temp = towerIdGrid[currentMousePos.y][currentMousePos.x];
			if (temp != null){
				player.selectedTowerId = temp
				player.selectTowerMode();
			}
		}
  }
}

function keyPressed(){
	if (keyCode === 27) {		// Esc
		player.placeTowerMode();
    if (player.mode == PLAYER_MODES.HOVERING){
			player.focussed_tower = null;
			player.mode = PLAYER_MODES.NOTHING;
		}
	}
}

