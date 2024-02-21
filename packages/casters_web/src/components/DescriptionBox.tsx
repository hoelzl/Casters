import React from "react";
import { GameState } from "../GameState";
import styles from "./Casters.module.css";
import { v4 as uuidv4 } from "uuid";

export const mixedStyles = {
  descriptionBox: styles.overlay + " " + styles.descriptionBox,
};
type DescriptionBoxProps = {
  gameState: GameState;
};

export function DescriptionBox({ gameState }: DescriptionBoxProps) {
  return (
    <div className={mixedStyles.descriptionBox}>
      <p key={uuidv4()} className={styles.descriptionText}>
        {gameState.currentLocation.description}
      </p>
      {gameState.notifications.map((notification, index) => (
        <div key={uuidv4()}>
          <hr />
          <div
            className={styles.descriptionText}
            dangerouslySetInnerHTML={{ __html: notification }}
          ></div>
        </div>
      ))}
    </div>
  );
}
