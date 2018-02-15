// BattleState.ts
import { EntityMap } from 'colyseus';
import { Player } from './Player';
import { Team } from './Team'
import * as actionTypes from './actionTypes'

export class BattleState {
  players: EntityMap<Player> = {};
  teams: EntityMap<Team> = {};

  addPlayer (client) {
    this.players[ client.sessionId ] = new Player(
      0, //x
      0, //y
      0, //z
      100, //hp
      'Player', //name
      '1', //team
      30, //energy
      3, //energyRegenerationSpeed
      5, //moveSpeed
      0 //xp
    );
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

  [actionTypes.MOVE_PLAYER_TO] ({x,y,z}) {
    console.log('action: MOVE_PLAYER_TO')
    console.log('Log: x: ' + x + ' y: ' + y)
  }
}
