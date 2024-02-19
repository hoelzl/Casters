"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectActionWithProperty = void 0;
const skipTurnAction_1 = require("../actions/skipTurnAction");
const utils_1 = require("../core/utils");
class SelectActionWithProperty {
    constructor() {
        this.actionPredicate = this.actionPredicate.bind(this);
    }
    get isInteractive() {
        return false;
    }
    selectAction(_player, actions) {
        if (actions.length === 0) {
            return Promise.resolve(new skipTurnAction_1.SkipTurnAction());
        }
        let aggressiveActions = actions.filter(this.actionPredicate);
        return Promise.resolve((0, utils_1.getRandomElement)(aggressiveActions?.length ? aggressiveActions : actions));
    }
}
exports.SelectActionWithProperty = SelectActionWithProperty;
//# sourceMappingURL=selectActionWithProperty.js.map