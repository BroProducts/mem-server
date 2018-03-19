import { Vector3 } from 'math3d';
export class Spawn {
  constructor (
    public position: Vector3,
    public team: string
  ) {
    this.position = position;
    this.team = team;
  }
}
