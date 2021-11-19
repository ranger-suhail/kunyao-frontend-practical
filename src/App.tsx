import "./App.css";
import { useState } from "react";

interface Location {
  row: number;
  col: number;
}

const ROW_COUNT = 6;
const COL_COUNT = 7;
const MINE_COUNT = 5;
const PLAIN = 0;
const MINE = 1;

// Represents the state of visible cells. Other numbers, like 0, 1, 2 represents the number of bombs in the adjacent cells.
const UNKNOWN = -1;

const rowNums: number[] = [];
for (let i = 0; i < ROW_COUNT; i++) {
  rowNums.push(i);
}

const colNums: number[] = [];
for (let i = 0; i < COL_COUNT; i++) {
  colNums.push(i);
}

const cellCount = ROW_COUNT * COL_COUNT;

const fillBoard = (board: number[][], value: number) => {
  const initRow = [];
  for (let i = 0; i < COL_COUNT; i++) {
    initRow.push(value);
  }

  for (let i = 0; i < COL_COUNT; i++) {
    board.push([...initRow]);
  }
};

const mineBoard: number[][] = [];
fillBoard(mineBoard, PLAIN);

const initVisibleBoard: number[][] = [];
fillBoard(initVisibleBoard, UNKNOWN);

const mineIds: Set<number> = new Set();

for (let i = 0; i < MINE_COUNT; i++) {
  let num = Math.round(cellCount * Math.random());
  while (mineIds.has(num)) {
    num = (num + 1) % cellCount;
  }
  mineIds.add(num);
}

const isMine = ({ row, col }: Location) => {
  let isHit = false;
  mineIds.forEach((mineId) => {
    const mineRow = Math.floor(mineId / COL_COUNT);
    const mineCol = mineId % COL_COUNT;
    if (mineRow === row && mineCol === col) {
      isHit = true;
    }
  });
  return isHit;
};

// Set mines.
for (let i = 0; i < ROW_COUNT; i++) {
  for (let j = 0; j < COL_COUNT; j++) {
    if (isMine({ row: i, col: j })) {
      mineBoard[i][j] = MINE;
    }
  }
}

const Board = () => {
  const [visibleBoard, setVisibleBoard] =
    useState<number[][]>(initVisibleBoard);

  const handleClickCell = ({ row: rowNum, col: colNum }: Location) => {
    if (isMine({ row: rowNum, col: colNum })) {
      alert("Bomb!");
      return;
    }

    // Please implement the logic here.
  };

  return (
    <div>
      <div>
        {rowNums.map((num, i) => (
          <div key={num}>
            <Row
              row={num}
              handleClickCell={handleClickCell}
              rowExpressions={visibleBoard[num]}
            />
          </div>
        ))}
      </div>
      <div>Visible Board</div>
      <hr />
      <div>(Hidden) Mine Board</div>
      <div>
        {rowNums.map((num, i) => (
          <div key={num}>
            <Row
              row={num}
              handleClickCell={handleClickCell}
              rowExpressions={mineBoard[num]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Row = ({
  row,
  rowExpressions,
  handleClickCell,
}: {
  row: number;
  rowExpressions: number[];
  handleClickCell: (loc: Location) => void;
}) => {
  return (
    <div>
      <span>{row}</span>{" "}
      {colNums.map((colNum, i) => (
        <Cell
          key={colNum}
          col={colNum}
          row={row}
          character={
            rowExpressions[colNum] === UNKNOWN
              ? "_"
              : String(rowExpressions[colNum])
          }
          handleClickCell={handleClickCell}
        />
      ))}
    </div>
  );
};

const Cell = ({
  character,
  col,
  row,
  handleClickCell,
}: {
  character: string;
  col: number;
  row: number;
  handleClickCell: (loc: Location) => void;
}) => {
  return (
    <span onClick={() => handleClickCell({ row, col })}>{character}|</span>
  );
};

const App = () => {
  return (
    <div className="app">
      <Board />
    </div>
  );
};

export default App;
