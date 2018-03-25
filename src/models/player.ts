import { Vector3 } from 'math3d';

export class Player {
  constructor (
    public id: string,
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
    this.id = id;
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

  static generate () {
    return new Player(
      'few32f34', //id
      100, //hp
      'Player', //name
      '1', //team
      20, //energy
      3, //energyRegenerationSpeed
      5, //moveSpeed
      0, //xp
      new Vector3(), //currentPosition
      new Vector3(), //moveTo
    );
  }
}
