"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealAction = void 0;
const action_1 = require("../core/action");
class HealAction {
    static _tags = new Set([action_1.ActionTag.Helpful]);
    get description() {
        return "Heal yourself or another player.";
    }
    get shortDescription() {
        return "Heal";
    }
    get tags() {
        return HealAction._tags;
    }
    async perform(_player) {
        throw new Error("Method not implemented.");
    }
}
exports.HealAction = HealAction;
//# sourceMappingURL=healAction.js.map