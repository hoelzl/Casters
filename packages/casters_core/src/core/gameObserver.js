"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObserverBase = exports.GameOverReason = void 0;
// noinspection JSUnusedGlobalSymbols
var GameOverReason;
(function (GameOverReason) {
    GameOverReason[GameOverReason["PlayerWon"] = 0] = "PlayerWon";
    GameOverReason[GameOverReason["PlayerDied"] = 1] = "PlayerDied";
    GameOverReason[GameOverReason["Quit"] = 2] = "Quit";
    GameOverReason[GameOverReason["Error"] = 3] = "Error";
    GameOverReason[GameOverReason["TurnLimitReached"] = 4] = "TurnLimitReached";
})(GameOverReason || (exports.GameOverReason = GameOverReason = {}));
class GameObserverBase {
    noteActionImpossible(_player, _action, _reason) { }
    noteActionPerformed(_player, _action) { }
    noteException(_game, _msg) { }
    noteGameOver(_game, _reason) { }
    noteGameQuit(_player, _reason) { }
    noteGameStarted(_game) { }
    notePossibleActions(_player, _actions) { }
    noteResult(_game, _result) { }
    noteStartingAction(_player, _action) { }
    noteTurnStarted(_player) { }
    notify(_player, _msg) { }
}
exports.GameObserverBase = GameObserverBase;
//# sourceMappingURL=gameObserver.js.map