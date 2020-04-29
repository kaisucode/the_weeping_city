class Mob {
  constructor(pos, type){
    this.pos = copy_pvec(pos);
    this.type = type;
    this.speed = MOB_STATS[this.type].speed;
    this.health = MOB_STATS[this.type].health;
		this.img = mobImages[this.type];
    
    this.path = [...mobPath];
    this.renderPos = pvec(pos.x*TILE_SIZE, pos.y*TILE_SIZE);
  }

  // returns a heading that the projectile should be fired at, or returns false
  oracle_path_prediction(projectile_vel, projectile_start_pos, projectile_dims){
    let predicted_pos = pvec(this.renderPos.x, this.renderPos.y);
    let path_copy = this.path.slice();
    for(let t = 0; t < 100; t++){
      let pathLeft = createVector(path_copy[1].x*TILE_SIZE - predicted_pos.x, path_copy[1].y*TILE_SIZE - predicted_pos.y);
      if (pathLeft.mag(pathLeft) < this.speed){
        path_copy.splice(0, 1);
        predicted_pos.x += pathLeft.x;
        predicted_pos.y += pathLeft.y;
      }
      else{
        pathLeft.setMag(this.speed);
        predicted_pos.x += pathLeft.x;
        predicted_pos.y += pathLeft.y;
      }

      let optHeading = createVector(predicted_pos.x-projectile_start_pos.x, predicted_pos.y-projectile_start_pos.y);
      optHeading.setMag(projectile_vel);
      optHeading.mult(t);

      let finalProjectilePos = pvec(optHeading.x+projectile_start_pos.x, optHeading.y+projectile_start_pos.y);
      let xCollision = predicted_pos.x + TILE_SIZE >= finalProjectilePos.x &&
        finalProjectilePos.x + projectile_dims.x >= predicted_pos.x;
      let yCollision = predicted_pos.y + TILE_SIZE >= finalProjectilePos.y &&
        finalProjectilePos.y + projectile_dims.y >= predicted_pos.y;
      if(xCollision && yCollision){
        optHeading.setMag(projectile_vel)
        return optHeading;
      }
    }
    return false;
  }

  collideTile(){
    let inTile = grid[this.pos.y][this.pos.x];
    if(inTile.type == TILE_TYPES.FORTRESS){
      this.health = 0;
      player.updateHp(-1);
      $.notify("mob got to fortress");
    }
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
    rect(this.renderPos.x, this.renderPos.y, TILE_SIZE*this.health/MOB_STATS[this.type].health, 3);
		
    // mob
    image(this.img, this.renderPos.x, this.renderPos.y, TILE_SIZE, TILE_SIZE, 0, 0, TILE_SIZE, TILE_SIZE);

  }

}
