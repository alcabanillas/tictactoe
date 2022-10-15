const Square = ({ id, newState }) => {
  const [color, setColor] = React.useState("green");
  const [status, setStatus] = React.useState(null);
  const xo = ["O", "X"];

  const palet = ["red", "blue"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];

  //keep track of state of the Square
  React.useEffect(() => {
    //console.log(`Render ${id}`);
    return () => {
      //console.log(`unmounting Square ${id}`);
    };
  });

  return (
    <button
      onClick={(e) => {
        if (status !== null) return;
        let nextPlayer = newState({ id: id });
        setStatus(nextPlayer);
        let col = palet[nextPlayer]
        setColor(col);
        e.target.style.background = col;
      }}
    >
      <h1>{xo[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [boardStatus, setBoardStatus] = React.useState(Array(9).fill(null));
  
  let status = `Player ${player}`
  let winner = checkWinner(boardStatus)

  if (winner != null) {
    status = `Player ${winner} wins`
  }

  console.log(`boardStatus= ${JSON.stringify(boardStatus)}`)

  //define newState function
  const newState = ({id}) => {
    let thePlayer = player;
    boardStatus[id] = player; //player is present player
    setBoardStatus(boardStatus)

    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);

    return thePlayer; //we need to return the present player
  };

  const HandleClick = (id) => alert(`I'm square ${id}`);

  function renderSquare(i) {
    return <Square id={i} newState={newState}></Square>;
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>            
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
