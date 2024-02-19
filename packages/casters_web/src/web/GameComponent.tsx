import React from "react";
import { Action } from "./exports";
import { GameState } from "./GameState";
import { Resolver } from "./SelectActionUsingReact";

function createButtons(actions: Action[], resolver: (action: Action) => void) {
  return actions.map((action: Action, index: number) => (
    <button key={index} onClick={() => resolver(action)}>
      {action.constructor.name}
    </button>
  ));
}

export const GameComponent = (gameState: GameState, resolver: Resolver) => {
  return (
    <div>
      <h1>Game</h1>
      <h2>Available Actions</h2>
      Number of Actions: {gameState.availableActions.length}
      <table>
        <tbody>
          {gameState.availableActions.map((action: Action, index: number) => (
            <tr key={index}>
              <td>{action.constructor.name}</td>
              <td>{action.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Current Location</h2>
      Location: {gameState.currentLocation.name}
      <br />
      Actions:{" "}
      {gameState.availableActions.map((action: Action, index: number) => (
        <div key={index}>{action.constructor.name}</div>
      ))}
      <h2>Buttons</h2>
      {createButtons(gameState.availableActions, resolver)}
    </div>
  );
};
