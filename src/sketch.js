
let grid = []; // grid[y][x]
for (let y = 0; y < NUM_TILES.y; y++){
  grid.push([]);
  for (let x = 0; x < NUM_TILES.x; x++){
    grid[y].push(new Tile(TILE_TYPES.EMPTY, pvec(x, y), null));
  }
}

let player = new Player();

let mobs = [];
let mobImages = {};
let mobPath = [pvec(0, 0), pvec(0, 1), pvec(0, 2), pvec(0, 3), pvec(1, 3), pvec(2, 3)];
let bgImage;

let current_map = "basic_map"; // load this map

function mapLoadedCallback(data){
  let tile_ids = data.tiles;
  for(let y=0; y < data.layers.map.length; y++){
    for(let x=0; x < data.layers.map[y].length; x++){
      grid[y][x] = new Tile(tile_ids[data.layers.map[y][x]].tilename, pvec(x, y), null);
    }
  }
}

function setup(){
  let canvas = createCanvas(TILE_SIZE*NUM_TILES.x,TILE_SIZE*NUM_TILES.y);
  canvas.id("p5canvas");

  bgImage = loadImage(`assets/maps/${current_map}/tilemap.png`);
  $.getJSON(`assets/maps/${current_map}/tilemap.json`, mapLoadedCallback);

	mobImages["jumpydude"] = loadImage("assets/jumpydude.png");
	mobs.push(new Mob(pvec(0, 0), "jumpydude"));
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

  player.renderTowers(xylocation_to_pos(mouseX, mouseY));
	player.updateSegCounter();
	player.updateHpCounter();

	for (let i in mobs){
		mobs[i].update();
		mobs[i].render();
	}

  fill(0,255,255);
  noStroke();
  ellipse(mouseX, mouseY, 15,15);
}

// function mouseReleased(){
//   if(player.focussed_tower != null){
//     if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) 
//       player.finishPlacingTower();
//   }
// }

function mousePressed(){
  if(player.focussed_tower != null){
		if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
			player.finishPlacingTower();
		}
  }
}

function keyPressed(){
	if (keyCode === 27) {
		player.placeTowerMode();
	}
}

