let grid = []; // grid[y][x]
for (let y = 0; y < NUM_TILES; y++){
  grid.push([]);
  for (let x = 0; x < NUM_TILES; x++){
    grid[y].push(new Tile(TILE_TYPES.empty, pvec(x, y), null));
  }
}


let player = new Player();
// player.startPlacingTower(TOWER_TYPES.BLOB);

function setup(){
  let canvas = createCanvas(TILE_SIZE*NUM_TILES,TILE_SIZE*NUM_TILES);
  canvas.id("p5canvas");
}

function draw(){
	// background('#0C0A33');
	background(200);

  stroke(0,0,0,20);
  for(let x = 0; x < NUM_TILES; x++){
    line(TILE_SIZE*x, 0, TILE_SIZE*x, TILE_SIZE*NUM_TILES);
  }
  for(let y = 0; y < NUM_TILES; y++){
    line(0, TILE_SIZE*y, TILE_SIZE*NUM_TILES, TILE_SIZE*y);
  }

  player.renderTowers(xylocation_to_pos(mouseX, mouseY));
	player.updateSegCounter();
	player.updateHpCounter();

  fill(0,255,255);
  noStroke();
  ellipse(mouseX, mouseY, 15,15);
}

function mouseReleased(){
  player.finishPlacingTower();
}

