// Player.ts
export class Player {
  constructor (
    public x: number,
    public y: number,
    public z: number,
    public hp: number,
    public name: string,
    public team: string
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.hp = hp;
    this.name = name;
    this.team = team;
  }
}
