import {World} from "./world.js";
import {Location} from "./location.js";

type LocationJson = {
    name: string,
    description: string,
    connections: [string, string][],
    items: object,
}

function updateLocationExits(locationDescriptions: LocationJson[], locations: Map<string, Location>) {
    for (let ld of locationDescriptions) {
        let location = locations.get(ld["name"]);
        if (!location) {
            throw new Error(`Location ${ld["name"]} not found`);
        }
        for (let [direction, destination] of ld["connections"]) {
            let destLoc = locations.get(destination);
            if (!destLoc) {
                throw new Error(`Destination location ${destination} not found`);
            }
            location.exits.set(direction, destLoc);
        }
    }
}

export function createWorld(gameJson: string): World {
    let gameData: { locations: LocationJson[], initialLocation?: string } = JSON.parse(gameJson);
    let locationDescriptions = gameData["locations"];
    let initialLocationName = gameData["initialLocation"] ?? locationDescriptions[0]["name"];
    let locations = new Map<string, Location>();
    for (let ld of locationDescriptions) {
        locations.set(ld["name"], new Location(ld["name"], ld["description"]));
    }
    updateLocationExits(locationDescriptions, locations);
    return new World(initialLocationName, locations);
}
