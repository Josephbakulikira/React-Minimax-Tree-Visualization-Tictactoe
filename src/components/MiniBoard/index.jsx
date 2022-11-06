import React from 'react'
import "./style.css"

function MiniBoard({board}) {
    return (
        <div className='mini-board'>
            <span className={`mini-cell c0 ${board[0] && (board[0] === 1 ? "X" : "O")}`}>{board[0] ? (board[0] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c1 ${board[1] && (board[1] === 1 ? "X" : "O")}`}>{board[1] ? (board[1] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c2 ${board[2] && (board[2] === 1 ? "X" : "O")}`}>{board[2] ? (board[2] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c3 ${board[3] && (board[3] === 1 ? "X" : "O")}`}>{board[3] ? (board[3] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c4 ${board[4] && (board[4] === 1 ? "X" : "O")}`}>{board[4] ? (board[4] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c5 ${board[5] && (board[5] === 1 ? "X" : "O")}`}>{board[5] ? (board[5] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c6 ${board[6] && (board[6] === 1 ? "X" : "O")}`}>{board[6] ? (board[6] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c7 ${board[7] && (board[7] === 1 ? "X" : "O")}`}>{board[7] ? (board[7] === 1 ? "X" : "O") : "."}</span>
            <span className={`mini-cell c8 ${board[8] && (board[8] === 1 ? "X" : "O")}`}>{board[8] ? (board[8] === 1 ? "X" : "O") : "."}</span>
        </div>
    )
}

export default MiniBoard
