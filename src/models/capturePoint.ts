import { Vector3 } from 'math3d';
export class CapturePoint {
  constructor (
    public id: string,
    public position: Vector3,
    public isSpawn: boolean,
    public radius: number,
    public team: string,
  ) {
    this.id = id;
    this.position = position;
    this.isSpawn = isSpawn;
    this.radius = radius;
    this.team = team;
  }
}
