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
  maxScore: number = null;
  mapName: string = null;
  gameMode: string = null;
  numberOfPlayers: number = null;

  constructor (maxScore: number, mapName: string, gameMode: string, numberOfPlayers: number) {
    this.maxScore = maxScore;
    this.mapName = mapName;
    this.gameMode = gameMode;
    this.numberOfPlayers = numberOfPlayers;
  }

  addPlayer (client) {
    this.players[ client.sessionId ] = Player.generate()
    console.log('player added');
    console.log(`player sessionId: ${client.sessionId}`);
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

  addCapturePoint(id: string, position: {x,y,z}, isSpawn: boolean, radius: number, team: string) {
    this.capturePoints [ id ] = new CapturePoint(
      id,
      new Vector3(position.x,position.y,position.z),
      isSpawn,
      radius,
      team
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
    this.teams [ teamId ].score += points
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
}
