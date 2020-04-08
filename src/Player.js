class Player {
  constructor(){
		this.hp = 100;
    this.seg = 1000; // in-game currency
    this.towers = [];
    this.mode = PLAYER_MODES.NOTHING;

    // note: if focussed_tower.built is true, then we are showing the focussed
    // tower's stats and can upgrade it and stuff
    // else if focussed_tower.built is fasle then we are hovering it at the mouse position
    // its build is pending
    this.focussed_tower = null; // pointer to tower object

  }
  startPlacingTower(tower_type){
    this.mode = PLAYER_MODES.HOVERING;
    this.focussed_tower = new Tower(CENTER, tower_type);
  }

  finishPlacingTower(){
    if(this.focussed_tower.locationValid()){
      if(this.seg >= this.focussed_tower.cost){
        this.seg -= this.focussed_tower.cost;
        this.towers.push(this.focussed_tower);
        this.focussed_tower.performBuild();
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
    }
    if (this.mode == PLAYER_MODES.HOVERING){
      if(!this.focussed_tower.built){
        this.focussed_tower.pos = mousePos;
        this.focussed_tower.render();
      }
    }
  }
	updateSegCounter(){
		$("#segCounter").text(`Seg: x${this.seg}`);
	}
	updateHpCounter(){
		$("#hpCounter").text(`Health: ${this.hp}`);
	}
}
