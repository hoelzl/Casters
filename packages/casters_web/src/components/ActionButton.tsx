import React from "react";
import { Action } from "../exports";
import { Resolver } from "../SelectActionUsingReact";
import styles from "./Casters.module.css";

type ActionButtonProps = {
  action: Action;
  index: number;
  resolver: Resolver;
};

export function ActionButton({ action, index, resolver }: ActionButtonProps) {
  let className = styles.button;
  let title = action.shortDescription;
  return (
    <button
      key={index}
      onClick={() => resolver.resolve(action)}
      className={className}
    >
      {title}
    </button>
  );
}
