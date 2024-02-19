"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectActionInteractively = void 0;
const select_1 = __importDefault(require("@inquirer/select"));
// noinspection JSUnusedGlobalSymbols
class SelectActionInteractively {
    get isInteractive() {
        return true;
    }
    async selectAction(_player, actions) {
        return this.pickAction(actions);
    }
    async pickAction(actions) {
        const choices = actions.map((a) => ({
            name: a.shortDescription,
            value: a,
            description: a.description,
        }));
        return (0, select_1.default)({
            message: "Choose an action",
            choices: choices,
        });
    }
}
exports.SelectActionInteractively = SelectActionInteractively;
//# sourceMappingURL=selectActionInteractively.js.map