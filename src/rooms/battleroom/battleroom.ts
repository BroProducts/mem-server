// BattleRoom.ts
import { Room, Client } from 'colyseus';
import { BattleState } from './BattleState';

export class BattleRoom extends Room<BattleState> {

  onInit (options: any) {
    this.setState(new BattleState());
    this.setPatchRate( 1000 / 20 );
    this.setSimulationInterval( this.update.bind(this) );
  }

  onJoin (client) {
    this.state.addPlayer(client);
    console.log(this.clients);
  }

  onLeave (client) {
    this.state.removePlayer(client);
  }

  onMessage (client, data) {
    if (data.action) {
      this.state.movePlayer(client, data.action);
    }
  }

  update () {
    //gets called every patch
  }

  onDispose () {
    console.log('Dispose BattleRoom');
  }
}
