import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "../actions/skipTurnAction";
import { createPlayer } from "../data/testObjects";
import { SkipTurnStrategy } from "./skipTurnStrategy";

describe("SkipTurnStrategy", () => {
  test("is not interactive", () => {
    expect(new SkipTurnStrategy().isInteractive).toBe(false);
  });

  test("selectAction() returns SkipTurnAction", () => {
    const player = createPlayer();
    const action = new SkipTurnStrategy().selectAction(player, []);
    expect(action).toBeInstanceOf(SkipTurnAction);
  });
});
