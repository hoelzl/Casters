"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorldFromJsonData = exports.createWorldFromString = exports.createWorldFromGameData = exports.createGameDataFromString = void 0;
const world_1 = require("./world");
const location_1 = require("./location");
function convertRawGameDataToGameData(rawGameData) {
    return {
        locationData: rawGameData.locations.map((ld) => ({
            name: ld.name,
            description: ld.description ?? "",
            connections: ld.connections ?? [],
            items: ld.items ?? [],
        })),
        initialLocationName: rawGameData.initialLocation || rawGameData.locations[0].name,
    };
}
function createGameDataFromString(gameJson) {
    let rawGameData = JSON.parse(gameJson);
    return convertRawGameDataToGameData(rawGameData);
}
exports.createGameDataFromString = createGameDataFromString;
function createLocations(locationDescriptions) {
    let locations = new Map();
    for (let ld of locationDescriptions) {
        locations.set(ld["name"], new location_1.Location(ld["name"], ld["description"]));
    }
    return locations;
}
function updateLocationExits(locations, locationData) {
    for (let ld of locationData) {
        let location = locations.get(ld["name"]);
        if (!location) {
            throw new Error(`Location ${ld["name"]} not found`);
        }
        for (let { direction, destination } of ld["connections"]) {
            let destLoc = locations.get(destination);
            if (!destLoc) {
                throw new Error(`Destination location ${destination} not found`);
            }
            location.exits.set(direction, destLoc);
        }
    }
}
function createWorldFromGameData(gameData) {
    let locations = createLocations(gameData.locationData);
    updateLocationExits(locations, gameData.locationData);
    return new world_1.World(gameData.initialLocationName, locations);
}
exports.createWorldFromGameData = createWorldFromGameData;
function createWorldFromString(gameJson) {
    const gameData = createGameDataFromString(gameJson);
    return createWorldFromGameData(gameData);
}
exports.createWorldFromString = createWorldFromString;
function createWorldFromJsonData(rawGameData) {
    const gameData = convertRawGameDataToGameData(rawGameData);
    return createWorldFromGameData(gameData);
}
exports.createWorldFromJsonData = createWorldFromJsonData;
//# sourceMappingURL=worldFactory.js.map