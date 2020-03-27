class Tower {
  constructor(pos, type){
    this.pos = pos;
    this.type = type;
  }
  render(){
    if(this.type == TOWER_TYPES.BLOB){
      fill(0,255,0);
      rect(pos.x, pos.y, TILE_SIZE*2, TILE_SIZE*2);
    }
    else{
      fill(255,0,0);
      rect(pos.x, pos.y, TILE_SIZE*2, TILE_SIZE*2);
    }
  }
}
