import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';

// Import Rooms
import { Hub } from "./rooms/hub/hub";
import { BattleRoom } from "./rooms/battleroom/battleroom";

const port = Number(process.env.PORT || 2657);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register Rooms
gameServer.register("hub", Hub);
gameServer.register("battleroom", BattleRoom);

gameServer.listen(port);

console.log(`Listening on http://localhost:${ port }`);
