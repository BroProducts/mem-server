// map4.ts
var map = {
  mapName: "map4",

  gameMode: "conquest",

  numberOfPlayers: 24,

  teams: [
    {
      id: 1,
      color: "red"
    },
    {
      id: 2,
      color: "blue"
    }
  ],

  spawns: [
    {
      position: {
        x: -30,
        y: 2.02,
        z: 0
      },
      team: 1,
    },
    {
      position: {
        x: -110,
        y: 0,
        z: 0
      },
      team: 2,
    }
  ],

  caputrePoints: [
    {
      position: {
        x: 10,
        y: 0,
        z: 20
      },
      isSpawn: false,
      radius: 9,
      team: null,
    },
    {
      position: {
        x: 10,
        y: 0,
        z: -20
      },
      isSpawn: false,
      radius: 9,
      team: null,
    },
    {
      position: {
        x: -30,
        y: 0,
        z: -80
      },
      isSpawn: false,
      radius: 9,
      team: null,
    },
    {
      position: {
        x: -30,
        y: 0,
        z: 80
      },
      isSpawn: false,
      radius: 9,
      team: null,
    },
    {
      position: {
        x: 70,
        y: 0,
        z: 0
      },
      isSpawn: false,
      radius: 9,
      team: null,
    },
    {
      position: {
        x: 70,
        y: 0,
        z: -60
      },
      isSpawn: true,
      radius: 9,
      team: null,
    },
    {
      position: {
        x: 70,
        y: 0,
        z: 60
      },
      isSpawn: true,
      radius: 9,
      team: null,
    }
  ],

  teleporters: [
    {
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
      team: null,
    },
    {
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
      team: null,
    }
  ],
}
export default map;
