"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintingDebugObserver = void 0;
const moveAction_1 = require("casters_core/actions/moveAction");
const gameObserver_1 = require("casters_core/core/gameObserver");
const utils_1 = require("casters_core/core/utils");
class PrintingDebugObserver {
    noteActionImpossible(player, action, reason) {
        console.log(`Action ${action.shortDescription} is impossible: ${reason}`);
    }
    noteActionPerformed(player, action) {
        if (action instanceof moveAction_1.MoveAction) {
            console.log(`Player ${player.name} moved to ${player.location.name}`);
        }
        else {
            console.log(`Player ${player.name} performed action: ${action.shortDescription}`);
        }
    }
    noteException(game, msg) {
        console.log(`Exception in game: ${msg}`);
    }
    noteGameOver(game, reason) {
        console.log(`Game over: ${gameObserver_1.GameOverReason[reason]}`);
    }
    noteGameQuit(player, reason) {
        console.log(`Player ${player.name} quit: ${reason}`);
    }
    noteGameStarted(game) {
        console.log("Game started");
    }
    notePossibleActions(player, actions) {
        if (!player.strategy.isInteractive) {
            console.log(`Possible actions for player ${player.name}:`);
            for (let action of actions) {
                console.log(`  ${action.shortDescription}`);
            }
        }
    }
    noteResult(game, result) {
        console.log(`Game result: ${result}`);
    }
    noteStartingAction(player, action) {
        console.log(`Player ${player.name} is starting action: ${action.shortDescription}`);
    }
    noteTurnStarted(player) {
        console.log(`${player.name} starts new turn in ${player.location.name}`);
        if (player.strategy.isInteractive) {
            const lines = (0, utils_1.wrapText)(player.location.description, 80);
            for (let line of lines) {
                console.log(line);
            }
        }
    }
    notify(player, msg) {
        console.log(`Player ${player.name}: ${msg}`);
    }
}
exports.PrintingDebugObserver = PrintingDebugObserver;
//# sourceMappingURL=printingDebugObserver.js.map