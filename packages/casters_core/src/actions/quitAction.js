"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuitAction = exports.QuitGameException = void 0;
const action_1 = require("../core/action");
class QuitGameException extends Error {
    message;
    constructor(message = "Game quit by player.") {
        super(message);
        this.message = message;
    }
}
exports.QuitGameException = QuitGameException;
class QuitAction {
    get description() {
        return "Quit the game.";
    }
    get shortDescription() {
        return "Quit";
    }
    get tags() {
        return new Set([action_1.ActionTag.Quit, action_1.ActionTag.InteractiveOnly]);
    }
    async perform(_player) {
        throw new QuitGameException();
    }
}
exports.QuitAction = QuitAction;
//# sourceMappingURL=quitAction.js.map