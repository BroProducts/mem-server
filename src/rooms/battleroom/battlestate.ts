// BattleState.ts
import { EntityMap } from "colyseus";
import { Player } from "./Player";

export class BattleState {
  players: EntityMap<Player> = {};

  addPlayer (client) {
    this.players[ client.sessionId ] = new Player(0,0);
  }

  removePlayer (client) {
    delete this.players[ client.sessionId ];
  }

  movePlayer (client, action) {
    if (action === "left") {
      this.players[ client.sessionId ].x -= 1;

    } else if (action === "right") {
      this.players[ client.sessionId ].x += 1;
    }
  }
}
