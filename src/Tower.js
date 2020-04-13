class Tower {
  constructor(pos, type, id){
    this.pos = pos; 
    this.type = type;
    this.cost = TOWER_COSTS[this.type];
    this.built = false;
    this.projectile = null;
		this.id = id;

		this.upgradeLevels = {
			"power": 1, 
			"speed": 1, 
			"range": 1, 
			"specialAttack": 1
		}

    this.speed = 1000*5;
  }

  launchProjectile(){
    this.projectile = new Projectile(pvec(this.pos.x, this.pos.y), PROJECTILE_TYPES.SPIT, pvec(random(), random()));
    setTimeout(() => {this.launchProjectile() }, this.speed*(random()+0.5));
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
        towerIdGrid[this.pos.y+dy][this.pos.x+dx] = this.id;
      }
    }
    setTimeout(() => {this.launchProjectile() }, this.speed*(random()+0.5));
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
