"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipTurnStrategy = void 0;
const skipTurnAction_1 = require("../actions/skipTurnAction");
class SkipTurnStrategy {
    get isInteractive() {
        return false;
    }
    selectAction(_player, _actions) {
        return Promise.resolve(new skipTurnAction_1.SkipTurnAction());
    }
}
exports.SkipTurnStrategy = SkipTurnStrategy;
//# sourceMappingURL=skipTurnStrategy.js.map