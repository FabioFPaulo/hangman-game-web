import { OverlayProps } from "./types";
import "./index.scss";

export default function OverlayComponent(props: OverlayProps) {
  return (
    <div
      className="overlay-container"
      style={{ display: props.isVisible ? "flex" : "none" }}
    >
      <div className="overlay-container2">
        <div className="overlay-backdrop" />
        <div className="overlay-center-content">
          <div className="overlay-content">
            <div
              className="overlay-game-status"
              style={{ color: props.isWin ? "green" : "red" }}
            >
              {props.isWin ? "You Win" : "You Lose"}
            </div>
            <button className="overlay-button" onClick={props.resetGame}>
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
