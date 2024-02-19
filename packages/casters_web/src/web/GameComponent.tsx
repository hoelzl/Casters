import React from "react";
import { Action } from "./exports";
import { GameState } from "./GameState";
import { Resolver, ResolverFun } from "./SelectActionUsingReact";

function createButtons(actions: Action[], resolver: Resolver) {
  return actions.map((action: Action, index: number) => (
    <button key={index} onClick={() => resolver.resolve(action)}>
      {action.shortDescription}
    </button>
  ));
}

type GameComponentProps = {
  gameState: GameState;
  resolver: Resolver;
};

export const GameComponent = ({ gameState, resolver }: GameComponentProps) => {
  return (
    <div>
      <h1>Game</h1>
      <h2>Props</h2>
      <ul>
        <li>gameState: {`${gameState}`}</li>
        <li>resolver: {`(${resolver.resolve}, {resolver.promise})`}</li>
      </ul>
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
      <h2>Current Location: {gameState.currentLocation.name}</h2>
      <p>{gameState.currentLocation.description}</p>
      <h2>Buttons</h2>
      {createButtons(gameState.availableActions, resolver)}
    </div>
  );
};
