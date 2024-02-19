"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAggressiveAction = void 0;
const action_1 = require("../core/action");
const selectActionWithProperty_1 = require("./selectActionWithProperty");
class SelectAggressiveAction extends selectActionWithProperty_1.SelectActionWithProperty {
    actionPredicate(a) {
        return a.tags.has(action_1.ActionTag.Aggressive);
    }
}
exports.SelectAggressiveAction = SelectAggressiveAction;
//# sourceMappingURL=selectAggressiveAction.js.map