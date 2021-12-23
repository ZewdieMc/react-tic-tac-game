import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
const Square = (props) => {
  return (
    <button id={props.sqID} className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={"square" + i}
        sqID={"square" + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let boardSize = 3;
    let board = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(this.renderSquare(i * boardSize + j));
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return <div>{board}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          location: Array(2).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const location = findLocation(i);
    const winner = calculateWinner(squares);
    // The game has ended with a winner or a square is already filled.
    if (winner.winLine || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? (
      <FaUserAlt className="user-alt" />
    ) : (
      <FaUserCircle className="user-circle" />
    );
    this.setState({
      history: history.concat([{ squares: squares, location: location }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
    const move_id = "move-" + step;
    const stepp = this.state.history.length;
    const doc = document.getElementById(move_id);
    for (let i = 0; i < stepp; i++) {
      var step_id = "move-" + i;
      var element = document.getElementById(step_id);
      if (element === doc) {
        doc.style.fontWeight = "bold";
        doc.style.color = "green";
      } else {
        element.style.fontWeight = "normal";
        element.style.color = "black";
      }
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" +
          move +
          " (" +
          step.location[0] +
          "," +
          step.location[1] +
          ")"
        : "Go to game start";
      const move_id = "move-" + move;
      return (
        <li key={move}>
          <button
            className=""
            id={move_id}
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner.winLine) {
      status = <>Winner: {winner.winSquare}</>;
      const lines = winner.winLine;
      for (let i in lines)
        document.getElementById("square" + lines[i]).style.backgroundColor =
          "#C3C49D ";
    } else {
      if (winner.isDraw) status = "Draw";
      else {
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
    }
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h1>{status}</h1>
            <ol>{moves}</ol>
          </div>
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

  var winner = {};
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[c] &&
      squares[b] &&
      JSON.stringify(squares[a]) === JSON.stringify(squares[b]) &&
      JSON.stringify(squares[a]) === JSON.stringify(squares[c])
    ) {
      winner = { isDraw: false, winSquare: squares[a], winLine: lines[i] };
      return winner;
    }
  }
  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isDraw = false;
      break;
    }
  }

  winner = { isDraw: isDraw, winSquare: null, winLine: null };
  return winner;
}

function findLocation(label) {
  const locations = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  for (let i = 0; i < locations.length; i++) {
    let [a, b] = locations[i];
    if (3 * a + b === label) return locations[i];
  }
  return null;
}
