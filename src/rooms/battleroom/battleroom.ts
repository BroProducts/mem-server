// BattleRoom.ts
import { Room, Client } from 'colyseus';
import { BattleState } from './battleState';
import map from '../../maps/map4';

export class BattleRoom extends Room<BattleState> {

  onInit (options: any) {
    console.log('RoomInit Start')
    this.setState(new BattleState());
    this.setPatchRate( 50 );
    this.setSimulationInterval( this.update.bind(this) );

    this.state.setMaxScore(map.maxScore);

    map.teams.forEach((team) => {
      this.state.addTeam(team.id, team.color, team.score);
    });

    map.spawns.forEach((spawn) => {
      this.state.addSpawn(spawn.id, spawn.position, spawn.team)
    });

    map.caputrePoints.forEach((capturePoint) => {
      this.state.addCapturePoint(
        capturePoint.id,
        capturePoint.position,
        capturePoint.isSpawn,
        capturePoint.radius,
        capturePoint.team
      )
    });

    map.teleporters.forEach((teleporter) => {
      this.state.addTeleporter(
        teleporter.id,
        teleporter.startPosition,
        teleporter.endPosition,
        teleporter.radius,
        teleporter.team
      )
    });

    //this.clock.start();

    this.clock.setInterval(this.calculateCapturePoints.bind(this), 10000)

    console.log(this.state);
    console.log('RoomInit End')
  }

  calculateCapturePoints() {
    //TODO calculate each teams points which they gain with capture Points
    console.log(this.clock.elapsedTime)
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
