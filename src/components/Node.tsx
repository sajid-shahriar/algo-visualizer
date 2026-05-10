import React from 'react';
import '../App.css';

interface NodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

export const Node: React.FC<NodeProps> = ({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  let extraClassName = '';
  if (isFinish) extraClassName = 'node-finish';
  else if (isStart) extraClassName = 'node-start';
  else if (isWall) extraClassName = 'node-wall';
  else if (isPath) extraClassName = 'node-path';
  else if (isVisited) extraClassName = 'node-visited';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};
