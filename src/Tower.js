class Tower {
  constructor(pos, type){
    this.pos = pos; 
    this.type = type;
    this.cost = TOWER_COSTS[this.type];
    this.built = false;
    this.projectile = null;
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
}
