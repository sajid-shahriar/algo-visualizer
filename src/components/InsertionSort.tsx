import { useState, useEffect, useCallback, useRef } from "react";

interface InsertionSortProps {
  speed: string;
  isVisualizing: boolean;
  onFinished: () => void;
}

const generateRandomArray = () => Array.from({ length: 20 }, () => Math.floor(Math.random() * 300) + 50);

export function InsertionSortVisualization({ speed, isVisualizing, onFinished }: InsertionSortProps) {
  const [array, setArray] = useState<number[]>(generateRandomArray);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const isSortingRef = useRef(false);
  const isVisualizingRef = useRef(isVisualizing);

  useEffect(() => {
    isVisualizingRef.current = isVisualizing;
  }, [isVisualizing]);

  const getDelay = useCallback(() => {
    switch (speed) {
      case "fast": return 50;
      case "medium": return 200;
      case "slow": return 500;
      default: return 200;
    }
  }, [speed]);

  const delay = useCallback((ms: number) => new Promise((resolve) => setTimeout(resolve, ms)), []);

  const checkPause = useCallback(async () => {
    while (!isVisualizingRef.current) {
      await delay(100);
    }
  }, [delay]);

  const insertionSort = useCallback(async () => {
    if (isSortingRef.current) return;
    isSortingRef.current = true;

    const arr = [...array];
    const n = arr.length;
    const sortedIndices: number[] = [0];
    setSorted([0]);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      
      await checkPause();
      setComparing([i, j]);
      await delay(getDelay());

      while (j >= 0 && arr[j] > key) {
        await checkPause();
        setSwapping([j, j + 1]);
        await delay(getDelay());
        
        arr[j + 1] = arr[j];
        setArray([...arr]);
        setSwapping([]);
        j = j - 1;
        if (j >= 0) {
            await checkPause();
            setComparing([i, j]);
        }
      }
      arr[j + 1] = key;
      setArray([...arr]);
      sortedIndices.push(i);
      setSorted([...sortedIndices]);
      setComparing([]);
    }
    setSorted(Array.from({ length: n }, (_, k) => k));
    isSortingRef.current = false;
    onFinished();
  }, [array, getDelay, onFinished, checkPause, delay]);

  useEffect(() => {
    if (isVisualizing && !isSortingRef.current) {
      insertionSort();
    }
  }, [isVisualizing, insertionSort]);

  return (
    <div id="visualization-container">
      {array.map((value, index) => {
        let className = "bar";
        if (comparing.includes(index)) className += " bar-comparing";
        if (swapping.includes(index)) className += " bar-swapping";
        if (sorted.includes(index)) className += " bar-sorted";

        return (
          <div
            key={index}
            className={className}
            style={{ height: `${value}px` }}
          ></div>
        );
      })}
    </div>
  );
}
