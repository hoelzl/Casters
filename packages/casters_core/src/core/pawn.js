"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
class Pawn {
    _name;
    _location;
    constructor(_name, location) {
        this._name = _name;
        this._location = location;
    }
    get name() {
        return this._name;
    }
    get location() {
        return this._location;
    }
    moveToLocation(location) {
        this._location = location;
    }
}
exports.Pawn = Pawn;
//# sourceMappingURL=pawn.js.map