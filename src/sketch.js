
let grid = []; // grid[y][x]
for (let y = 0; y < NUM_TILES.y; y++){
  grid.push([]);
  for (let x = 0; x < NUM_TILES.x; x++){
    grid[y].push(new Tile(TILE_TYPES.EMPTY, pvec(x, y), null));
  }
}

let player = new Player();
// player.startPlacingTower(TOWER_TYPES.BLOB);


let mobs = [];
let mobImages = {};

function setup(){
  let canvas = createCanvas(TILE_SIZE*NUM_TILES.x,TILE_SIZE*NUM_TILES.y);
  canvas.id("p5canvas");

	mobImages["jumpydude"] = loadImage("assets/jumpydude.png");
	mobs.push(new Mob(pvec(0, 0), "jumpydude"));
}

function draw(){
	// background('#0C0A33');
	background(200);

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
		mobs[i].render();
	}

  fill(0,255,255);
  noStroke();
  ellipse(mouseX, mouseY, 15,15);
}

function mouseReleased(){
  if(player.focussed_tower != null){
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height)
      player.finishPlacingTower();
  }
}

