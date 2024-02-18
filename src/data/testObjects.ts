import * as simpleGameData from "../data/simpleGame.json";
import { GameObserver } from "../gameObserver";
import { Player } from "../player";
import { SkipTurnStrategy } from "../strategies/skipTurnStrategy";
import { Strategy } from "../strategy";
import { World } from "../world";
import { createWorldFromJsonData } from "../worldFactory";

type WorldAndPlayerParams = {
  strategy?: Strategy;
  observer?: GameObserver;
};

export function createWorldAndPlayer(
  params: WorldAndPlayerParams = {},
): [World, Player] {
  const world = createWorldFromJsonData(simpleGameData);
  const player = new Player(
    "Test Player",
    world.getLocation("Room 1"),
    params?.strategy ?? new SkipTurnStrategy(),
  );
  if (params.observer) {
    player.registerObserver(params.observer);
  }
  return [world, player];
}
