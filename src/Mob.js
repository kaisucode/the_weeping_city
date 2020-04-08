class Mob {
  constructor(pos, type){
    this.pos = pos;
    this.type = type;
    this.speed = MOB_STATS[this.type].speed;
    this.health = MOB_STATS[this.type].health;
		this.img = mobImages[this.type];
  }
  render(){
    // mob
    // health bar
    // fill(255,0,0);
		// ellipse(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, this.dims.x, this.dims.y);
		image(this.img, this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE, TILE_SIZE);

  }

}
