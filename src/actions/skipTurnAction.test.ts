import { describe, expect, test } from "@jest/globals";
import { SkipTurnAction } from "./skipTurnAction";
import { ActionTag } from "../action";
import { createPlayer } from "../data/testObjects";

describe("SkipTurnAction", () => {
  test("has correct description", () => {
    expect(new SkipTurnAction().description).toBe("Skip the turn.");
  });

  test("has correct tags", () => {
    expect(new SkipTurnAction().tags).toEqual(new Set([ActionTag.SkipTurn]));
  });

  test("perform() does nothing", () => {
    const player = createPlayer();
    const action: SkipTurnAction = new SkipTurnAction();
    expect(() => action.perform(player)).not.toThrow();
    expect(player.location.name).toBe("Room 1");
  });
});
