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

  addPlayer (client) {
    this.players[ client.sessionId ] = Player.generate()
    console.log('player added');
    console.log(client.sessionId);
    console.log('all current players:');
    console.log(this.players);
  }

  removePlayer (client) {
    delete this.players[ client.sessionId ];
    console.log('player removed')
  }

  movePlayer (client, action) {
    if (action === "left") {
      this.players[ client.sessionId ].currentPosition.x -= 1;

    } else if (action === "right") {
      this.players[ client.sessionId ].currentPosition.x += 1;
    }
  }

  addTeam (id: string, color: string, score: number) {
    this.teams [ id ] = new Team(id, color, score);
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
    console.log('action: MOVE_PLAYER_TO')
    console.log('Log: x: ' + x + ' y: ' + y + ' z: ' + z)
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
    console.log('action: SET_PLAYER_POSITION')
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
