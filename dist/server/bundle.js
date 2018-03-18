(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){
/* fuse:injection: */ var process = require("process");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var colyseus_1 = require("colyseus");
// Import Rooms
var hub_1 = require("./rooms/hub/hub");
var battleroom_1 = require("./rooms/battleroom/battleroom");
var port = Number(process.env.PORT || 2657);
var app = express();
// Create HTTP Server
var httpServer = http_1.createServer(app);
// Attach WebSocket Server on HTTP Server.
var gameServer = new colyseus_1.Server({ server: httpServer });
// Register Rooms
gameServer.register("hub", hub_1.Hub);
gameServer.register("battleroom", battleroom_1.BattleRoom);
gameServer.listen(port);
console.log("Listening on http://localhost:" + port);

});
___scope___.file("rooms/hub/hub.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var colyseus_1 = require("colyseus");
var stateHandler_1 = require("./stateHandler");
var Hub = /** @class */ (function (_super) {
    __extends(Hub, _super);
    function Hub() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.maxClients = 10;
        return _this;
    }
    //When room is initialized
    Hub.prototype.onInit = function (options) {
        this.setState(new stateHandler_1.StateHandler);
        this.setPatchRate(1000 / 20);
        this.setSimulationInterval(this.update.bind(this));
        console.log("hub room created!", options);
    };
    //When a client try to joins the room
    //If true client joins the room
    Hub.prototype.requestJoin = function (options) {
        console.log("request join!", options);
        return this.clients.length < this.maxClients;
    };
    //When a client joins the room
    Hub.prototype.onJoin = function (client) {
        this.state.addPlayer(client);
        console.log(client.id + " joined hub room.");
    };
    //When a client leaves the room
    Hub.prototype.onLeave = function (client) {
        this.state.removePlayer(client);
        console.log(client.id + " left hub room.");
    };
    //When a client send a message
    Hub.prototype.onMessage = function (client, data) {
        console.log("MovementRoom:", client.id, data);
    };
    //Cleanup callback, called after there are no more clients on the room
    Hub.prototype.onDispose = function () {
        console.log("Dispose hub Room");
    };
    Hub.prototype.update = function () {
        this.state.increaseCounter();
    };
    return Hub;
}(colyseus_1.Room));
exports.Hub = Hub;

});
___scope___.file("rooms/hub/stateHandler.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateHandler = /** @class */ (function () {
    function StateHandler() {
        this.players = {};
        this.counter = 0;
    }
    StateHandler.prototype.addPlayer = function (client) {
        console.log('added player');
    };
    StateHandler.prototype.removePlayer = function (client) {
        console.log('removed player');
    };
    StateHandler.prototype.increaseCounter = function () {
        this.counter++;
    };
    StateHandler.prototype.toJSON = function () {
        return {
            players: this.players,
            counter: this.counter
        };
    };
    return StateHandler;
}());
exports.StateHandler = StateHandler;

});
___scope___.file("rooms/battleroom/battleroom.js", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// BattleRoom.ts
var colyseus_1 = require("colyseus");
var BattleState_1 = require("./BattleState");
var BattleRoom = /** @class */ (function (_super) {
    __extends(BattleRoom, _super);
    function BattleRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BattleRoom.prototype.onInit = function (options) {
        console.log('RoomInit Start');
        this.setState(new BattleState_1.BattleState());
        this.setPatchRate(1000 / 40);
        this.setSimulationInterval(this.update.bind(this));
        this.state.addTeam(1, 'red');
        this.state.addTeam(2, 'blue');
        console.log(this.state);
        console.log('RoomInit End');
    };
    BattleRoom.prototype.onJoin = function (client) {
        this.state.addPlayer(client);
    };
    BattleRoom.prototype.onLeave = function (client) {
        this.state.removePlayer(client);
    };
    BattleRoom.prototype.onMessage = function (client, data) {
        this.state[data.action](client, data.payload);
        if (data.action == 'MOVE_PLAYER_TO') {
            //this.broadcast(data.payload);
            this.broadcast({
                playerId: "" + client.sessionId,
                action: "" + data.action,
                x: "" + data.payload.x,
                y: "" + data.payload.y,
                z: "" + data.payload.z
            });
        }
        /*
        if (data.action) {
          this.state.movePlayer(client, data.action);
        }
        */
    };
    BattleRoom.prototype.update = function () {
        //gets called every patch
    };
    BattleRoom.prototype.onDispose = function () {
        console.log('Dispose BattleRoom');
    };
    return BattleRoom;
}(colyseus_1.Room));
exports.BattleRoom = BattleRoom;

});
___scope___.file("rooms/battleroom/BattleState.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("../../models/Player");
var Team_1 = require("../../models/Team");
var actionTypes = require("./actionTypes");
var math3d_1 = require("math3d");
var BattleState = /** @class */ (function () {
    function BattleState() {
        this.players = {};
        this.teams = {};
    }
    BattleState.prototype.addPlayer = function (client) {
        this.players[client.sessionId] = Player_1.Player.generate();
    };
    BattleState.prototype.removePlayer = function (client) {
        delete this.players[client.sessionId];
    };
    BattleState.prototype.movePlayer = function (client, action) {
        if (action === "left") {
            this.players[client.sessionId].currentPosition.x -= 1;
        }
        else if (action === "right") {
            this.players[client.sessionId].currentPosition.x += 1;
        }
    };
    BattleState.prototype.addTeam = function (teamId, teamColor) {
        this.teams[teamId] = new Team_1.Team(teamColor, 0);
    };
    //actions
    BattleState.prototype[actionTypes.AUTO_ATTACK_ENTITY] = function (client, payload) {
        console.log('action: AUTO_ATTACK_ENTITY');
        //TODO
    };
    BattleState.prototype[actionTypes.CAST_ABILITY] = function (client, payload) {
        console.log('action: CAST_ABILITY');
        //TODO
    };
    BattleState.prototype[actionTypes.INTERACT] = function (client, payload) {
        console.log('action: INTERACT');
        //TODO
    };
    BattleState.prototype[actionTypes.JOIN_TEAM] = function (client, payload) {
        console.log('action: JOIN_TEAM');
        //TODO
    };
    BattleState.prototype[actionTypes.MOVE_PLAYER_TO] = function (client, _a) {
        var x = _a.x, y = _a.y, z = _a.z;
        console.log('action: MOVE_PLAYER_TO');
        console.log('Log: x: ' + x + ' y: ' + y + ' z: ' + z);
        this.players[client.sessionId].moveTo = new math3d_1.Vector3(x, y, z);
    };
    BattleState.prototype[actionTypes.SEND_MESSAGE] = function (client, payload) {
        console.log('action: SEND_MESSAGE');
        //TODO
    };
    BattleState.prototype[actionTypes.SEND_EMOTION] = function (client, payload) {
        console.log('action: SEND_EMOTION');
        //TODO
    };
    BattleState.prototype[actionTypes.SEND_PING] = function (client, payload) {
        console.log('action: SEND_PING');
        //TODO
    };
    BattleState.prototype[actionTypes.SET_PLAYER_POSITION] = function (client, _a) {
        var x = _a.x, y = _a.y, z = _a.z;
        console.log('action: SET_PLAYER_POSITION');
        this.players[client.sessionId].currentPosition = new math3d_1.Vector3(x, y, z);
    };
    BattleState.prototype[actionTypes.SWITCH_TEAMS] = function (client, payload) {
        console.log('action: SWITCH_TEAMS');
        //TODO
    };
    BattleState.prototype[actionTypes.USE_ITEM] = function (client, payload) {
        console.log('action: USE_ITEM');
        //TODO
    };
    return BattleState;
}());
exports.BattleState = BattleState;

});
___scope___.file("models/Player.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Player.ts
var math3d_1 = require("math3d");
var Player = /** @class */ (function () {
    function Player(hp, name, team, energy, energyRegenerationSpeed, moveSpeed, xp, currentPosition, moveTo) {
        this.hp = hp;
        this.name = name;
        this.team = team;
        this.energy = energy;
        this.energyRegenerationSpeed = energyRegenerationSpeed;
        this.moveSpeed = moveSpeed;
        this.xp = xp;
        this.currentPosition = currentPosition;
        this.moveTo = moveTo;
        this.hp = hp;
        this.name = name;
        this.team = team;
        this.energy = energy;
        this.energyRegenerationSpeed = energyRegenerationSpeed;
        this.moveSpeed = moveSpeed;
        this.xp = xp;
        this.currentPosition = currentPosition;
        this.moveTo = moveTo;
    }
    Player.generate = function () {
        return new Player(100, //hp
        'Player', //name
        '1', //team
        20, //energy
        3, //energyRegenerationSpeed
        5, //moveSpeed
        0, //xp
        new math3d_1.Vector3(), //currentPosition
        new math3d_1.Vector3());
    };
    return Player;
}());
exports.Player = Player;

});
___scope___.file("models/Team.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Team.ts
var Team = /** @class */ (function () {
    function Team(color, score) {
        this.color = color;
        this.score = score;
        this.color = color;
        this.score = score;
    }
    return Team;
}());
exports.Team = Team;

});
___scope___.file("rooms/battleroom/actionTypes.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//A
exports.AUTO_ATTACK_ENTITY = 'AUTO_ATTACK_ENTITY';
//B
//C
exports.CAST_ABILITY = 'CAST_ABILITY';
//D
//E
//F
//G
//H
//I
exports.INTERACT = 'INTERACT';
//J
exports.JOIN_TEAM = 'JOIN_TEAM';
//K
//L
//M
exports.MOVE_PLAYER_TO = 'MOVE_PLAYER_TO';
//N
//O
//P
//Q
//R
//S
exports.SEND_MESSAGE = 'SEND_MESSAGE';
exports.SEND_EMOTION = 'SEND_EMOTION';
exports.SEND_PING = 'SEND_PING';
exports.SET_PLAYER_POSITION = 'SET_PLAYER_POSITION';
exports.SWITCH_TEAMS = 'SWITCH_TEAMS';
//T
//U
exports.USE_ITEM = 'USE_ITEM';
//V
//W
//X
//Y
//Z

});
return ___scope___.entry = "index.ts";
});
FuseBox.target = "universal"

