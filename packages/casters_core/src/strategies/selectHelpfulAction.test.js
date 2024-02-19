"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const skipTurnAction_1 = require("../actions/skipTurnAction");
const testObjects_1 = require("../data/testObjects");
const selectHelpfulAction_1 = require("./selectHelpfulAction");
const moveAction_1 = require("../actions/moveAction");
const action_1 = require("../core/action");
const healAction_1 = require("../actions/healAction");
(0, globals_1.describe)("SelectHelpfulAction", () => {
    (0, globals_1.test)("is not interactive", () => {
        (0, globals_1.expect)(new selectHelpfulAction_1.SelectHelpfulAction().isInteractive).toBe(false);
    });
    (0, globals_1.test)("selectAction() returns SkipTurnAction if no actions", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = await new selectHelpfulAction_1.SelectHelpfulAction().selectAction(player, []);
        (0, globals_1.expect)(action).toBeInstanceOf(skipTurnAction_1.SkipTurnAction);
    });
    (0, globals_1.test)("selectAction() returns helpful action if available", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const actions = [
            new moveAction_1.MoveAction("north"),
            new healAction_1.HealAction(),
            new moveAction_1.MoveAction("south"),
        ];
        const action = await new selectHelpfulAction_1.SelectHelpfulAction().selectAction(player, actions);
        (0, globals_1.expect)(action.tags).toContain(action_1.ActionTag.Helpful);
    });
    (0, globals_1.test)("selectAction() returns random action if no helpful actions", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const actions = [new moveAction_1.MoveAction("north"), new moveAction_1.MoveAction("south")];
        const action = await new selectHelpfulAction_1.SelectHelpfulAction().selectAction(player, actions);
        (0, globals_1.expect)(action).toBeInstanceOf(moveAction_1.MoveAction);
    });
});
//# sourceMappingURL=selectHelpfulAction.test.js.map