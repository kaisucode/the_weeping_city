class Mob {
  constructor(pos, type){
    this.pos = pos;
    this.type = type;
    this.speed = MOB_STATS[this.type].speed;
    this.health = MOB_STATS[this.type].health;
  }
  render(){
    // mob
    // health bar
  }

}
