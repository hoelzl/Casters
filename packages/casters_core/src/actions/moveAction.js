"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveAction = void 0;
const action_1 = require("../core/action");
const utils_1 = require("../core/utils");
class MoveAction {
    direction;
    constructor(direction) {
        this.direction = direction;
        this._direction = direction;
    }
    get description() {
        return `Move ${this._direction}.`;
    }
    get shortDescription() {
        return `Move ${(0, utils_1.capitalizeFirstLetter)(this._direction)}`;
    }
    get tags() {
        return new Set([action_1.ActionTag.Movement]);
    }
    async perform(player) {
        let newLocation = player.location.getExit(this._direction);
        player.moveToLocation(newLocation);
    }
    _direction;
}
exports.MoveAction = MoveAction;
//# sourceMappingURL=moveAction.js.map