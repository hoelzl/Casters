import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { createWorldAndPlayer } from "../data/testObjects";
import { SkipTurnStrategy } from "./skipTurnStrategy";

describe("SkipTurnStrategy", () => {
  test("is not interactive", () => {
    expect(new SkipTurnStrategy().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction", () => {
    const [_world, player] = createWorldAndPlayer();
    const actions = player.getPossibleActions();
    const action = new SkipTurnStrategy().selectAction(player, actions);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });
});
