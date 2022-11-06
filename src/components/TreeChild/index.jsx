import React from "react";
import MiniBoard from "../MiniBoard";
import "./style.css";

function TreeChild({ children, boardMap }) {
  return (
      <li>
        <a href="">
          <MiniBoard board={boardMap.states}/>
          <span className="scorespan">{boardMap.score}</span>
        </a>
        
          {
            boardMap.childs.length > 0 && (
            <ul>
                {
                    boardMap.childs.map((board_child, index) => {
                        return <TreeChild key={(index + Math.random()).toString()}  boardMap={board_child}/>
                    })
                }
            </ul>)
          }
      </li>
  );
}

export default TreeChild;
