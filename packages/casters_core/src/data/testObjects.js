"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayerAndObserver = exports.GameObserverForTests = exports.ErrorStrategyForTests = exports.InteractiveStrategyForTests = exports.createPlayer = exports.createWorldAndPlayer = void 0;
const skipTurnAction_1 = require("../actions/skipTurnAction");
const simpleGameData = __importStar(require("./simpleGame.json"));
const player_1 = require("../core/player");
const skipTurnStrategy_1 = require("../strategies/skipTurnStrategy");
const worldFactory_1 = require("../core/worldFactory");
function createWorldAndPlayer(params = {}) {
    const world = (0, worldFactory_1.createWorldFromJsonData)(simpleGameData);
    const player = new player_1.Player("Test Player", world.getLocation("Room 1"), params?.strategy ?? new skipTurnStrategy_1.SkipTurnStrategy());
    if (params.observer) {
        player.registerObserver(params.observer);
    }
    return [world, player];
}
exports.createWorldAndPlayer = createWorldAndPlayer;
function createPlayer(params = {}) {
    return createWorldAndPlayer(params)[1];
}
exports.createPlayer = createPlayer;
class InteractiveStrategyForTests {
    get isInteractive() {
        return true;
    }
    selectAction(_player, actions) {
        return Promise.resolve(actions?.[0] ?? new skipTurnAction_1.SkipTurnAction());
    }
}
exports.InteractiveStrategyForTests = InteractiveStrategyForTests;
class ErrorStrategyForTests {
    get isInteractive() {
        return true;
    }
    selectAction(_player, _actions) {
        throw new Error("This strategy always throws an error.");
    }
}
exports.ErrorStrategyForTests = ErrorStrategyForTests;
class GameObserverForTests {
    calls = [];
    noteActionImpossible(_player, action, reason) {
        this.calls.push(`noteActionImpossible: ${action.constructor.name} (${reason})`);
    }
    noteStartingAction(_player, action) {
        this.calls.push(`noteStartingAction: ${action.constructor.name}`);
    }
    noteActionPerformed(_player, action) {
        this.calls.push(`noteActionPerformed: ${action.constructor.name}`);
    }
    noteException(_game, msg) {
        this.calls.push(`noteException: ${msg}`);
    }
    noteGameOver(_game, reason) {
        this.calls.push(`noteGameOver: ${reason}`);
    }
    noteGameStarted(_game) {
        this.calls.push("noteGameStarted");
    }
    notePossibleActions(_player, actions) {
        this.calls.push(`notePossibleActions ${actions.map((a) => a.constructor.name).join(", ")}`);
    }
    noteResult(_game, result) {
        this.calls.push(`noteResult: ${result.description}`);
    }
    noteTurnStarted(player) {
        this.calls.push(`noteTurnStarted: ${player.name}`);
    }
    noteGameQuit(_player, reason) {
        this.calls.push(`noteQuitAction: ${reason}`);
    }
    notify(_player, msg) {
        this.calls.push(`notify: ${msg}`);
    }
}
exports.GameObserverForTests = GameObserverForTests;
function createPlayerAndObserver() {
    let observer = new GameObserverForTests();
    const player = createPlayer({ observer: observer });
    return [player, observer];
}
exports.createPlayerAndObserver = createPlayerAndObserver;
//# sourceMappingURL=testObjects.js.map