import { Game } from "casters_core/core/Game";
import { Player } from "casters_core/core/Player";
import { PrintingObserver } from "./cli/PrintingObserver";
import { SelectActionInteractively } from "./cli/SelectActionInteractively";
import * as gameData from "casters_core/data/dungeon.json";

async function runGame() {
  const game = new Game(gameData, new PrintingObserver());
  const strategy = new SelectActionInteractively();
  const interactivePlayer = new Player(
    "Interactive Player",
    game.world.initialLocation,
    strategy,
  );
  game.addPlayer(interactivePlayer);
  return game.run();
}

function main() {
  runGame()
    .catch((e) => console.error(e))
    .then(() => console.log("Game over"));
}

main();
