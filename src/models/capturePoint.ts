import { Vector3 } from 'math3d';
export class CapturePoint {
  public id: string
  public position: Vector3
  public isSpawn: boolean
  public radius: number
  public team: string
  public takenTo: number

  constructor (
    id: string,
    position: Vector3,
    isSpawn: boolean,
    radius: number,
    team: string,
    takenTo: number,
  ) {
    this.id = id;
    this.position = position;
    this.isSpawn = isSpawn;
    this.radius = radius;
    this.team = team;
    this.takenTo = takenTo;
  }
}
