import { Vector3 } from 'math3d';
export class Spawn {
  constructor (
    public id: string,
    public position: Vector3,
    public team: string
  ) {
    this.id = id;
    this.position = position;
    this.team = team;
  }
}
