// BattleRoom.ts
import { Room, Client } from 'colyseus';
import { BattleState } from './BattleState';
import * as actionTypes from './actionTypes'

export class BattleRoom extends Room<BattleState> {

  onInit (options: any) {
    console.log('RoomInit Start')
    this.setState(new BattleState());
    this.setPatchRate( 1000 / 20 );
    this.setSimulationInterval( this.update.bind(this) );

    this.state.addTeam(1,'red');
    this.state.addTeam(2,'blue');
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
    console.log(data);
    switch(data.action) {
       case actionTypes.MOVE_PLAYER_TO: {
          console.log('MOVE_PLAYER_TO');
          break;
       }
       case actionTypes.SEND_MESSAGE: {
          console.log('SEND_MESSAGE');
          break;
       }
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
