import { Vector3 } from 'math3d';
export class CapturePoint {
  constructor (
    public position: Vector3,
    public isSpawn: boolean,
    public radius: number,
    public team: string,
  ) {
    this.position = position;
    this.isSpawn = isSpawn;
    this.radius = radius;
    this.team = team;
  }
}
