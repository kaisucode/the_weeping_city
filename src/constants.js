const TILE_SIZE = 32;
const NUM_TILES = {"x": 24, "y": 16};

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

const CENTER = pvec(NUM_TILES*TILE_SIZE>>1, NUM_TILES*TILE_SIZE>>1);

// TODO: add more modes
const PLAYER_MODES = { 
  HOVERING: "hovering", 
  BUYING: "buying", // clicked on an empty tile
  UPGRADING: "upgrading", // clicked on a tower
  NOTHING: "nothing"
}

function xylocation_to_pos(x, y){
  let xpos = Math.max(Math.min(NUM_TILES.x-2, Math.floor(x/TILE_SIZE)), 0);
  let ypos = Math.max(Math.min(NUM_TILES.y-2, Math.floor(y/TILE_SIZE)), 0);
  return pvec(xpos, ypos);
}

const PROJECTILE_TYPES = {
  SPIT: "spit"
}

const PROJECTILE_STATS = {
  "spit": {
    "dims": pvec(10,10),
    "damage": 10
  }
}


const MOB_TYPES = {
  DOG: "dog",
  JUMPYDUDE: "jumpydude"
}

// TODO: make this legit
const MOB_STATS = {
  "dog": {
    "speed": 1,
    "health": 10
  },
  "jumpydude": {
    "speed": 2,
    "health": 100
  }
}


