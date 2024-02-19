// App.tsx or any component
import React from "react";
import { useGameState } from "./GameStateContext";
import { Action } from "casters_core/core/action";

export const GameComponent = () => {
  const { gameState } = useGameState();

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
    </div>
  );
};
