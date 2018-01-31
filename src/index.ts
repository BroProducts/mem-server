import * as express from 'express';
import { createServer } from 'http';
import { Server } from 'colyseus';

import { Hub } from "./rooms/hub/hub";
import { ChatRoom } from "./rooms/chatRoom/chatRoom";

const port = Number(process.env.PORT || 2657);
const app = express();

// Create HTTP Server
const httpServer = createServer(app);

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({ server: httpServer });

// Register HubRoom as "hub"
gameServer.register("chat", ChatRoom);

gameServer.register("basic_with_options", Hub, {
    custom_options: "you can use me on Room#onInit"
});

gameServer.listen(port);

console.log(`Listening on http://localhost:${ port }`);
