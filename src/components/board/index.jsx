import React from "react";
import Cell from "../cell";
import "./style.css";

function Board({ boardArray, handleClick, matched, winner, isFull }) {
  return (
    <div>
      <div className="boardGrid">
        {boardArray.map((cell, index) => (
          <Cell
            key={(index + Math.random()).toString()}
            cell={cell}
            index={index}
            handleClick={handleClick}
            matched={matched}
            winner={winner}
            isFull={isFull}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
