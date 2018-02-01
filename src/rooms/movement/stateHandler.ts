import { EntityMap } from "colyseus";
import { Player } from "./Player";

export class StateHandler {
  players: EntityMap<Player> = {};
  map: any
  counter: number
  constructor () {
    this.players = {}
    this.map = {}
    this.counter = 0
  }

  addPlayer (client) {
    this.players[ client.sesssionId ] = new Player(0, 0);
    console.log('added player')
  }


  removePlayer (client) {
    delete this.players[ client.sessionId ];
    console.log('removed player')
  }

  movePlayer (client, action) {
    if (action === "left") {
      this.players[ client.sessionId ].x -= 1;

    } else if (action === "right") {
      this.players[ client.sessionId ].x += 1;
    }
  }

  increaseCounter () {
    this.counter++
  }
}
