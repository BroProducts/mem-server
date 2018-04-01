// BattleState.ts
import { EntityMap } from 'colyseus';
import { Player } from '../../models/player';
import { Team } from '../../models/team';
import { Spawn } from '../../models/spawn';
import { CapturePoint } from '../../models/capturePoint';
import { Teleporter } from '../../models/teleporter';

import * as actionTypes from './actionTypes';
import { Vector3 } from 'math3d';

export class BattleState {
  players: EntityMap<Player> = {};
  teams: EntityMap<Team> = {};
  spawns: EntityMap<Spawn> = {};
  capturePoints: EntityMap<CapturePoint> = {};
  teleporters: EntityMap<Teleporter> = {};
  elapsedTime: number = 0;
  maxScore: number;
  mapName: string;
  gameMode: string;
  numberOfPlayers: number;

  constructor (maxScore: number, mapName: string, gameMode: string, numberOfPlayers: number) {
    this.maxScore = maxScore;
    this.mapName = mapName;
    this.gameMode = gameMode;
    this.numberOfPlayers = numberOfPlayers;
  }

  addPlayer (client) {
    var teamId = this.getTeamIdWithFewestPlayers();
    var spawnOfTeam = this.getSpawnByTeamId(teamId);
    this.players[ client.sessionId ] = new Player(
      client.sessionId, //id
      100, //hp
      'Player', //name
      teamId, //team
      20, //energy
      3, //energyRegenerationSpeed
      5, //moveSpeed
      0, //xp
      new Vector3(spawnOfTeam.position.x, spawnOfTeam.position.y, spawnOfTeam.position.z), //currentPosition
      new Vector3(), //moveTo
    );
    console.log('player added');
    console.log(`player sessionId: ${client.sessionId}`);
    console.log(this.players[ client.sessionId]);
  }

  removePlayer (client) {
    delete this.players[ client.sessionId ];
    console.log('player removed')
  }

  addTeam (id: string, color: string, score: number) {
    this.teams [ id ] = new Team(id, color, score);
  }

  addSpawn(id: string, position: {x,y,z}, team: string) {
    this.spawns [ id ] = new Spawn(id, new Vector3(position.x,position.y,position.z), team);
  }

  addCapturePoint(id: string, position: {x,y,z}, isSpawn: boolean, radius: number, team: string, takenTo: number) {
    this.capturePoints [ id ] = new CapturePoint(
      id,
      new Vector3(position.x,position.y,position.z),
      isSpawn,
      radius,
      team,
      takenTo,
    );
  }

  addTeleporter(id: string, startPosition: {x,y,z}, endPosition: {x,y,z}, radius: number, team: string) {
    this.teleporters [ id ] = new Teleporter(
      id,
      new Vector3(startPosition.x,startPosition.y,startPosition.z),
      new Vector3(endPosition.x,endPosition.y,endPosition.z),
      radius,
      team
    );
  }

  inceaseTeamScore (teamId: string, points: number) {
    this.teams [ teamId ].score += points;
    console.log(' new Team Score')
    console.log(this.teams [ teamId ].score)
    if(this.teams [ teamId ].score >= this.maxScore){
      //TODO end game
      console.log('Team wonnered');
    }
  }

  setElapsedTime(elapsedTime: number) {
    this.elapsedTime = elapsedTime;
    console.log('elapsedTime')
    console.log(this.elapsedTime)
  }

  //actions
  [actionTypes.AUTO_ATTACK_ENTITY] (client, payload) {
    console.log('action: AUTO_ATTACK_ENTITY')
    //TODO
  }
  [actionTypes.CAST_ABILITY] (client, payload) {
    console.log('action: CAST_ABILITY')
    //TODO
  }
  [actionTypes.INTERACT] (client, payload) {
    console.log('action: INTERACT')
    //TODO
  }
  [actionTypes.JOIN_TEAM] (client, payload) {
    console.log('action: JOIN_TEAM')
    //TODO
  }
  [actionTypes.MOVE_PLAYER_TO] (client, {x,y,z}) {
    this.players[ client.sessionId ].moveTo = new Vector3(x,y,z);
  }
  [actionTypes.SEND_MESSAGE] (client, payload) {
    console.log('action: SEND_MESSAGE')
    //TODO
  }
  [actionTypes.SEND_EMOTION] (client, payload) {
    console.log('action: SEND_EMOTION')
    //TODO
  }
  [actionTypes.SEND_PING] (client, payload) {
    console.log('action: SEND_PING')
    //TODO
  }
  [actionTypes.SET_PLAYER_POSITION] (client, {x,y,z}) {
    this.players[ client.sessionId ].currentPosition = new Vector3(x,y,z);
  }
  [actionTypes.SWITCH_TEAMS] (client, payload) {
    console.log('action: SWITCH_TEAMS')
    //TODO
  }
  [actionTypes.USE_ITEM] (client, payload) {
    console.log('action: USE_ITEM')
    //TODO
  }

  //getters
  getTeamsAsArray() {
    var teams = this.teams;
    var keysTeams = Object.keys(teams);

    var teamsArr = [];
    keysTeams.forEach(keyTeam => {
      teamsArr.push(teams[keyTeam]);
    });
    return teamsArr;
  };

  getCapturePointsAsArray(): CapturePoint[] {
    var capturePoints = this.capturePoints;
    var keysCapturePoints = Object.keys(capturePoints);

    var capturePointsArr = [];
    keysCapturePoints.forEach(keyCapturePoint => {
      capturePointsArr.push(capturePoints[keyCapturePoint]);
    });
    return capturePointsArr;
  }

  getPlayersAsArray(): Player[] {
    var players = this.players;
    var keysPlayers = Object.keys(players);

    var playersArr = [];
    keysPlayers.forEach(keyPlayer => {
      playersArr.push(players[keyPlayer]);
    });
    return playersArr;
  }

  //TODO use getTeamsAsArray in this function
  getTeamIdWithFewestPlayers() {
    var teams = this.teams;
    var keysTeams = Object.keys(teams);

    var players = this.players;
    var keysPlayers = Object.keys(this.players);

    var teamWithFewestPlayers;
    var numberOfPlayersInTeamWithFewestPlayers = Infinity;

    keysTeams.forEach(keyTeam => {
      var numberOfPlayersInTeam = 0;
      keysPlayers.forEach(keyPlayer => {
        var isInThisTeam = players[keyPlayer].team == keyTeam;
        numberOfPlayersInTeam = isInThisTeam ? numberOfPlayersInTeam + 1 : numberOfPlayersInTeam;
      });
      if(teamWithFewestPlayers) {
        teamWithFewestPlayers = numberOfPlayersInTeamWithFewestPlayers > numberOfPlayersInTeam ?
        teams[keyTeam] :
        teamWithFewestPlayers;
        numberOfPlayersInTeamWithFewestPlayers = numberOfPlayersInTeam;
      } else {
        teamWithFewestPlayers = teams[keyTeam];
        numberOfPlayersInTeamWithFewestPlayers = numberOfPlayersInTeam;
      };
    });
    return teamWithFewestPlayers.id;
  }

  getSpawnByTeamId(teamId: string){
    var spawns = this.spawns;
    var keysSpawns = Object.keys(this.spawns);
    var teamSpawn = null;
    keysSpawns.forEach(spawnKey => {
      var spawn = spawns[spawnKey];
      if(spawn.team == teamId) {
        teamSpawn = spawn;
      }
    });
    return teamSpawn;
  }
}
