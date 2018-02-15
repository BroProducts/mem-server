// Player.ts
export class Player {
  constructor (
    public x: number,
    public y: number,
    public z: number,
    public hp: number,
    public name: string,
    public team: string,
    public energy: number,
    public energyRegenerationSpeed: number,
    public moveSpeed: number,
    public xp: number

  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.hp = hp;
    this.name = name;
    this.team = team;
    this.energy = energy;
    this.energyRegenerationSpeed = energyRegenerationSpeed;
    this.moveSpeed = moveSpeed;
    this.xp = xp;
  }
}
