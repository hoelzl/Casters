import { describe, expect, test } from "@jest/globals";
import { ErrorAction } from "./ErrorAction";
import { ActionTag } from "../core/Action";
import { createPlayer } from "../data/testObjects";

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

  test("perform() returns rejected promise", () => {
    const player = createPlayer();
    const action: ErrorAction = new ErrorAction();
    expect(action.perform(player)).rejects.toHaveProperty(
      "message",
      "This is an error for testing purposes.",
    );
  });
});
