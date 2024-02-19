"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const moveAction_1 = require("./moveAction");
const action_1 = require("../core/action");
const testObjects_1 = require("../data/testObjects");
(0, globals_1.describe)("MoveAction", () => {
    (0, globals_1.test)("has correct description", () => {
        (0, globals_1.expect)(new moveAction_1.MoveAction("north").description).toBe("Move north.");
    });
    (0, globals_1.test)("has correct tags", () => {
        (0, globals_1.expect)(new moveAction_1.MoveAction("north").tags).toEqual(new Set([action_1.ActionTag.Movement]));
    });
    (0, globals_1.test)("perform() moves the player for valid direction", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = new moveAction_1.MoveAction("north");
        await action.perform(player);
        (0, globals_1.expect)(player.location.name).toBe("Room 2");
    });
    (0, globals_1.test)("perform() returns rejected promise for invalid direction", () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = new moveAction_1.MoveAction("invalid");
        (0, globals_1.expect)(action.perform(player)).rejects.toHaveProperty("message", "Exit 'invalid' does not exist.");
    });
});
//# sourceMappingURL=moveAction.test.js.map