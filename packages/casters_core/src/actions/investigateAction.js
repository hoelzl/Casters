"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigateAction = void 0;
const action_1 = require("../core/action");
class InvestigateAction {
    get description() {
        return "Investigate the current location.";
    }
    get shortDescription() {
        return "Investigate";
    }
    get tags() {
        return new Set([action_1.ActionTag.Investigation, action_1.ActionTag.Aggressive]);
    }
    async perform(_player) {
        throw new Error("Not implemented.");
    }
}
exports.InvestigateAction = InvestigateAction;
//# sourceMappingURL=investigateAction.js.map