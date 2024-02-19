import React from "react";
import ReactDOM from "react-dom";
import { GameComponent } from "./GameComponent";

const App = () => (
  <div>
    <GameComponent />
    Hello World!
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
