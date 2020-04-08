class Tile {
  constructor(type, pos, tile_object_pointer){
    this.type = type;
    this.pos = pos;
    this.tile_object_pointer = tile_object_pointer;
  }
  on_click() {
    alert("ayyy" + this.type);
    // trigger kevin's UI stuff
  }
}
