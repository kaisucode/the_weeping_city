const TILE_SIZE = 32;
const NUM_TILES = 16;
const TOWER_TYPES = {
  BLOB: 'blob',
  DEMON: 'demon',
  WITCH: 'witch',
  INSTITUTE: 'institute'
};

// TODO: tune these costs
const TOWER_COSTS = {
  "blob": 10,
  "witch": 20,
  "institute": 20,
  "demon": 30
};


/*
 * grid will be a 2D array of tile types
 * we use grid to determine for example, if placement of a tower is valid
 * when you click on a tile you get a pointer to the tile object, if it exists
 * (which it will for path, tower, spawn, and fortress tiles but not empty tiles)
*/
const TILE_TYPES = {
  EMPTY: 'empty', 
  PATH: 'path', 
  TOWER: 'tower',
  FORTRESS: 'fortress',
  SPAWN: 'spawn'
};

function pvec(x, y){
  return {"x": x, "y":y};
}

