import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Server } from "colyseus";

const app = new express();
const gameServer = new Server();
gameServer.attach({ server: app });

import { Hub } from "./rooms/hub/hub";

// Register Hub as "hub"
gameServer.register('hub', Hub)
console.log('hub register')



/* Old Cluster Server
import * as cluster from 'cluster'
import * as express from 'express'
import { ClusterServer } from 'colyseus'

// Require Hub handler
import { Hub } from './rooms/hub/hub'

const port = Number(process.env.PORT || 2657)
const gameServer = new ClusterServer();

// Register Hub as "hub"
gameServer.register('hub', Hub)

if(cluster.isMaster) {
  gameServer.listen(port);
  gameServer.fork()
} else {
  let app = new express();
  app.get("/something", function (req, res) {
      console.log("something!", process.pid);
      res.send("Hey!");
  });

  // Create HTTP Server
  gameServer.attach({ server: app });
}

console.log(`Listening all the time on http://localhost:${ port }`)
*/
