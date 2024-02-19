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
const game_1 = require("casters_core/core/game");
const player_1 = require("casters_core/core/player");
const printingObserver_1 = require("./cli/printingObserver");
const selectActionInteractively_1 = require("./cli/selectActionInteractively");
const gameData = __importStar(require("casters_core/data/dungeon.json"));
async function runGame() {
    const game = new game_1.Game(gameData, new printingObserver_1.PrintingObserver());
    const strategy = new selectActionInteractively_1.SelectActionInteractively();
    const interactivePlayer = new player_1.Player("Interactive Player", game.world.initialLocation, strategy);
    game.addPlayer(interactivePlayer);
    return game.run();
}
function main() {
    runGame()
        .catch((e) => console.error(e))
        .then(() => console.log("Game over"));
}
main();
//# sourceMappingURL=index.js.map