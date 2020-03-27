let grid = []; // grid[y][x]
for (let y = 0; y < NUM_TILES; y++){
  grid.push([]);
  for (let x = 0; x < NUM_TILES; x++){
    grid[y].push(new Tile(TILE_TYPES.empty, pvec(x, y), null));
  }
}

let player = new Player();
player.startPlacingTower(TOWER_TYPES.BLOB);

function setup(){
  createCanvas(500,500);
}

function draw(){
  background(200);
  player.renderTowers();
}

