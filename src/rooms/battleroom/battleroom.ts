// BattleRoom.ts
import { Room, Client } from 'colyseus';
import { BattleState } from './battleState';
import map from '../../maps/map4';

import { Vector } from 'math3d';

export class BattleRoom extends Room<BattleState> {

  onInit (options: any) {
    console.log('RoomInit Start')
    this.setState(new BattleState(map.maxScore, map.mapName, map.gameMode, map.numberOfPlayers));
    this.setPatchRate( 50 );
    this.setSimulationInterval( this.update.bind(this) );


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
        capturePoint.team,
        capturePoint.takenTo,
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

    this.clock.setInterval(this.calculateCapturePointTick.bind(this), 5000)
    this.clock.setInterval(this.calculateCapturePoints.bind(this), 10000)

    this.clock.setInterval(this.setElapsedTime.bind(this), 1000)

    console.log(this.state);
    console.log('RoomInit End')
  }

  setElapsedTime() {
    this.state.setElapsedTime(this.clock.elapsedTime)
  }

  calculateCapturePointTick() {
    var capturePoints = this.state.getCapturePointsAsArray();
    var players = this.state.getPlayersAsArray();
    console.log('CALCULATE TICK');
    players.forEach(player => {
      var playerPosition = player.currentPosition;
      capturePoints.forEach(capturePoint => {
        var distanceToPlayer = capturePoint.position.distanceTo(playerPosition);
        var isInRadius = capturePoint.radius > distanceToPlayer;
        if(isInRadius) {
          //TODO when more people then 1 are on the sport calculate if something has to change
          if(capturePoint.team == null) {
            //capturePoint has no team
            capturePoint.takenTo = capturePoint.takenTo + 1;
            capturePoint.team = player.team;
          } else if(capturePoint.team == player.team) {
            //capturePoint is same team as player
            capturePoint.takenTo = capturePoint.takenTo + 1;
          } else if(capturePoint.team != player.team) {
            //capturePoint is from other team as player
            capturePoint.takenTo = capturePoint.takenTo - 1;
            if(capturePoint.takenTo == 0) {
              capturePoint.team = null;
            }
          }
        }
      });
    });
    capturePoints.forEach(capturePoint => {
        if(capturePoint.takenTo > 100) {
          capturePoint.takenTo = 100;
        }
    });
  };

  calculateCapturePoints() {
    var teams = this.state.getTeamsAsArray();
    var capturePoints = this.state.getCapturePointsAsArray();
    teams.forEach(team => {
      var newScorePoints = 0;
      capturePoints.forEach(capturePoint => {
        if(capturePoint.team == team.id && capturePoint.takenTo > 49) {
          newScorePoints = newScorePoints + 10;
        }
      });
      if(newScorePoints > 0) {
        this.state.inceaseTeamScore(team.id, newScorePoints);
      }
      console.log('new score points: ' + newScorePoints)
      console.log('new team score: ' + team.score)
    });
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
