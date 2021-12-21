import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null), xIsNext: Math.random() < 0.5 };
  }
  handleClick = (i) => {
    const squares = this.state.squares.slice();
    // The game has ended with a winner or a square is already filled.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? (
      <FaUserAlt className="user-alt" />
    ) : (
      <FaUserCircle className="user-circle" />
    );
    this.setState({ squares, xIsNext: !this.state.xIsNext });
  };
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = <>Winner: {winner}</>;
    } else {
      status = (
        <>
          Next player:{" "}
          {this.state.xIsNext ? (
            <FaUserAlt className="user-alt" />
          ) : (
            <FaUserCircle className="user-circle" />
          )}
        </>
      );
    }
    return (
      <div>
        <div className="status">
          <h1>{status}</h1>
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/** status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

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
    if (
      squares[a] &&
      JSON.stringify(squares[a]) === JSON.stringify(squares[b]) &&
      JSON.stringify(squares[a]) === JSON.stringify(squares[c])
    ) {
      return squares[a];
    }
  }
  return null;
}
