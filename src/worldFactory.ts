import { World } from "./world";
import { Location } from "./location";

export type ConnectionData = {
  direction: string;
  destination: string;
};

export type ItemData = {
  kind: string;
  name?: string;
  description?: string;
  contents?: ItemData[];
};

export type RawLocationData = {
  name: string;
  description?: string;
  connections?: ConnectionData[];
  items?: ItemData[];
};

export type RawGameData = {
  locations: RawLocationData[];
  initialLocation?: string;
};

export type LocationData = {
  name: string;
  description: string;
  connections: ConnectionData[];
  items: ItemData[];
};

export type GameData = {
  locationData: LocationData[];
  initialLocationName: string;
};

function convertRawGameDataToGameData(rawGameData: RawGameData): GameData {
  return {
    locationData: rawGameData.locations.map((ld) => ({
      name: ld.name,
      description: ld.description ?? "",
      connections: ld.connections ?? [],
      items: ld.items ?? [],
    })),
    initialLocationName:
      rawGameData.initialLocation || rawGameData.locations[0].name,
  };
}

export function createGameDataFromString(gameJson: string): GameData {
  let rawGameData: RawGameData = JSON.parse(gameJson);
  return convertRawGameDataToGameData(rawGameData);
}

function createLocations(
  locationDescriptions: LocationData[],
): Map<string, Location> {
  let locations = new Map<string, Location>();
  for (let ld of locationDescriptions) {
    locations.set(ld["name"], new Location(ld["name"], ld["description"]));
  }
  return locations;
}

function updateLocationExits(
  locations: Map<string, Location>,
  locationData: LocationData[],
) {
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

export function createWorldFromGameData(gameData: GameData): World {
  let locations = createLocations(gameData.locationData);
  updateLocationExits(locations, gameData.locationData);
  return new World(gameData.initialLocationName, locations);
}

export function createWorldFromString(gameJson: string): World {
  const gameData = createGameDataFromString(gameJson);
  return createWorldFromGameData(gameData);
}

export function createWorldFromJsonData(rawGameData: RawGameData): World {
  const gameData = convertRawGameDataToGameData(rawGameData);
  return createWorldFromGameData(gameData);
}