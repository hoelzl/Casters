import { describe, expect, test } from "@jest/globals";
import { MoveAction } from "./moveAction";
import { ActionTag } from "../action";
import { createPlayer } from "../data/testObjects";

describe("MoveAction", () => {
  test("has correct description", () => {
    expect(new MoveAction("north").description).toBe("Move north.");
  });

  test("has correct tags", () => {
    expect(new MoveAction("north").tags).toEqual(new Set([ActionTag.Movement]));
  });

  test("perform() moves the player for valid direction", () => {
    const player = createPlayer();
    const action: MoveAction = new MoveAction("north");
    action.perform(player);
    expect(player.location.name).toBe("Room 2");
  });

  test("perform() does nothing for invalid direction", () => {
    const player = createPlayer();
    const action: MoveAction = new MoveAction("invalid");

    expect(() => action.perform(player)).toThrow(
      "Exit 'invalid' does not exist.",
    );
  });
});