FuseBox.import("default/index.js");
FuseBox.main("default/index.js");
})
(function(e){function r(e){var r=e.charCodeAt(0),n=e.charCodeAt(1);if((p||58!==n)&&(r>=97&&r<=122||64===r)){if(64===r){var t=e.split("/"),i=t.splice(2,t.length).join("/");return[t[0]+"/"+t[1],i||void 0]}var o=e.indexOf("/");if(o===-1)return[e];var a=e.substring(0,o),u=e.substring(o+1);return[a,u]}}function n(e){return e.substring(0,e.lastIndexOf("/"))||"./"}function t(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var o=[],t=0,i=n.length;t<i;t++){var a=n[t];a&&"."!==a&&(".."===a?o.pop():o.push(a))}return""===n[0]&&o.unshift(""),o.join("/")||(o.length?"/":".")}function i(e){var r=e.match(/\.(\w{1,})$/);return r&&r[1]?e:e+".js"}function o(e){if(p){var r,n=document,t=n.getElementsByTagName("head")[0];/\.css$/.test(e)?(r=n.createElement("link"),r.rel="stylesheet",r.type="text/css",r.href=e):(r=n.createElement("script"),r.type="text/javascript",r.src=e,r.async=!0),t.insertBefore(r,t.firstChild)}}function a(e,r){for(var n in e)e.hasOwnProperty(n)&&r(n,e[n])}function u(e){return{server:require(e)}}function f(e,n){var o=n.path||"./",a=n.pkg||"default",f=r(e);if(f&&(o="./",a=f[0],n.v&&n.v[a]&&(a=a+"@"+n.v[a]),e=f[1]),e)if(126===e.charCodeAt(0))e=e.slice(2,e.length),o="./";else if(!p&&(47===e.charCodeAt(0)||58===e.charCodeAt(1)))return u(e);var s=g[a];if(!s){if(p&&"electron"!==x.target)throw"Package not found "+a;return u(a+(e?"/"+e:""))}e=e?e:"./"+s.s.entry;var l,c=t(o,e),d=i(c),v=s.f[d];return!v&&d.indexOf("*")>-1&&(l=d),v||l||(d=t(c,"/","index.js"),v=s.f[d],v||"."!==c||(d=s.s&&s.s.entry||"index.js",v=s.f[d]),v||(d=c+".js",v=s.f[d]),v||(v=s.f[c+".jsx"]),v||(d=c+"/index.jsx",v=s.f[d])),{file:v,wildcard:l,pkgName:a,versions:s.v,filePath:c,validPath:d}}function s(e,r,n){if(void 0===n&&(n={}),!p)return r(/\.(js|json)$/.test(e)?v.require(e):"");if(n&&n.ajaxed===e)return console.error(e,"does not provide a module");var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(200==i.status){var n=i.getResponseHeader("Content-Type"),o=i.responseText;/json/.test(n)?o="module.exports = "+o:/javascript/.test(n)||(o="module.exports = "+JSON.stringify(o));var a=t("./",e);x.dynamic(a,o),r(x.import(e,{ajaxed:e}))}else console.error(e,"not found on request"),r(void 0)},i.open("GET",e,!0),i.send()}function l(e,r){var n=h[e];if(n)for(var t in n){var i=n[t].apply(null,r);if(i===!1)return!1}}function c(e,r){if(void 0===r&&(r={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return o(e);var t=f(e,r);if(t.server)return t.server;var i=t.file;if(t.wildcard){var a=new RegExp(t.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@@/g,".*").replace(/@/g,"[a-z0-9$_-]+"),"i"),u=g[t.pkgName];if(u){var d={};for(var m in u.f)a.test(m)&&(d[m]=c(t.pkgName+"/"+m));return d}}if(!i){var h="function"==typeof r,x=l("async",[e,r]);if(x===!1)return;return s(e,function(e){return h?r(e):null},r)}var _=t.pkgName;if(i.locals&&i.locals.module)return i.locals.module.exports;var y=i.locals={},w=n(t.validPath);y.exports={},y.module={exports:y.exports},y.require=function(e,r){return c(e,{pkg:_,path:w,v:t.versions})},p||!v.require.main?y.require.main={filename:"./",paths:[]}:y.require.main=v.require.main;var j=[y.module.exports,y.require,y.module,t.validPath,w,_];return l("before-import",j),i.fn.apply(0,j),l("after-import",j),y.module.exports}if(e.FuseBox)return e.FuseBox;var d="undefined"!=typeof WorkerGlobalScope,p="undefined"!=typeof window&&window.navigator||d,v=p?d?{}:window:global;p&&(v.global=d?{}:window),e=p&&"undefined"==typeof __fbx__dnm__?e:module.exports;var m=p?d?{}:window.__fsbx__=window.__fsbx__||{}:v.$fsbx=v.$fsbx||{};p||(v.require=require);var g=m.p=m.p||{},h=m.e=m.e||{},x=function(){function r(){}return r.global=function(e,r){return void 0===r?v[e]:void(v[e]=r)},r.import=function(e,r){return c(e,r)},r.on=function(e,r){h[e]=h[e]||[],h[e].push(r)},r.exists=function(e){try{var r=f(e,{});return void 0!==r.file}catch(e){return!1}},r.remove=function(e){var r=f(e,{}),n=g[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},r.main=function(e){return this.mainFile=e,r.import(e,{})},r.expose=function(r){var n=function(n){var t=r[n].alias,i=c(r[n].pkg);"*"===t?a(i,function(r,n){return e[r]=n}):"object"==typeof t?a(t,function(r,n){return e[n]=i[r]}):e[t]=i};for(var t in r)n(t)},r.dynamic=function(r,n,t){this.pkg(t&&t.pkg||"default",{},function(t){t.file(r,function(r,t,i,o,a){var u=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);u(!0,r,t,i,o,a,e)})})},r.flush=function(e){var r=g.default;for(var n in r.f)e&&!e(n)||delete r.f[n].locals},r.pkg=function(e,r,n){if(g[e])return n(g[e].s);var t=g[e]={};return t.f={},t.v=r,t.s={file:function(e,r){return t.f[e]={fn:r}}},n(t.s)},r.addPlugin=function(e){this.plugins.push(e)},r.packages=g,r.isBrowser=p,r.isServer=!p,r.plugins=[],r}();return p||(v.FuseBox=x),e.FuseBox=x}(this))