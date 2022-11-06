import React, { useRef } from "react";
import MiniBoard from "../MiniBoard";
import TreeChild from "../TreeChild";
import "./style.css";
import { exportComponentAsPNG } from "react-component-export-image";

function MinimaxTree({ boardMap, board }) {
  const treePdf = useRef();
  const lastIndex = boardMap.length - 1;
  return (
    <div className="TreeContainer">
      <button
        className="btn btn-primary"
        onClick={() =>
          exportComponentAsPNG(treePdf, { fileName: "minimaxTree" })
        }
      >
        Generate PNG
      </button>
      <div className="tree" ref={treePdf}>
        <ul>
          <li>
            {boardMap.length > 0 && (
              <li>
                <a href="">
                  <MiniBoard board={boardMap[lastIndex].states} />
                  <span className="scorespan">{boardMap[lastIndex].score}</span>
                </a>
                <ul>
                  {boardMap[lastIndex].childs.map((board_child) => {
                    return (
                      <TreeChild
                        key={Math.random().toString()}
                        boardMap={board_child}
                      />
                    );
                  })}
                </ul>
              </li>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MinimaxTree;
