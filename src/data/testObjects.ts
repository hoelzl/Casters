import { Player } from "../player";
import { createWorldFromJsonData } from "../worldFactory";
import { World } from "../world";
import { SkipTurnStrategy } from "../strategies/skipTurnStrategy";
import * as simpleGameData from "../data/simpleGame.json";

export function createWorldAndPlayer(): [World, Player] {
  const world = createWorldFromJsonData(simpleGameData);
  const player = new Player(
    "Test Player",
    world.getLocation("Room 1"),
    new SkipTurnStrategy(),
  );
  return [world, player];
}
