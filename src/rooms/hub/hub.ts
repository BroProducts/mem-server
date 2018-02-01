import { Room } from 'colyseus';
import { StateHandler } from './stateHandler'

export class Hub extends Room {

    maxClients = 10;

    //When room is initialized
    onInit (options) {
        this.setState(new StateHandler)
        this.setPatchRate( 1000 / 20 );
        this.setSimulationInterval( this.update.bind(this) );

        console.log("hub room created!", options);
    }

    //When a client try to joins the room
    //If true client joins the room
    requestJoin(options) {
      console.log("request join!", options);

      return this.clients.length < this.maxClients
    }

    //When a client joins the room
    onJoin (client) {
        this.state.addPlayer(client)
        console.log(`${ client.id } joined hub room.`)
    }

    //When a client leaves the room
    onLeave (client) {
        this.state.removePlayer(client)
        console.log(`${ client.id } left hub room.`)
    }

    //When a client send a message
    onMessage (client, data) {
        console.log("MovementRoom:", client.id, data)
    }

    //Cleanup callback, called after there are no more clients on the room
    onDispose () {
        console.log("Dispose hub Room")
    }

    update () {
      this.state.increaseCounter()
    }
}
