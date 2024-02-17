import {Location} from "./location.js";

export class World {
    constructor(initialLocationName: string, locations: Map<string, Location>) {
        this._initialLocationName = initialLocationName;
        this._locationMap = locations;
    }

    get initialLocationName(): string {
        return this._initialLocationName;
    }

    get initialLocation(): Location {
        return this.getLocation(this._initialLocationName);
    }

    get locationMap(): Map<string, Location> {
        return this._locationMap;
    }

    getLocation(name: string): Location {
        let location = this._locationMap.get(name);
        if (!location) {
            throw new Error(`Location ${name} not found`);
        }
        return location;
    }

    private _locationMap: Map<string, Location>;
    private _initialLocationName: string;
}
