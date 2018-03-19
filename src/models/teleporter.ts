import { Vector3 } from 'math3d';
export class Teleporter {
  constructor (
    public startPosition: Vector3,
    public endPosition: Vector3,
    public team: string,
  ) {
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.team = team;
  }
}

/*
{
  startPosition: {
    x: -110,
    y: 0,
    z: 20
  },
  endPosition: {
    x: -70,
    y: 0,
    z: 80
  },
  team: null,
},
*/
