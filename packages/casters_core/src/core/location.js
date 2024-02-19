"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
class Location {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._exits = new Map();
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get exits() {
        return this._exits;
    }
    getExit(name) {
        let exit = this._exits.get(name);
        if (!exit) {
            throw new Error(`Exit '${name}' does not exist.`);
        }
        return exit;
    }
    // noinspection JSUnusedGlobalSymbols
    addExit(direction, location) {
        this._exits.set(direction, location);
    }
    _name;
    _description;
    _exits;
}
exports.Location = Location;
//# sourceMappingURL=location.js.map