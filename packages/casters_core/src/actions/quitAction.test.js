"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const quitAction_1 = require("./quitAction");
const action_1 = require("../core/action");
const testObjects_1 = require("../data/testObjects");
(0, globals_1.describe)("QuitAction", () => {
    (0, globals_1.test)("has correct description", () => {
        (0, globals_1.expect)(new quitAction_1.QuitAction().description).toBe("Quit the game.");
    });
    (0, globals_1.test)("has correct tags", () => {
        (0, globals_1.expect)(new quitAction_1.QuitAction().tags).toEqual(new Set([action_1.ActionTag.Quit, action_1.ActionTag.InteractiveOnly]));
    });
    (0, globals_1.test)("perform() raises QuitGameException", () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = new quitAction_1.QuitAction();
        (0, globals_1.expect)(action.perform(player)).rejects.toBeInstanceOf(quitAction_1.QuitGameException);
    });
});
//# sourceMappingURL=quitAction.test.js.map