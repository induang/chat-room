import clsx from "clsx";
import { useState } from "react";

interface SudoGridProps {
  test: number;
  rowIndex: number;
  columnIndex: number;
  sameRowOrColumn: boolean;
}
export default function SudoGrid({
  test,
  rowIndex,
  columnIndex,
  sameRowOrColumn,
}: SudoGridProps) {
  if (sameRowOrColumn) {
    console.log(rowIndex, columnIndex, true);
  }
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={clsx(
        "sudo-item",
        "w-full text-center items-stretch border-2",

        isHovered ? "bg-slate-500" : "",
        sameRowOrColumn ? "bg-slate-300" : "bg-slate-50"
      )}
      data-sudo-row={rowIndex + 1}
      data-sudo-column={columnIndex + 1}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {test}
    </div>
  );
}
