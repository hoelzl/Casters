"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorAction = void 0;
const action_1 = require("../core/action");
class ErrorAction {
    static _tags = new Set([
        action_1.ActionTag.Error,
        action_1.ActionTag.TestOnly,
        action_1.ActionTag.InteractiveOnly,
    ]);
    get description() {
        return "Throw an error for testing purposes.";
    }
    get shortDescription() {
        return "TEST: Error";
    }
    get tags() {
        return ErrorAction._tags;
    }
    async perform(_player) {
        throw new Error("This is an error for testing purposes.");
    }
}
exports.ErrorAction = ErrorAction;
//# sourceMappingURL=errorAction.js.map