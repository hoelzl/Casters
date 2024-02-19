"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const skipTurnAction_1 = require("../actions/skipTurnAction");
const testObjects_1 = require("../data/testObjects");
const selectAggressiveAction_1 = require("./selectAggressiveAction");
const moveAction_1 = require("../actions/moveAction");
const investigateAction_1 = require("../actions/investigateAction");
const action_1 = require("../core/action");
(0, globals_1.describe)("SelectAggressiveAction", () => {
    (0, globals_1.test)("is not interactive", () => {
        (0, globals_1.expect)(new selectAggressiveAction_1.SelectAggressiveAction().isInteractive).toBe(false);
    });
    (0, globals_1.test)("selectAction() returns SkipTurnAction if no actions", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = await new selectAggressiveAction_1.SelectAggressiveAction().selectAction(player, []);
        (0, globals_1.expect)(action).toBeInstanceOf(skipTurnAction_1.SkipTurnAction);
    });
    (0, globals_1.test)("selectAction() returns aggressive action if available", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const actions = [
            new moveAction_1.MoveAction("north"),
            new investigateAction_1.InvestigateAction(),
            new moveAction_1.MoveAction("south"),
        ];
        const action = await new selectAggressiveAction_1.SelectAggressiveAction().selectAction(player, actions);
        (0, globals_1.expect)(action.tags).toContain(action_1.ActionTag.Aggressive);
    });
    (0, globals_1.test)("selectAction() returns random action if no aggressive actions", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const actions = [new moveAction_1.MoveAction("north"), new moveAction_1.MoveAction("south")];
        const action = await new selectAggressiveAction_1.SelectAggressiveAction().selectAction(player, actions);
        (0, globals_1.expect)(action).toBeInstanceOf(moveAction_1.MoveAction);
    });
});
//# sourceMappingURL=selectAggressiveAction.test.js.map