class Player {
  constructor(){
    this.seg = 0; // in-game currency
    this.towers = [];
    this.mode = PLAYER_MODES.NOTHING;
    this.focussed_tower = null; // pointer to tower object
  }
  startPlacingTower(tower_type){
    this.mode = PLAYER_MODES.HOVERING;
    this.focussed_tower = new Tower(pvec(1,1), tower_type);
  }
  finishPlacingTower(){
    this.seg -= this.focussed_tower.cost;
    this.towers.push(this.focussed_tower);
    this.focussed_tower.built = true;
  }
  renderTowers(){
    for(let i = 0; i < this.towers.length; i++){
      this.towers[i].render();
    }
    if (this.mode == PLAYER_MODES.HOVERING){
      this.focussed_tower.render();
    }
  }
}
