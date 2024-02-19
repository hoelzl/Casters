import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Game, gameData, Location, Player } from "./exports";
import { GameComponent } from "./GameComponent";
import { GameState, UpdateStateObserver } from "./GameState";
import { Resolver, SelectActionUsingReact } from "./SelectActionUsingReact";

const initialState: GameState = {
  currentLocation: new Location("Invalid Location", ""),
  availableActions: [],
};

function createGameAndPlayer(
  setResolver: (resolver: Resolver) => void,
): [Game, Player] {
  const game = new Game(gameData);
  const interactivePlayer = new Player(
    "Interactive Player",
    game.world.initialLocation,
    new SelectActionUsingReact(setResolver),
  );
  game.addPlayer(interactivePlayer);
  return [game, interactivePlayer];
}

function createAndConfigureGameAndPlayer(
  setResolver: (resolver: Resolver) => void,
): [Game, Player] {
  const [game, player] = createGameAndPlayer(setResolver);
  initialState.currentLocation = player.location;
  initialState.availableActions = player.getPossibleActions();
  return [game, player];
}

function createAndConfigureObserver(
  game: Game,
  gameState: GameState,
  setGameState: (
    value: ((prevState: GameState) => GameState) | GameState,
  ) => void,
) {
  const observer = new UpdateStateObserver(gameState);
  game.registerObserver(observer);
  const updateGameStateFromObserver = () => {
    console.log("GameStateProvider.updateGameStateFromObserver()");
    setGameState({ ...observer.state });
  };
  observer.onStateChange = updateGameStateFromObserver;
  return updateGameStateFromObserver;
}

const App = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [resolver, setResolver] = useState<Resolver>({
    resolve: () => {},
  });

  const [game] = createAndConfigureGameAndPlayer(setResolver);
  createAndConfigureObserver(game, gameState, setGameState);
  let result = (
    <div>
      <h1>Initialization Failed!</h1>
      <p>
        Failed to assign a value to <code>result</code> variable.
      </p>
    </div>
  );

  useEffect(() => {
    game.run().catch((error: any) => {
      result = (
        <div>
          <h1>An error has Occurred</h1>
          <p>{error}</p>
        </div>
      );
    });
  }, []);

  result = <GameComponent gameState={gameState} resolver={resolver} />;

  console.log("Resolver", resolver);
  return result;
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
