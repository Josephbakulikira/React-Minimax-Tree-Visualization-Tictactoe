import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/board";
import "bootstrap/dist/css/bootstrap.min.css";
import ResetButton from "./components/ResetButton";
import MinimaxTree from "./components/Tree";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isFull, setIsFull] = useState(false);
  const [gameStatus, setGameStatus] = useState("You VS Computer");
  const [matched, setMatched] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [maxDepth, setMaxDepth] = useState(3);
  const [minimaxStates, setMinimaxState] = useState([]);
  const [showTree, setShowTree] = useState(false);

  const onOpenModal = () => setShowTree(true);
  const onCloseModal = () => setShowTree(false);

  function HandleCellClick(cellIndex) {
    let new_board = [...board];
    if (!winner && !isFull) {
      if (board[cellIndex] === null) {
        setBoard((currentBoard) => {
          currentBoard[cellIndex] = playerTurn;
          return currentBoard;
        });
        new_board[cellIndex] = playerTurn;
        CheckBoard(new_board);
        SwitchTurn();
        // new_board = ComputerTurn();
      }
    }
  }

  function ComputerTurn() {
    if (playerTurn === 2) {
      let new_board = [...board];
      let bestScore = -Infinity;
      let bestMove = null;

      let new_state = { states: [...board], score: 0, childs: [] };

      if (winner === null) {
        for (let i = 0; i < new_board.length; i++) {
          if (new_board[i] === null) {
            new_board[i] = 2;
            let score = Minimax(new_board, 0, false, new_state.childs);
            new_board[i] = null;
            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }
        console.log("here");
        new_board[bestMove] = 2;
        new_state.score = bestScore;
        setBoard(new_board);
        setMinimaxState((currentState) => [...currentState, new_state]);
      }
      SwitchTurn();

      return new_board;
    }
  }

  function GameIsOver(playervalue, board_data) {
    // console.log(playervalue)
    for (let i = 0; i < winningConditions.length; i++) {
      let j = winningConditions[i];
      if (
        board_data[j[0]] === board_data[j[1]] &&
        board_data[j[1]] === board_data[j[2]] &&
        board_data[j[0]] === playervalue
      ) {
        return playervalue;
      }
    }

    for (let i = 0; i < board_data.length; i++) {
      if (board_data[i] === null) {
        return null;
      }
    }

    return 0;
  }

  function Minimax(new_board, depth, isMaximizer, board_states) {
    if (depth >= maxDepth) {
      return 0;
    }
    let result_checker = GameIsOver(isMaximizer ? 2 : 1, new_board);
    // console.log(result_checker)
    if (result_checker !== null) {
      if (result_checker === 1) {
        return -1;
      } else if (result_checker === 2) {
        return 1;
      } else {
        return 0;
      }
    }

    if (isMaximizer) {
      let best_score = -Infinity;
      let board_data = { states: [...new_board], score: 0, childs: [] };
      let bestMove = null;
      for (let i = 0; i < new_board.length; i++) {
        if (new_board[i] === null) {
          new_board[i] = 2;
          let score = Minimax(new_board, depth + 1, false, board_data.childs);
          new_board[i] = null;
          best_score = Math.max(score, best_score);
          if (score > best_score) {
            bestMove = i;
          }
        }
      }
      board_data.states[bestMove] = 2;
      board_data.score = best_score;
      board_states.push(board_data);
      return best_score;
    } else {
      let best_score = Infinity;
      let board_data = { states: [...new_board], score: 0, childs: [] };
      let bestMove = null;
      for (let i = 0; i < new_board.length; i++) {
        if (new_board[i] === null) {
          new_board[i] = 1;
          let score = Minimax(new_board, depth + 1, true, board_data.childs);
          new_board[i] = null;
          best_score = Math.min(score, best_score);
          if (score < best_score) {
            bestMove = i;
          }
        }
      }
      board_data.states[bestMove] = 1;
      board_data.score = best_score;
      board_states.push(board_data);
      return best_score;
    }
  }

  function SwitchTurn() {
    if (!winner) setPlayerTurn((currentTurn) => (currentTurn === 1 ? 2 : 1));
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setPlayerTurn(1);
    setWinner(null);
    setIsFull(false);
    setGameStatus("You VS Computer");
    setMatched(null);
    setMinimaxState([]);
  }

  function CheckBoard(new_board) {
    // check winner
    let there_is_a_winner = false;
    for (let i = 0; i < winningConditions.length; i++) {
      let j = winningConditions[i];
      if (
        new_board[j[0]] === new_board[j[1]] &&
        new_board[j[1]] === new_board[j[2]] &&
        new_board[j[0]] !== null
      ) {
        there_is_a_winner = true;
        setWinner(new_board[j[0]]);
        setMatched(j);
        if (new_board[j[0]] === 1) {
          setGameStatus("You won");
        } else {
          setGameStatus("AI Won");
        }
      }
    }

    // check if the board is full

    if (!new_board.includes(null) && !there_is_a_winner) {
      setIsFull(true);
      setGameStatus("The Board is full !");
    }
  }

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
    } else {
      let board_data = ComputerTurn();
      if (board_data) {
        CheckBoard(board_data);
      }
      console.log(minimaxStates);
    }
  }, [playerTurn]);

  return (
    <>
      <div className=" m-4 d-flex justify-content-center">
        <button onClick={onOpenModal} className="buttontree">
          Show Minimax Tree
        </button>
      </div>
      <div className="row m-0">
        <div className="col-lg-12 col-md-12 col-sm-12 p-0 m-0">
          <div className="game-status">
            <span className="myText">{gameStatus}</span>
          </div>
          <br />
          <div className="board-container">
            <Board
              boardArray={board}
              handleClick={HandleCellClick}
              winner={winner}
              matched={matched}
              isFull={isFull}
            />
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <ResetButton handleReset={handleReset} />
          </div>
        </div>
        {/* <div className="col-lg-12 col-md-12 col-sm-12 m-0 p-0">
          <h2 className="text-center p-4 myText">Minimax Tree</h2>
          <MinimaxTree boardMap={minimaxStates} board={board}/>
        </div> */}
      </div>
      <PureModal
        header="Minimax Tree"
        isOpen={showTree}
        closeButton="X"
        closeButtonPosition="header"
        width="100vw"
        onClose={() => {
          onCloseModal();
          return true;
        }}
      >
        <MinimaxTree boardMap={minimaxStates} board={board} />
      </PureModal>
      ;
    </>
  );
}

export default App;
