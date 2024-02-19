"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipTurnAction = void 0;
const action_1 = require("../core/action");
class SkipTurnAction {
    get description() {
        return "Do nothing during the current turn.";
    }
    get shortDescription() {
        return "Skip Turn";
    }
    get tags() {
        return new Set([action_1.ActionTag.SkipTurn]);
    }
    async perform(_player) {
        // Do nothing.
    }
}
exports.SkipTurnAction = SkipTurnAction;
//# sourceMappingURL=skipTurnAction.js.map