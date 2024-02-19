"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAllDefaultActions = void 0;
const action_1 = require("../core/action");
const errorAction_1 = require("./errorAction");
const investigateAction_1 = require("./investigateAction");
const quitAction_1 = require("./quitAction");
const skipTurnAction_1 = require("./skipTurnAction");
const allDefaultActionTypes = [
    investigateAction_1.InvestigateAction,
    quitAction_1.QuitAction,
    skipTurnAction_1.SkipTurnAction,
    errorAction_1.ErrorAction,
];
let defaultActionsRegistered = false;
function registerAllDefaultActions() {
    if (defaultActionsRegistered) {
        return;
    }
    for (const actionType of allDefaultActionTypes) {
        (0, action_1.registerDefaultAction)(new actionType());
    }
    defaultActionsRegistered = true;
}
exports.registerAllDefaultActions = registerAllDefaultActions;
//# sourceMappingURL=registerDefaultActions.js.map