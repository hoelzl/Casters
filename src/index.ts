import * as gameData from "./data/dungeon.json";
import { createPlayer } from "./data/testObjects";
import { Game } from "./game";
import { Player } from "./player";
import { PrintingObserver } from "./tui/printingObserver";
import { SelectActionInteractively } from "./tui/selectActionInteractively";

// noinspection JSUnusedLocalSymbols
async function testInteractiveActionSelection() {
  const strategy = new SelectActionInteractively();
  const player = createPlayer({ strategy });
  const actions = player.getPossibleActions(true);
  return player.selectAction(actions);
}

// testInteractiveActionSelection().then((action) => {
//   console.log(`You selected: ${action.description}`);
// });

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
