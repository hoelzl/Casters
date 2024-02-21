import React from "react";
import { GameState } from "../GameState";
import styles from "./Casters.module.css";

export const mixedStyles = {
  descriptionBox: styles.overlay + " " + styles.descriptionBox,
};
type DescriptionBoxProps = {
  gameState: GameState;
};

export function DescriptionBox({ gameState }: DescriptionBoxProps) {
  return (
    <div className={mixedStyles.descriptionBox}>
      <p className={styles.descriptionText}>
        {gameState.currentLocation.description}
      </p>
    </div>
  );
}
