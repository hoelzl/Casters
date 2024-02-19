"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintingObserver = void 0;
const moveAction_1 = require("casters_core/actions/moveAction");
const gameObserver_1 = require("casters_core/core/gameObserver");
const utils_1 = require("casters_core/core/utils");
class PrintingObserver {
    noteActionImpossible(player, action, reason) {
        if (player.strategy.isInteractive) {
            console.log(`You cannot perform action ${action.shortDescription}: ${reason}`);
        }
        else {
            console.log(`Player ${player} tried to perform impossible action ${action.shortDescription}: ${reason}`);
        }
    }
    noteActionPerformed(player, action) {
        const playerName = player.strategy.isInteractive
            ? "You"
            : `Player ${player.name}`;
        if (action instanceof moveAction_1.MoveAction) {
            console.log(`${playerName} moved to ${player.location.name}.`);
        }
        else if (!player.strategy.isInteractive) {
            console.log(`${playerName} performed action: ${action.shortDescription}.`);
        }
    }
    noteException(game, msg) {
        console.log(`Exception in game: ${msg}`);
    }
    noteGameOver(game, reason) {
        console.log(`Game over: ${gameObserver_1.GameOverReason[reason]}.`);
    }
    noteGameQuit(player, reason) {
        const playerName = player.strategy.isInteractive
            ? "You"
            : `Player ${player.name}`;
        console.log(`${playerName} quit: ${reason}`);
    }
    noteGameStarted(game) {
        console.log("Game started.");
    }
    notePossibleActions(player, actions) {
        if (!player.strategy.isInteractive) {
            console.log(`Possible actions for player ${player.name}:`);
            for (let action of actions) {
                console.log(`  ${action.shortDescription}`);
            }
        }
    }
    noteResult(game, result) { }
    noteStartingAction(player, action) { }
    noteTurnStarted(player) {
        if (player.strategy.isInteractive) {
            const lines = (0, utils_1.wrapText)(player.location.description, 80);
            console.log();
            for (let line of lines) {
                console.log(line);
            }
        }
        else {
            console.log(`${player.name} starts new turn in ${player.location.name}.`);
        }
    }
    notify(player, msg) {
        console.log(`Player ${player.name}: ${msg}`);
    }
}
exports.PrintingObserver = PrintingObserver;
//# sourceMappingURL=printingObserver.js.map