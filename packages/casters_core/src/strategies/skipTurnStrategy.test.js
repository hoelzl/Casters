"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const skipTurnAction_1 = require("../actions/skipTurnAction");
const testObjects_1 = require("../data/testObjects");
const skipTurnStrategy_1 = require("./skipTurnStrategy");
(0, globals_1.describe)("SkipTurnStrategy", () => {
    (0, globals_1.test)("is not interactive", () => {
        (0, globals_1.expect)(new skipTurnStrategy_1.SkipTurnStrategy().isInteractive).toBe(false);
    });
    (0, globals_1.test)("selectAction() returns SkipTurnAction", async () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = await new skipTurnStrategy_1.SkipTurnStrategy().selectAction(player, []);
        (0, globals_1.expect)(action).toBeInstanceOf(skipTurnAction_1.SkipTurnAction);
    });
});
//# sourceMappingURL=skipTurnStrategy.test.js.map