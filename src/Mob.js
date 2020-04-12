class Mob {
  constructor(pos, type){
    this.pos = pos;
    this.type = type;
    this.speed = MOB_STATS[this.type].speed;
    this.health = MOB_STATS[this.type].health;
		this.img = mobImages[this.type];
    
    this.path = [...mobPath];
    this.renderPos = pvec(pos.x*TILE_SIZE, pos.y*TILE_SIZE);
  }

	update(){
    if(this.path.length < 2)
      return;

    let pathLeft = createVector(this.path[1].x*TILE_SIZE - this.renderPos.x, this.path[1].y*TILE_SIZE - this.renderPos.y);
    if (pathLeft.mag(pathLeft) < this.speed){
      this.path.splice(0, 1);
      this.renderPos.x += pathLeft.x;
      this.renderPos.y += pathLeft.y;
    }
    else{
      pathLeft.setMag(this.speed);
      this.renderPos.x += pathLeft.x;
      this.renderPos.y += pathLeft.y;
    }

		this.pos.x = round(this.renderPos.x/TILE_SIZE);
		this.pos.y = round(this.renderPos.y/TILE_SIZE);
	}

  render(){
    // health bar
    fill(255,0,0);
    rect(this.renderPos.x, this.renderPos.y, TILE_SIZE, 3);
		
    // mob
    image(this.img, this.renderPos.x, this.renderPos.y, TILE_SIZE, TILE_SIZE);

  }

}
