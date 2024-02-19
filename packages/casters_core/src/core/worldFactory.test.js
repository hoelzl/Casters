"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const worldFactory_1 = require("./worldFactory");
const globals_1 = require("@jest/globals");
const world_1 = require("./world");
const minimalGameData = __importStar(require("../data/minimalGame.json"));
const simpleGameData = __importStar(require("../data/simpleGame.json"));
const minimalGameJsonString = `
{
  "locations": [
    { "name": "Room 1" },
    { "name": "Room 2" }
  ]
}
`;
const simpleGameJsonString = `
{
  "initialLocation": "Room 1",
  "locations": [
    {
      "name": "Room 1",
      "description": "You are in a bright room. There is a door to the north.",
      "connections": [
        {
          "direction": "north",
          "destination": "Room 2"
        }
      ]
    },
    {
      "name": "Room 2",
      "description": "You are in a dark room. There is a door to the south.",
      "connections": [
        {
          "direction": "south",
          "destination": "Room 1"
        }
      ]
    }
  ]
}
`;
function checkSingleConnection(connections, direction, destination) {
    (0, globals_1.expect)(connections.length).toBe(1);
    (0, globals_1.expect)(connections[0].direction).toBe(direction);
    (0, globals_1.expect)(connections[0].destination).toBe(destination);
}
(0, globals_1.describe)("createGameDataFromString(minimalGameJsonString)", () => {
    (0, globals_1.test)("returns correct initial location", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(minimalGameJsonString);
        (0, globals_1.expect)(gameData.initialLocationName).toBe("Room 1");
    });
    (0, globals_1.test)("returns correct location names", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(minimalGameJsonString);
        (0, globals_1.expect)(gameData.locationData.length).toBe(2);
        (0, globals_1.expect)(gameData.locationData[0].name).toBe("Room 1");
        (0, globals_1.expect)(gameData.locationData[1].name).toBe("Room 2");
    });
    (0, globals_1.test)("handles empty description correctly", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(minimalGameJsonString);
        (0, globals_1.expect)(gameData.locationData[0].description).toBe("");
    });
    (0, globals_1.test)("handles empty connections correctly", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(minimalGameJsonString);
        (0, globals_1.expect)(gameData.locationData[0].connections).toEqual([]);
    });
    (0, globals_1.test)("handles empty items correctly", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(minimalGameJsonString);
        (0, globals_1.expect)(gameData.locationData[0].items).toEqual([]);
    });
});
(0, globals_1.describe)("createGameDataFromString(simpleGameJsonString)", () => {
    (0, globals_1.test)("returns correct initial location", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(simpleGameJsonString);
        (0, globals_1.expect)(gameData.initialLocationName).toBe("Room 1");
    });
    (0, globals_1.test)("returns correct basic location data", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(simpleGameJsonString);
        (0, globals_1.expect)(gameData.locationData.length).toBe(2);
        (0, globals_1.expect)(gameData.locationData[0].name).toBe("Room 1");
        (0, globals_1.expect)(gameData.locationData[0].description).toContain("bright room");
        (0, globals_1.expect)(gameData.locationData[0].items).toHaveLength(0);
        (0, globals_1.expect)(gameData.locationData[1].name).toBe("Room 2");
        (0, globals_1.expect)(gameData.locationData[1].description).toContain("dark room");
        (0, globals_1.expect)(gameData.locationData[1].items).toHaveLength(0);
    });
    (0, globals_1.test)("returns correct connections for first location", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(simpleGameJsonString);
        let location = gameData.locationData[0];
        let connections = location.connections;
        checkSingleConnection(connections, "north", "Room 2");
    });
    (0, globals_1.test)("returns correct connections for second location", () => {
        const gameData = (0, worldFactory_1.createGameDataFromString)(simpleGameJsonString);
        let location = gameData.locationData[1];
        let connections = location.connections;
        checkSingleConnection(connections, "south", "Room 1");
    });
});
function testsForMinimalGame(creator) {
    return () => {
        (0, globals_1.test)("creates World instance", () => {
            const world = creator();
            (0, globals_1.expect)(world).toBeInstanceOf(world_1.World);
        });
        (0, globals_1.test)("has correct initial location name", () => {
            const world = creator();
            (0, globals_1.expect)(world.initialLocationName).toBe("Room 1");
        });
        (0, globals_1.test)("has correct locations", () => {
            const world = creator();
            (0, globals_1.expect)(world.locationMap.size).toBe(2);
            let room1 = world.getLocation("Room 1");
            (0, globals_1.expect)(room1.description).toBe("");
            let room2 = world.getLocation("Room 2");
            (0, globals_1.expect)(room2.description).toBe("");
        });
        (0, globals_1.test)("has correct connections", () => {
            const world = creator();
            let room1 = world.getLocation("Room 1");
            let room2 = world.getLocation("Room 2");
            (0, globals_1.expect)(room1.exits.size).toBe(0);
            (0, globals_1.expect)(room2.exits.size).toBe(0);
        });
    };
}
(0, globals_1.describe)("createWorldFromString(minimalGameJsonString)", testsForMinimalGame(() => (0, worldFactory_1.createWorldFromString)(minimalGameJsonString)));
(0, globals_1.describe)("createWorldFromJsonData(minimalGameData)", testsForMinimalGame(() => (0, worldFactory_1.createWorldFromJsonData)(minimalGameData)));
function testsForSimpleGame(creator) {
    return () => {
        (0, globals_1.test)("creates World instance", () => {
            const world = creator();
            (0, globals_1.expect)(world).toBeInstanceOf(world_1.World);
        });
        (0, globals_1.test)("has correct initial location name", () => {
            const world = creator();
            (0, globals_1.expect)(world.initialLocationName).toBe("Room 1");
        });
        (0, globals_1.test)("has correct locations", () => {
            const world = creator();
            (0, globals_1.expect)(world.locationMap.size).toBe(2);
            let room1 = world.getLocation("Room 1");
            (0, globals_1.expect)(room1.description).toContain("bright room");
            let room2 = world.getLocation("Room 2");
            (0, globals_1.expect)(room2.description).toContain("dark room");
        });
        (0, globals_1.test)("has correct connections", () => {
            const world = creator();
            let room1 = world.getLocation("Room 1");
            let room2 = world.getLocation("Room 2");
            (0, globals_1.expect)(room1.exits.size).toBe(1);
            (0, globals_1.expect)(room1.exits.get("north")).toBe(room2);
            (0, globals_1.expect)(room2.exits.size).toBe(1);
            (0, globals_1.expect)(room2.exits.get("south")).toBe(room1);
        });
    };
}
(0, globals_1.describe)("createWorldFromString(simpleGameJsonString)", testsForSimpleGame(() => (0, worldFactory_1.createWorldFromString)(simpleGameJsonString)));
(0, globals_1.describe)("createWorldFromJsonData(simpleGameData)", testsForSimpleGame(() => (0, worldFactory_1.createWorldFromJsonData)(simpleGameData)));
//# sourceMappingURL=worldFactory.test.js.map