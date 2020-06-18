import React, { Component } from "react";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  openWindow() {
    window.open("https://github.com", "_blank");
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const step = this.state.stepNumber;
    const winner = calculateWinner(current.squares);
    let status;
    if (winner === "X" || winner === "O") {
      status = "Winner is " + winner;
    } else if (step === 9) {
      status = "The game is drawn";
    } else {
      status = "Next Player is " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
        <button
          onClick={() => window.location.reload(false)}
          className="btn btn-warning"
        >
          NEW GAME
        </button>
        <button onClick={() => this.openWindow()} className="btn btn-warning">
          Git Hub
        </button>
        <div className="status">{status}</div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
