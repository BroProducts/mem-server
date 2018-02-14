// BattleState.ts
import { EntityMap } from 'colyseus';
import { Player } from './Player';
import { Team } from './Team'

export class BattleState {
  players: EntityMap<Player> = {};
  teams: EntityMap<Team> = {};

  addPlayer (client) {
    this.players[ client.sessionId ] = new Player(0,0,0, 100, 'Player', '1');
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

  addTeam (teamId: number, teamColor: string) {
    this.teams[ teamId ] = new Team(teamColor, 0)
  }
}
