// map4.ts
var map = {
  mapName: "map4",

  gameMode: "conquest",

  numberOfPlayers: 24,

  maxScore: 500,

  teams: [
    {
      id: "1",
      color: "red",
      score: 0
    },
    {
      id: "2",
      color: "blue",
      score: 0
    }
  ],

  spawns: [
    {
      id: "1",
      position: {
        x: -30.01,
        y: 2.02,
        z: 0
      },
      team: "1",
    },
    {
      id: "2",
      position: {
        x: -110,
        y: 0,
        z: 0
      },
      team: "2",
    }
  ],

  caputrePoints: [
    {
      id: "1",
      position: {
        x: 10,
        y: 0,
        z: 20
      },
      isSpawn: false,
      radius: 9,
      team: null,
      takenTo: 0,
    },
    {
      id: "2",
      position: {
        x: 10,
        y: 0,
        z: -20
      },
      isSpawn: false,
      radius: 9,
      team: null,
      takenTo: 0,
    },
    {
      id: "3",
      position: {
        x: -30,
        y: 0,
        z: -80
      },
      isSpawn: false,
      radius: 9,
      team: null,
      takenTo: 0,
    },
    {
      id: "4",
      position: {
        x: -30,
        y: 0,
        z: 80
      },
      isSpawn: false,
      radius: 9,
      team: null,
      takenTo: 0,
    },
    {
      id: "5",
      position: {
        x: 70,
        y: 0,
        z: 0
      },
      isSpawn: false,
      radius: 9,
      team: null,
      takenTo: 0,
    },
    {
      id: "6",
      position: {
        x: 70,
        y: 0,
        z: -60
      },
      isSpawn: true,
      radius: 9,
      team: null,
      takenTo: 0,
    },
    {
      id: "7",
      position: {
        x: 70,
        y: 0,
        z: 60
      },
      isSpawn: true,
      radius: 9,
      team: null,
      takenTo: 0,
    }
  ],

  teleporters: [
    {
      id: "1",
      startPosition: {
        x: -110,
        y: 0,
        z: 20
      },
      endPosition: {
        x: -70,
        y: 0,
        z: 80
      },
      radius: 1,
      team: "2",
    },
    {
      id: "2",
      startPosition: {
        x: -110,
        y: 0,
        z: -20
      },
      endPosition: {
        x: -70,
        y: 0,
        z: -80
      },
      radius: 1,
      team: "2",
    }
  ],
}
export default map;
