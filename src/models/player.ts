// Player.ts
import { Vector3 } from 'math3d';

export class Player {
  constructor (
    public hp: number,
    public name: string,
    public team: string,
    public energy: number,
    public energyRegenerationSpeed: number,
    public moveSpeed: number,
    public xp: number,
    public currentPosition: Vector3,
    public moveTo: Vector3,

  ) {
    this.hp = hp;
    this.name = name;
    this.team = team;
    this.energy = energy;
    this.energyRegenerationSpeed = energyRegenerationSpeed;
    this.moveSpeed = moveSpeed;
    this.xp = xp;
    this.currentPosition = currentPosition;
    this.moveTo = moveTo;
  }
}
