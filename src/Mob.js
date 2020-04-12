class Mob {
  constructor(pos, type){
    this.pos = pos;
    this.type = type;
    this.speed = MOB_STATS[this.type].speed;
    this.health = MOB_STATS[this.type].health;
		this.img = mobImages[this.type];

		this.pathProgress = pvec(0, 0);
  }

	vectorSubtraction(vector1, vector2){
		return pvec(vector1.x - vector2.x, vector1.y - vector2.y);
	}
	vectorAddition(vector1, vector2){
		return pvec(vector1.x + vector2.x, vector1.y + vector2.y);
	}

	update(){
		vectorSubtracted = vectorSubtraction(mobPath[1], mobPath[0]);
		vectorMagnitude = Math.sqrt((vectorSubtracted.x*vectorSubtracted.x)+(vectorSubtracted.y*vectorSubtracted.y));

		if (vectorSubtraction(this.pathProgress, mobPath[1]) * vectorSubtraction(this.pathProgress, mobPath[1]) < this.speed) {
			mobPath.splice(0);
			pathProgress = pvec(0, 0);
		}

		this.pathProgress = pvec(vectorSubtracted.x * this.speed / vectorMagnitude, vectorSubtracted.x * this.speed / vectorMagnitude);

		pos = round(vectorAddition(mobPath[0] + pathProgress)*TILE_SIZE);

	}
  render(){
    // mob
    // health bar
    // fill(255,0,0);
		// ellipse(this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, this.dims.x, this.dims.y);
		image(this.img, this.pos.x*TILE_SIZE, this.pos.y*TILE_SIZE, TILE_SIZE, TILE_SIZE);

  }

}
