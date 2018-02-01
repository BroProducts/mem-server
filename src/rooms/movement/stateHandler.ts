export class StateHandler {
  players: any
  counter: number
  constructor () {
    this.players = {}
    this.counter = 0
  }

  addPlayer (client) {
    console.log('added player')
  }


  removePlayer (client) {
    console.log('removed player')
  }

  increaseCounter () {
    this.counter++
  }

  toJSON () {
    return {
      players: this.players,
      counter: this.counter
    }
  }
}
