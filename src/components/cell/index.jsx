import React from "react";
import "./style.css";

function Cell({ cell, index, handleClick, matched, winner, isFull }) {
  return (
    <div
      className={`cellBox ${
        matched && (matched.includes(index) ? "won" + winner : "")
      } ${isFull && "isfull"}`}
      onClick={() => handleClick(index)}
    >
      <span className={`cellText`}>{cell ? (cell === 1 ? "X" : "O") : ""}</span>
    </div>
  );
}

export default Cell;
