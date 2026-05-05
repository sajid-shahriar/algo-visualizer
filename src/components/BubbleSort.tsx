import { useState, useEffect, useCallback, useRef } from "react";

interface BubbleSortProps {
  speed: string;
  isVisualizing: boolean;
  onFinished: () => void;
}

const generateRandomArray = () => Array.from({ length: 20 }, () => Math.floor(Math.random() * 300) + 50);

export function BubbleSortVisualization({ speed, isVisualizing, onFinished }: BubbleSortProps) {
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

  const bubbleSort = useCallback(async () => {
    if (isSortingRef.current) return;
    isSortingRef.current = true;
    
    const arr = [...array];
    const n = arr.length;
    const sortedIndices: number[] = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        await checkPause();
        setComparing([j, j + 1]);
        await delay(getDelay());

        if (arr[j] > arr[j + 1]) {
          await checkPause();
          setSwapping([j, j + 1]);
          await delay(getDelay());
          
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          setSwapping([]);
        }
        setComparing([]);
      }
      sortedIndices.push(n - i - 1);
      setSorted([...sortedIndices]);
    }
    setSorted(Array.from({ length: n }, (_, k) => k));
    isSortingRef.current = false;
    onFinished();
  }, [array, getDelay, onFinished, checkPause, delay]);

  useEffect(() => {
    if (isVisualizing && !isSortingRef.current) {
      bubbleSort();
    }
  }, [isVisualizing, bubbleSort]);

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
