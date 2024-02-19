"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerDied = exports.PlayerWon = exports.GameInProgress = exports.Result = void 0;
class Result {
    get description() {
        return `Result: ${this.constructor.name}`;
    }
    // noinspection JSUnusedGlobalSymbols
    isGameInProgress() {
        return false;
    }
    // noinspection JSUnusedGlobalSymbols
    hasPlayerWon() {
        return false;
    }
    // noinspection JSUnusedGlobalSymbols
    hasPlayerDied() {
        return false;
    }
}
exports.Result = Result;
class GameInProgress extends Result {
    isGameInProgress() {
        return true;
    }
}
exports.GameInProgress = GameInProgress;
// noinspection JSUnusedGlobalSymbols
class PlayerWon extends Result {
    hasPlayerWon() {
        return true;
    }
}
exports.PlayerWon = PlayerWon;
// noinspection JSUnusedGlobalSymbols
class PlayerDied extends Result {
    hasPlayerDied() {
        return true;
    }
}
exports.PlayerDied = PlayerDied;
//# sourceMappingURL=result.js.map