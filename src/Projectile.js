class Projectile {
  constructor(pos, type, vel){
    this.pos = copy_pvec(pos);
    this.renderPos = pvec(pos.x*TILE_SIZE, pos.y*TILE_SIZE);
    this.vel = vel;
    this.type = type;
    this.dims = PROJECTILE_STATS[type].dims;
  }
  render(){
    fill(255,0,0);
    ellipse(this.renderPos.x, this.renderPos.y, this.dims.x, this.dims.y);
  }

  // returns `true` if it hits something (if so, it will be deleted), `false` otherwise
  update(){
    this.renderPos.x += this.vel.x;
    this.renderPos.y += this.vel.y;

    this.pos.x = round(this.renderPos.x/TILE_SIZE);
    this.pos.y = round(this.renderPos.y/TILE_SIZE);

    for(let i in mobs){
      if(mobs[i].pos.x == this.pos.x && mobs[i].pos.y == this.pos.y){
        mobs[i].health= 0;
        return true;
      }
    }
    return false;
  }

}
