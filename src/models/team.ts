export class Team {
  constructor (
    public id: string,
    public color: string,
    public score: number
  ) {
    this.id = id;
    this.color = color;
    this.score = score;
  }
}
