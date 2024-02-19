import React from "react";
import { createRoot } from "react-dom/client";
import { GameComponent } from "./GameComponent";
import { GameStateProvider, useGameState } from "./GameStateContext";

const App = () => {
  // noinspection JSUnusedLocalSymbols
  const { gameState, resolver, startGame } = useGameState();
  startGame().catch(console.error);
  return (
    <GameStateProvider>
      <GameComponent
        currentLocation={gameState.currentLocation}
        availableActions={gameState.availableActions}
      />
      Hello World!
    </GameStateProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
