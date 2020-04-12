class Tower {
  constructor(pos, type){
    this.pos = pos; 
    this.type = type;
    this.cost = TOWER_COSTS[this.type];
    this.built = false;
    this.projectile = null;
  }

  // this function returns the boolean value "is the location of the building (which has this.built=false right now) on top of other stuff on the grid?"
  locationValid(){
    if(this.pos.x+1>NUM_TILES.x || this.pos.y +1 >NUM_TILES.y)
      return false;
    for (let dx = 0; dx < 2; dx++){
      for (let dy = 0; dy < 2; dy++){
        if(grid[this.pos.y+dy][this.pos.x+dx].type != TILE_TYPES.EMPTY){
          return false;
        }
      }
    }
    return true;
  }

  performBuild(){
    this.built = true;
    for (let dx = 0; dx < 2; dx++){
      for (let dy = 0; dy < 2; dy++){
        grid[this.pos.y+dy][this.pos.x+dx] = this.type;
      }
    }
  }

  render(){
    if(this.type == TOWER_TYPES.BLOB){
      fill(0,255,0);
      rect(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
    }
    else if(this.type == TOWER_TYPES.DEMON){
      fill(0,255,0);
      rect(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
    }
    else if(this.type == TOWER_TYPES.WITCH){
      fill(0,255,255);
      rect(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
    }
    else if (this.type == TOWER_TYPES.INSTITUTE){
      fill(255,255,0);
      rect(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
    }

    if (!this.built) {
      fill(0);
      text("build pending", this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE*2, TILE_SIZE*2);
    }

    if(this.projectile){
      this.projectile.render();
    }

  }

	upgrade(upgradeName){
		$.notify("upgrading "+upgradeName + " for " + this.type);
	}
}
