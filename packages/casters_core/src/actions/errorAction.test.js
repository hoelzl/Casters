"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const errorAction_1 = require("./errorAction");
const action_1 = require("../core/action");
const testObjects_1 = require("../data/testObjects");
(0, globals_1.describe)("ErrorAction", () => {
    (0, globals_1.test)("has correct description", () => {
        (0, globals_1.expect)(new errorAction_1.ErrorAction().description).toBe("Throw an error for testing purposes.");
    });
    (0, globals_1.test)("has correct tags", () => {
        (0, globals_1.expect)(new errorAction_1.ErrorAction().tags).toEqual(new Set([action_1.ActionTag.Error, action_1.ActionTag.TestOnly, action_1.ActionTag.InteractiveOnly]));
    });
    (0, globals_1.test)("perform() returns rejected promise", () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = new errorAction_1.ErrorAction();
        (0, globals_1.expect)(action.perform(player)).rejects.toHaveProperty("message", "This is an error for testing purposes.");
    });
});
//# sourceMappingURL=errorAction.test.js.map