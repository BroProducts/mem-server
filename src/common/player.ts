export class Player {
  x: number;
  y: number;

  @nosync
  isTroll: boolean = "This property won't be synched with clients";
}
