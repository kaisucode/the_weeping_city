let grid = []; // grid[y][x]
for (let y = 0; y < NUM_TILES; y++){
  grid.push([]);
  for (let x = 0; x < NUM_TILES; x++){
    grid[y].push(new Tile(TILE_TYPES.empty, pvec(x, y), null));
  }
}

$("body").css("cursor", "none");

let player = new Player();
player.startPlacingTower(TOWER_TYPES.BLOB);

function setup(){
  let canvas = createCanvas(TILE_SIZE*NUM_TILES,TILE_SIZE*NUM_TILES);
  canvas.id("p5canvas");
}

function draw(){
	// background('#0C0A33');
	background(200);
  player.renderTowers(xylocation_to_pos(mouseX, mouseY));

  fill(0,255,255);
  noStroke();
  ellipse(mouseX, mouseY, 15,15);
}

function mouseReleased(){
  player.finishPlacingTower();
}

