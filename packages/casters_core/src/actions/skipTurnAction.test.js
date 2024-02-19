"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const skipTurnAction_1 = require("./skipTurnAction");
const action_1 = require("../core/action");
const testObjects_1 = require("../data/testObjects");
(0, globals_1.describe)("SkipTurnAction", () => {
    (0, globals_1.test)("has correct description", () => {
        (0, globals_1.expect)(new skipTurnAction_1.SkipTurnAction().description).toBe("Do nothing during the current turn.");
    });
    (0, globals_1.test)("has correct tags", () => {
        (0, globals_1.expect)(new skipTurnAction_1.SkipTurnAction().tags).toEqual(new Set([action_1.ActionTag.SkipTurn]));
    });
    (0, globals_1.test)("perform() does nothing", () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = new skipTurnAction_1.SkipTurnAction();
        (0, globals_1.expect)(action.perform(player)).resolves.toBeUndefined();
        (0, globals_1.expect)(player.location.name).toBe("Room 1");
    });
});
//# sourceMappingURL=skipTurnAction.test.js.map