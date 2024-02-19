import { Action } from "casters_core/core/Action";
import { MoveAction } from "casters_core/actions/MoveAction";
import { Game } from "casters_core/core/Game";
import { GameObserver, GameOverReason } from "casters_core/core/GameObserver";
import { Player } from "casters_core/core/Player";
import { Result } from "casters_core/core/Result";
import { wrapText } from "casters_core/core/utils";

export class PrintingDebugObserver implements GameObserver {
  noteActionImpossible(player: Player, action: Action, reason: string): void {
    console.log(`Action ${action.shortDescription} is impossible: ${reason}`);
  }

  noteActionPerformed(player: Player, action: Action): void {
    if (action instanceof MoveAction) {
      console.log(`Player ${player.name} moved to ${player.location.name}`);
    } else {
      console.log(
        `Player ${player.name} performed action: ${action.shortDescription}`,
      );
    }
  }

  noteException(game: Game, msg: string): void {
    console.log(`Exception in game: ${msg}`);
  }

  noteGameOver(game: Game, reason: GameOverReason): void {
    console.log(`Game over: ${GameOverReason[reason]}`);
  }

  noteGameQuit(player: Player, reason: string): void {
    console.log(`Player ${player.name} quit: ${reason}`);
  }

  noteGameStarted(game: Game): void {
    console.log("Game started");
  }

  notePossibleActions(player: Player, actions: Action[]): void {
    if (!player.strategy.isInteractive) {
      console.log(`Possible actions for player ${player.name}:`);
      for (let action of actions) {
        console.log(`  ${action.shortDescription}`);
      }
    }
  }

  noteResult(game: Game, result: Result): void {
    console.log(`Game result: ${result}`);
  }

  noteStartingAction(player: Player, action: Action): void {
    console.log(
      `Player ${player.name} is starting action: ${action.shortDescription}`,
    );
  }

  noteTurnStarted(player: Player): void {
    console.log(`${player.name} starts new turn in ${player.location.name}`);
    if (player.strategy.isInteractive) {
      const lines = wrapText(player.location.description, 80);
      for (let line of lines) {
        console.log(line);
      }
    }
  }

  notify(player: Player, msg: string): void {
    console.log(`Player ${player.name}: ${msg}`);
  }
}
