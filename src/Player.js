class Player {
  constructor(){
    this.seg = 0; // in-game currency
    this.towers = [];
  }
  buildTower(pos, tower_type){
    let tower = new Tower(pos, tower_type);
    this.seg -= tower.cost;
    this.towers.push(tower);
  }
  renderTowers(){
    for(let i = 0; i < this.towers.length; i++){
      this.towers[i].render();
    }
  }
}
