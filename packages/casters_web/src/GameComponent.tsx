import React from "react";
import { Action, capitalizeFirstLetter, MoveAction } from "./exports"; // @ts-ignore
import styles from "./GameComponent.module.css";
import { GameState, movementActions, nonMovementActions } from "./GameState";
import { Resolver } from "./SelectActionUsingReact";

const mixedStyles = {
  topOverlay: styles.overlay + " " + styles.topOverlay,
  bottomOverlay: styles.overlay + " " + styles.bottomOverlay,
};

function createButtons(actions: Action[], resolver: Resolver) {
  if (actions.length === 0) {
    return [<p>No more actions are available.</p>];
  }
  return actions.map((action: Action, index: number) => {
    let className = styles.button;
    let title = action.shortDescription;
    if (action instanceof MoveAction) {
      className +=
        " " + styles.directionButton + " " + styles[action.direction];
      title = `${capitalizeFirstLetter(action.direction)}`;
    }
    return (
      <button
        key={index}
        onClick={() => resolver.resolve(action)}
        className={className}
      >
        {title}
      </button>
    );
  });
}

type GameComponentProps = {
  gameState: GameState;
  resolver: Resolver;
};

function imageLocation(imageName: string) {
  return `./assets/images/${imageName}.webp`;
}

export const GameComponent = ({ gameState, resolver }: GameComponentProps) => {
  return (
    <div className={styles.gameContainer}>
      <img
        className={styles.backgroundImage}
        src={imageLocation(gameState.currentLocation.imageName)}
        alt={gameState.currentLocation.name}
      />
      <div className={mixedStyles.topOverlay}>
        <h1>{gameState.currentLocation.name}</h1>
      </div>
      <div className={mixedStyles.bottomOverlay}>
        <p>{gameState.currentLocation.description}</p>
      </div>
      <div className={styles.actionsContainer}>
        <div className={styles.movementActions}>
          {createButtons(movementActions(gameState), resolver).map(
            (button, index) => (
              <div key={index} className={button.props.className}>
                {button}
              </div>
            ),
          )}
        </div>
        <div className={styles.otherActions}>
          {createButtons(nonMovementActions(gameState), resolver)}
        </div>
      </div>
    </div>
  );
};
