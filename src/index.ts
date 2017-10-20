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
