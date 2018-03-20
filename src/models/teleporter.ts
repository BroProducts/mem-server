import { Vector3 } from 'math3d';
export class Teleporter {
  constructor (
    public id: string,
    public startPosition: Vector3,
    public endPosition: Vector3,
    public radius: number,
    public team: string,
  ) {
    this.id = id;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.radius = radius;
    this.team = team;
  }
}
