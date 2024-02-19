// GameStateContext.tsx
import { SelectHelpfulAction } from "casters_core/strategies/selectHelpfulAction";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Location } from "casters_core/core/location";
import { Player } from "casters_core/core/player";
import { GameState, UpdateStateObserver } from "./GameState";
import { Game } from "casters_core/core/game";
import * as gameData from "casters_core/data/dungeon.json";

const initialState: GameState = {
  currentLocation: new Location("Invalid Location", ""),
  availableActions: [],
};

const GameStateContext = createContext<{
  gameState: GameState;
  startGame: () => Promise<void>;
}>({
  gameState: initialState,
  startGame: async () => {},
});

type StateProps = {
  children: React.ReactNode;
};

function createGame(): Game {
  const game = new Game(gameData);
  const interactivePlayer = new Player(
    "Interactive Player",
    game.world.initialLocation,
    new SelectHelpfulAction(),
  );
  game.addPlayer(interactivePlayer);
  return game;
}

export const GameStateProvider: React.FC<StateProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  // Function to start the game
  const startGame = useCallback(async () => {
    const game = createGame();
    initialState.currentLocation = game.world.initialLocation;
    const observer = new UpdateStateObserver(gameState);
    game.registerObserver(observer);

    await game.run();

    // Update React state whenever the observer modifies the game state
    const updateGameState = () => setGameState({ ...observer.state });
    observer.onStateChange = updateGameState;
    updateGameState();
  }, []);

  useEffect(() => {
    startGame().catch(console.error);
  }, [startGame]);

  return (
    <GameStateContext.Provider value={{ gameState, startGame }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
