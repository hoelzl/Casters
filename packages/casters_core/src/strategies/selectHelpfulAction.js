"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectHelpfulAction = void 0;
const action_1 = require("../core/action");
const selectActionWithProperty_1 = require("./selectActionWithProperty");
class SelectHelpfulAction extends selectActionWithProperty_1.SelectActionWithProperty {
    actionPredicate(a) {
        return a.tags.has(action_1.ActionTag.Helpful);
    }
}
exports.SelectHelpfulAction = SelectHelpfulAction;
//# sourceMappingURL=selectHelpfulAction.js.map