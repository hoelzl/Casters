import React from "react";
import { Action } from "./exports";
import { GameState } from "./GameState";
import { Resolver } from "./SelectActionUsingReact";

function createButtons(actions: Action[], resolver: Resolver) {
  if (actions.length === 0) {
    return <p>No more actions are available.</p>;
  }
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
      <h1>Casters RPG</h1>
      <h2>Current Location: {gameState.currentLocation.name}</h2>
      <img
        src={`img/${gameState.currentLocation.imageName}.webp`}
        alt={gameState.currentLocation.name}
      />
      <p>{gameState.currentLocation.description}</p>
      <h2>Actions</h2>
      {createButtons(gameState.availableActions, resolver)}
    </div>
  );
};
