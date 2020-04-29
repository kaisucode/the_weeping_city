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
    rect(this.renderPos.x, this.renderPos.y, this.dims.x, this.dims.y);
  }


  hits_mob(mob_pos){
    let xCollision = mob_pos.renderPos.x + TILE_SIZE >= this.renderPos.x && this.renderPos.x + this.dims.x >= mob_pos.renderPos.x;
    let yCollision = mob_pos.renderPos.y + TILE_SIZE >= this.renderPos.y && this.renderPos.y + this.dims.y >= mob_pos.renderPos.y;
    return xCollision && yCollision;
  }


  // returns `true` if it hits something (if so, it will be deleted), `false` otherwise
  update(){
    this.renderPos.x += this.vel.x;
    this.renderPos.y += this.vel.y;

    // collision detection
    for(let i in mobs){
      if(this.hits_mob(mobs[i])){
        mobs[i].health= 0;
        return true;
      }
    }
    return false;
  }

}
