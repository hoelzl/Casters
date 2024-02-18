import { describe, expect, test } from "@jest/globals";
import { ErrorAction } from "./errorAction";
import { ActionTag } from "../action";
import { createWorldAndPlayer } from "../data/testObjects";

describe("ErrorAction", () => {
  test("has correct description", () => {
    expect(new ErrorAction().description).toBe(
      "Throw an error for testing purposes.",
    );
  });

  test("has correct tags", () => {
    expect(new ErrorAction().tags).toEqual(
      new Set([ActionTag.Error, ActionTag.TestOnly, ActionTag.InteractiveOnly]),
    );
  });

  test("perform() raises an error", () => {
    const [_world, player] = createWorldAndPlayer();
    const action: ErrorAction = new ErrorAction();
    expect(() => action.perform(player)).toThrow(
      "This is an error for testing purposes.",
    );
  });
});
