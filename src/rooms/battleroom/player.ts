// Player.ts
export class Player {
  constructor (
    public x: number,
    public y: number,
    public hp: number,
    public name: string
  ) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.name = name;
  }
}
