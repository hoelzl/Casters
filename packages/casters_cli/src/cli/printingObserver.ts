import { Action } from "casters_core/core/action";
import { MoveAction } from "casters_core/actions/moveAction";
import { Game } from "casters_core/core/game";
import { GameObserver, GameOverReason } from "casters_core/core/gameObserver";
import { Player } from "casters_core/core/player";
import { Result } from "casters_core/core/result";
import { wrapText } from "casters_core/core/utils";

export class PrintingObserver implements GameObserver {
  noteActionImpossible(player: Player, action: Action, reason: string): void {
    if (player.strategy.isInteractive) {
      console.log(
        `You cannot perform action ${action.shortDescription}: ${reason}`,
      );
    } else {
      console.log(
        `Player ${player} tried to perform impossible action ${action.shortDescription}: ${reason}`,
      );
    }
  }

  noteActionPerformed(player: Player, action: Action): void {
    const playerName = player.strategy.isInteractive
      ? "You"
      : `Player ${player.name}`;
    if (action instanceof MoveAction) {
      console.log(`${playerName} moved to ${player.location.name}.`);
    } else if (!player.strategy.isInteractive) {
      console.log(
        `${playerName} performed action: ${action.shortDescription}.`,
      );
    }
  }

  noteException(game: Game, msg: string): void {
    console.log(`Exception in game: ${msg}`);
  }

  noteGameOver(game: Game, reason: GameOverReason): void {
    console.log(`Game over: ${GameOverReason[reason]}.`);
  }

  noteGameQuit(player: Player, reason: string): void {
    const playerName = player.strategy.isInteractive
      ? "You"
      : `Player ${player.name}`;
    console.log(`${playerName} quit: ${reason}`);
  }

  noteGameStarted(game: Game): void {
    console.log("Game started.");
  }

  notePossibleActions(player: Player, actions: Action[]): void {
    if (!player.strategy.isInteractive) {
      console.log(`Possible actions for player ${player.name}:`);
      for (let action of actions) {
        console.log(`  ${action.shortDescription}`);
      }
    }
  }

  noteResult(game: Game, result: Result): void {}

  noteStartingAction(player: Player, action: Action): void {}

  noteTurnStarted(player: Player): void {
    if (player.strategy.isInteractive) {
      const lines = wrapText(player.location.description, 80);
      console.log();
      for (let line of lines) {
        console.log(line);
      }
    } else {
      console.log(`${player.name} starts new turn in ${player.location.name}.`);
    }
  }

  notify(player: Player, msg: string): void {
    console.log(`Player ${player.name}: ${msg}`);
  }
}
