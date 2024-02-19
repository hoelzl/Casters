"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
class World {
    constructor(initialLocationName, locations) {
        this._initialLocationName = initialLocationName;
        this._locationMap = locations;
    }
    get initialLocationName() {
        return this._initialLocationName;
    }
    // noinspection JSUnusedGlobalSymbols
    get initialLocation() {
        return this.getLocation(this._initialLocationName);
    }
    get locationMap() {
        return this._locationMap;
    }
    getLocation(name) {
        let location = this._locationMap.get(name);
        if (!location) {
            throw new Error(`Location ${name} not found`);
        }
        return location;
    }
    // noinspection JSUnusedGlobalSymbols
    addLocation(location) {
        if (this._locationMap.has(location.name)) {
            throw new Error(`Location ${location.name} already exists`);
        }
        this._locationMap.set(location.name, location);
    }
    _locationMap;
    _initialLocationName;
}
exports.World = World;
//# sourceMappingURL=world.js.map