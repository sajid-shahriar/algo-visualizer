import { useCallback, useEffect, useRef, useState } from 'react';
import '../App.css';
import type { NodeData } from '../model/Node';
import { Node } from './Node';

interface PathfindingVisualizerProps {
  speed: string;
  isVisualizing: boolean;
  onFinished: () => void;
  algorithm: string;
}

const ROWS = 20;
const COLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

export function PathfindingVisualizer({ speed, isVisualizing, onFinished, algorithm }: PathfindingVisualizerProps) {
  const [grid, setGrid] = useState<NodeData[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const isVisualizingRef = useRef(isVisualizing);

  useEffect(() => {
    isVisualizingRef.current = isVisualizing;
  }, [isVisualizing]);

  const getInitialGrid = useCallback(() => {
    const grid: NodeData[][] = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow: NodeData[] = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push({
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          isPath: false,
          previousNode: null,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }, []);

  useEffect(() => {
    setGrid(getInitialGrid());
  }, [getInitialGrid]);

  const handleMouseDown = (row: number, col: number) => {
    if (isVisualizingRef.current) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isVisualizingRef.current) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (grid: NodeData[][], row: number, col: number) => {
    const newGrid = grid.map(r => r.map(node => {
      if (node.row === row && node.col === col && !node.isStart && !node.isFinish) {
        return { ...node, isWall: !node.isWall };
      }
      return node;
    }));
    return newGrid;
  };

  const getDelay = useCallback(() => {
    switch (speed) {
      case "fast": return 10;
      case "medium": return 30;
      case "slow": return 100;
      default: return 30;
    }
  }, [speed]);

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const animateAlgorithm = async (visitedNodesInOrder: NodeData[], nodesInShortestPathOrder: NodeData[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        if (nodesInShortestPathOrder.length > 0) {
          await animateShortestPath(nodesInShortestPathOrder);
        }
        onFinished();
        return;
      }
      const node = visitedNodesInOrder[i];
      setGrid(prevGrid => {
        const newGrid = prevGrid.slice();
        const newNode = { ...newGrid[node.row][node.col], isVisited: true };
        newGrid[node.row][node.col] = newNode;
        return newGrid;
      });
      await delay(getDelay());
    }
  };

  const animateShortestPath = async (nodesInShortestPathOrder: NodeData[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      setGrid(prevGrid => {
        const newGrid = prevGrid.slice();
        const newNode = { ...newGrid[node.row][node.col], isPath: true };
        newGrid[node.row][node.col] = newNode;
        return newGrid;
      });
      await delay(getDelay() * 2);
    }
  };

  const visualizeAlgorithm = useCallback(async () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder: NodeData[] = [];

    const resetGrid = grid.map(row => row.map(node => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      previousNode: null
    })));
    
    const startNodeReset = resetGrid[START_NODE_ROW][START_NODE_COL];
    const finishNodeReset = resetGrid[FINISH_NODE_ROW][FINISH_NODE_COL];

    if (algorithm === 'bfs') {
      visitedNodesInOrder = bfs(resetGrid, startNodeReset, finishNodeReset);
    } else if (algorithm === 'dfs') {
      visitedNodesInOrder = dfs(resetGrid, startNodeReset, finishNodeReset);
    } else if (algorithm === 'dijkstra') {
      visitedNodesInOrder = dijkstra(resetGrid, startNodeReset, finishNodeReset);
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNodeReset);
    await animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }, [algorithm, grid, onFinished, speed]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isVisualizing) {
      visualizeAlgorithm();
    }
  }, [isVisualizing, visualizeAlgorithm]);

  return (
    <div className="grid-container">
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                {...node}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Algorithms
function bfs(grid: NodeData[][], startNode: NodeData, finishNode: NodeData): NodeData[] {
  const visitedNodesInOrder: NodeData[] = [];
  const queue: NodeData[] = [startNode];
  startNode.isVisited = true;
  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;
    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

function dfs(grid: NodeData[][], startNode: NodeData, finishNode: NodeData): NodeData[] {
  const visitedNodesInOrder: NodeData[] = [];
  const stack: NodeData[] = [startNode];
  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (currentNode.isWall) continue;
    if (currentNode.isVisited) continue;
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;
    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

function dijkstra(grid: NodeData[][], startNode: NodeData, finishNode: NodeData): NodeData[] {
  const visitedNodesInOrder: NodeData[] = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift()!;
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
  return visitedNodesInOrder;
}

// Helpers
function getNeighbors(node: NodeData, grid: NodeData[][]) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function getAllNodes(grid: NodeData[][]) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes: NodeData[]) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: NodeData, grid: NodeData[][]) {
  const unvisitedNeighbors = getNeighbors(node, grid).filter(neighbor => !neighbor.isVisited);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getNodesInShortestPathOrder(finishNode: NodeData) {
  const nodesInShortestPathOrder = [];
  let currentNode: NodeData | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

