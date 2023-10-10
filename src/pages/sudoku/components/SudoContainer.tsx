import { useEffect, useState } from "react";
import SudoGrid from "./SudoGrid";

interface SudoContainerProps {
  sudokuValues: Array<Array<SudokuItem>>;
}

function sudokuMapFunction(
  sudokus: Array<Array<SudokuItem>>,
  row: number,
  column: number
) {
  return sudokus.map((sudokuRow, rowIndex) => {
    return sudokuRow.map((sudokuItem, columnIndex) => {
      if (columnIndex + 1 === column)
        return {
          ...sudokuItem,
          sameRowOrColumn: true,
        };
      else if (rowIndex + 1 === row)
        return {
          ...sudokuItem,
          sameRowOrColumn: true,
        };
      else return sudokuItem;
    });
  });
}

export default function SudoContainer({ sudokuValues }: SudoContainerProps) {
  const [sudokus, setSudokus] = useState(sudokuValues);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const ele = e.target as Element;
    const row = parseInt(ele.getAttribute("data-sudo-row") || "");
    const column = parseInt(ele.getAttribute("data-sudo-column") || "");

    if (row && column) {
      setSudokus((s) =>
        s.map((sudokuRows) => {
          return sudokuRows.map((sudokuItem) => ({
            ...sudokuItem,
            sameRowOrColumn: false,
          }));
        })
      );

      setSudokus((s) => sudokuMapFunction(s, row, column));
    }
  };

  return (
    <div
      className="w-full xs:w-120 m-auto sudo-container grid grid-cols-9 gap-0"
      onMouseOver={handleMouseOver}
    >
      {sudokus.map((sudokuRaw, rowIndex) => {
        return sudokuRaw.map((sudokuItem, columnIndex) => (
          <SudoGrid
            key={rowIndex + columnIndex}
            test={sudokuItem.value}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            sameRowOrColumn={sudokuItem.sameRowOrColumn || false}
          />
        ));
      })}
    </div>
  );
}
