"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultActions = exports.registerDefaultAction = exports.ActionTag = void 0;
// noinspection JSUnusedGlobalSymbols
var ActionTag;
(function (ActionTag) {
    // Action types
    ActionTag[ActionTag["Movement"] = 0] = "Movement";
    ActionTag[ActionTag["Interaction"] = 1] = "Interaction";
    ActionTag[ActionTag["Investigation"] = 2] = "Investigation";
    ActionTag[ActionTag["Rest"] = 3] = "Rest";
    // Player disposition
    ActionTag[ActionTag["Aggressive"] = 4] = "Aggressive";
    ActionTag[ActionTag["Defensive"] = 5] = "Defensive";
    ActionTag[ActionTag["Helpful"] = 6] = "Helpful";
    // Meta actions
    ActionTag[ActionTag["SkipTurn"] = 7] = "SkipTurn";
    ActionTag[ActionTag["Quit"] = 8] = "Quit";
    ActionTag[ActionTag["Save"] = 9] = "Save";
    // Action Properties
    ActionTag[ActionTag["InteractiveOnly"] = 10] = "InteractiveOnly";
    ActionTag[ActionTag["Error"] = 11] = "Error";
    ActionTag[ActionTag["TestOnly"] = 12] = "TestOnly";
    // Size of set for action tags
    ActionTag[ActionTag["ActionTagCount"] = 13] = "ActionTagCount";
})(ActionTag || (exports.ActionTag = ActionTag = {}));
const defaultActions = [];
function registerDefaultAction(action) {
    defaultActions.push(action);
}
exports.registerDefaultAction = registerDefaultAction;
function getDefaultActions() {
    return defaultActions;
}
exports.getDefaultActions = getDefaultActions;
//# sourceMappingURL=action.js.map