class Player {
  constructor(){
		this.hp = 100;
    this.seg = 1000; // in-game currency

    this.towers = [];
    this.mode = PLAYER_MODES.NOTHING;
		this.towerIndex = 0;

    // note: if focussed_tower.built is true, then we are showing the focussed
    // tower's stats and can upgrade it and stuff
    // else if focussed_tower.built is fasle then we are hovering it at the mouse position
    // its build is pending
    this.focussed_tower = null; // pointer to tower object
		this.selectedTowerId = null;

  }
  startPlacingTower(tower_type){
    this.mode = PLAYER_MODES.HOVERING;
    this.focussed_tower = new Tower(CENTER, tower_type, this.towerIndex);
  }

  finishPlacingTower(){
    if(this.focussed_tower.locationValid()){
      if(this.seg >= this.focussed_tower.cost){
        this.updateSeg(-this.focussed_tower.cost);
        this.towers.push(this.focussed_tower);
        this.focussed_tower.performBuild();
				this.selectedTowerId = this.towerIndex;
				this.towerIndex++;
				this.mode = PLAYER_MODES.NOTHING;
      }
      else{
        $.notify("you dont have enough segs to buy that dude");
      }
    }
		else{
      $.notify("hey, don't place that there");
    }
  }

  renderTowers(mousePos){
    for(let i = 0; i < this.towers.length; i++){
      this.towers[i].render();
      this.towers[i].update();
    }
    if (this.mode == PLAYER_MODES.HOVERING){
      if(!this.focussed_tower.built){
        this.focussed_tower.pos = mousePos;
        this.focussed_tower.render();
      }
    }
  }
	updateSeg(delta){
    this.seg += delta;
		$("#segCounter").text(`Seg: x${this.seg}`);
	}
	updateHp(delta){
    this.hp += delta;
		$("#hpCounter").text(`Health: ${this.hp}`);
	}

	placeTowerMode(){
		$("#commandContainer").hide();
		$("#towerContainer").show();
		this.towers[this.selectedTowerId].selected = false;
	}
	selectTowerMode(){
		$("#commandContainer").show();
		$("#towerContainer").hide();
		this.towers[this.selectedTowerId].selected = true;
    this.mode = PLAYER_MODES.UPGRADING;
	}

}
