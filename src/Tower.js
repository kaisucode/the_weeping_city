class Tower {
  constructor(pos, type, id){
    this.pos = copy_pvec(pos);
    this.type = type;
    this.cost = TOWER_COSTS[this.type];
    this.built = false;
    this.projectile = null;
		this.id = id;
		this.selected = false;
		this.img = towerImages[this.type];

		this.upgradeLevels = {
			"power": 1, 
			"speed": 3, 
			"range": 1, 
			"specialAttack": 1
		}

    this.speed = 1000;
  }

  launchProjectile(){
    let mob_to_kill = null;
    for(let i in mobs){
      if (Math.pow(mobs[i].renderPos.x - TILE_SIZE*(this.pos.x+1), 2) + Math.pow(mobs[i].renderPos.y - TILE_SIZE*(this.pos.y+1), 2) < Math.pow(this.upgradeLevels.range*TOWER_STATS[this.type].range*TILE_SIZE, 2)){
        mob_to_kill = mobs[i];
        break;
      }
    }
    if(mob_to_kill){
      let magVel = TOWER_STATS[this.type].speed * this.upgradeLevels.speed;
      let startPos = pvec((this.pos.x+1)*TILE_SIZE, (this.pos.y+1)*TILE_SIZE);
      let projectile_vel = mob_to_kill.oracle_path_prediction(magVel, startPos, pvec(10,10));
      if(projectile_vel){
        this.projectile = new Projectile(pvec(this.pos.x+1, this.pos.y+1), PROJECTILE_TYPES.SPIT, projectile_vel);
        setTimeout(() => {this.launchProjectile() }, this.speed*(random()+0.5));
      }
    }
  }

  // this function returns the boolean value "is the location of the building (which has this.built=false right now) on top of other stuff on the grid?"
  locationValid(){
    if(this.pos.x+1>NUM_TILES.x || this.pos.y +1 >NUM_TILES.y)
      return false;
    for (let dx = 0; dx < 2; dx++){
      for (let dy = 0; dy < 2; dy++){
        if(grid[this.pos.y+dy][this.pos.x+dx].type != TILE_TYPES.GRASS){
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
        towerIdGrid[this.pos.y+dy][this.pos.x+dx] = this.id;
      }
    }
    setTimeout(() => {this.launchProjectile() }, this.speed*(random()+0.5));
  }

  render(){
    if (!this.built || this.selected) {
			fill('rgba(0,255,0,0.25)');
			circle((this.pos.x+1)*TILE_SIZE, (this.pos.y+1)*TILE_SIZE, TOWER_STATS[this.type].range*this.upgradeLevels["range"]*TILE_SIZE);
    }

		if (this.img)
			image(this.img, this.pos.x*TILE_SIZE, (this.pos.y-1)*TILE_SIZE);
		else {
			fill(0,255,0);
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

  update(){
    if(this.projectile){
      let hit_something = this.projectile.update();
      if(hit_something){
        this.projectile = null;
      }
    }
  }

	upgrade(upgradeName){
		if (this.upgradeLevels[upgradeName] == 3)
			$.notify(`${this.type} ${upgradeName} already at max upgrade level`);
		else if(player.seg < UPGRADE_COSTS[this.upgradeLevels[upgradeName]])
			$.notify("you dont have enough segs to buy that dude");
		else{
			player.updateSeg(-UPGRADE_COSTS[this.upgradeLevels[upgradeName]]);
			this.upgradeLevels[upgradeName]++;
			$.notify(`Upgrading ${this.type} ${upgradeName} to lvl ${this.upgradeLevels[upgradeName]}, id=${player.selectedTowerId}`);
		}
	}

}
