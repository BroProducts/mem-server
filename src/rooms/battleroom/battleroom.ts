// BattleRoom.ts
import { Room, Client } from 'colyseus';
import { BattleState } from './battleState';
import map from '../../maps/map4';

export class BattleRoom extends Room<BattleState> {

  onInit (options: any) {
    console.log('RoomInit Start')
    this.setState(new BattleState());
    this.setPatchRate( 1000 / 40 );
    this.setSimulationInterval( this.update.bind(this) );

    map.teams.forEach((team) => {
      this.state.addTeam(team.id, team.color, team.score);
    })

    console.log(this.state);
    console.log('RoomInit End')
  }

  onJoin (client) {
    this.state.addPlayer(client);
  }

  onLeave (client) {
    this.state.removePlayer(client);
  }

  onMessage (client, data) {
    this.state[data.action](client, data.payload);

    if(data.action == 'MOVE_PLAYER_TO') {
      //this.broadcast(data.payload);
      this.broadcast({
        playerId: `${client.sessionId}`,
        action: `${data.action}`,
        x: `${data.payload.x}`,
        y: `${data.payload.y}`,
        z: `${data.payload.z}`
      });
    }
    /*
    if (data.action) {
      this.state.movePlayer(client, data.action);
    }
    */
  }

  update () {
    //gets called every patch
  }

  onDispose () {
    console.log('Dispose BattleRoom');
  }
}
