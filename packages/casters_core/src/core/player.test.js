"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const errorAction_1 = require("../actions/errorAction");
const moveAction_1 = require("../actions/moveAction");
const quitAction_1 = require("../actions/quitAction");
const skipTurnAction_1 = require("../actions/skipTurnAction");
const testObjects_1 = require("../data/testObjects");
function expectActionOfType(actions, type, expected) {
    const action = actions.find((action) => action instanceof type);
    if (expected) {
        (0, globals_1.expect)(action).toBeDefined();
    }
    else {
        (0, globals_1.expect)(action).not.toBeDefined();
    }
}
(0, globals_1.describe)("Player", () => {
    (0, globals_1.test)("getPossibleActions() contains move actions", () => {
        const player = (0, testObjects_1.createPlayer)();
        const actions = player.getPossibleActions();
        expectActionOfType(actions, moveAction_1.MoveAction, true);
    });
    (0, globals_1.test)("getPossibleActions() includes default action for non-interactive player", () => {
        const player = (0, testObjects_1.createPlayer)();
        const actions = player.getPossibleActions();
        expectActionOfType(actions, skipTurnAction_1.SkipTurnAction, true);
        expectActionOfType(actions, quitAction_1.QuitAction, false);
    });
    (0, globals_1.test)("getPossibleActions() includes default actions for interactive player", () => {
        const [_world, player] = (0, testObjects_1.createWorldAndPlayer)({
            strategy: new testObjects_1.InteractiveStrategyForTests(),
        });
        const actions = player.getPossibleActions();
        expectActionOfType(actions, skipTurnAction_1.SkipTurnAction, true);
        expectActionOfType(actions, quitAction_1.QuitAction, true);
    });
    (0, globals_1.test)("selectAction() does not invoke strategy if no actions are available", () => {
        const player = (0, testObjects_1.createPlayer)({ strategy: new testObjects_1.ErrorStrategyForTests() });
        (0, globals_1.expect)(player.selectAction([])).resolves.toBeDefined();
    });
    (0, globals_1.test)("selectAction() returns SkipTurnAction if no actions are available", () => {
        const player = (0, testObjects_1.createPlayer)();
        const action = player.selectAction([]);
        (0, globals_1.expect)(action).resolves.toBeInstanceOf(skipTurnAction_1.SkipTurnAction);
    });
    (0, globals_1.test)("selectAction() invokes strategy if actions are available", () => {
        const player = (0, testObjects_1.createPlayer)({ strategy: new testObjects_1.ErrorStrategyForTests() });
        (0, globals_1.expect)(player.selectAction([new skipTurnAction_1.SkipTurnAction()])).rejects.toBeDefined();
    });
    (0, globals_1.test)("perform() does not throw if action does not throw", () => {
        const player = (0, testObjects_1.createPlayer)();
        (0, globals_1.expect)(player.perform(new skipTurnAction_1.SkipTurnAction())).resolves.toBeUndefined();
    });
    (0, globals_1.test)("perform() throws if action throws", () => {
        const player = (0, testObjects_1.createPlayer)();
        (0, globals_1.expect)(player.perform(new quitAction_1.QuitAction())).rejects.toBeInstanceOf(quitAction_1.QuitGameException);
    });
    (0, globals_1.test)("perform() calls noteActionPerformed", async () => {
        let [player, observer] = (0, testObjects_1.createPlayerAndObserver)();
        await player.perform(new skipTurnAction_1.SkipTurnAction());
        (0, globals_1.expect)(observer.calls).toContain("noteActionPerformed: SkipTurnAction");
    });
    (0, globals_1.test)("performIfPossible() calls noteActionImpossible if action is not possible", async () => {
        let [player, observer] = (0, testObjects_1.createPlayerAndObserver)();
        await player.performIfPossible(new errorAction_1.ErrorAction());
        (0, globals_1.expect)(observer.calls).toContain("noteActionImpossible: ErrorAction (This is an error for testing purposes.)");
    });
    (0, globals_1.test)("performIfPossible() calls noteGameQuit if action is QuitAction", async () => {
        let [player, observer] = (0, testObjects_1.createPlayerAndObserver)();
        try {
            await player.performIfPossible(new quitAction_1.QuitAction());
        }
        catch (e) {
            (0, globals_1.expect)(e).toBeInstanceOf(quitAction_1.QuitGameException);
        }
        (0, globals_1.expect)(observer.calls).toContain("noteQuitAction: Game quit by player.");
    });
});
//# sourceMappingURL=player.test.js.map