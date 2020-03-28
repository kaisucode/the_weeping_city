class Projectile {
  constructor(pos, type){
    this.pos = pos;
    this.type = type;
    this.dims = PROJECTILE_STATS[type].dims;
  }
  render(){
    fill(255,0,0);
    ellipse(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, this.dims.x, this.dims.y);
  }
}
