import React, { useState, useEffect } from "react";
import "../index.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [isSorting, setIsSorting] = useState(false);
  const MAX_HEIGHT = 300;
  const ARRAY_SIZE = 20;
  const CONTAINER_WIDTH = 900;
  const CONTAINER_HEIGHT = 400;

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from(
      { length: ARRAY_SIZE },
      () => Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
  };

  const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, 1100 - ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
    setIsSorting(false);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    const merge = async (left, right, startIndex) => {
      let sortedArray = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          sortedArray.push(left[leftIndex++]);
        } else {
          sortedArray.push(right[rightIndex++]);
        }

        // Ensure the original structure remains unchanged
        let updatedArray = [...arr];
        for (let i = 0; i < sortedArray.length; i++) {
          updatedArray[startIndex + i] = sortedArray[i];
        }

        setArray([...updatedArray]); // Update state without modifying the array structure
        await sleep(speed);
      }

      // Merge remaining elements
      while (leftIndex < left.length) {
        sortedArray.push(left[leftIndex++]);
        let updatedArray = [...arr];
        for (let i = 0; i < sortedArray.length; i++) {
          updatedArray[startIndex + i] = sortedArray[i];
        }
        setArray([...updatedArray]);
        await sleep(speed);
      }
      while (rightIndex < right.length) {
        sortedArray.push(right[rightIndex++]);
        let updatedArray = [...arr];
        for (let i = 0; i < sortedArray.length; i++) {
          updatedArray[startIndex + i] = sortedArray[i];
        }
        setArray([...updatedArray]);
        await sleep(speed);
      }

      return sortedArray;
    };

    const recursiveSort = async (arr, startIndex) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = await recursiveSort(arr.slice(0, mid), startIndex);
      const right = await recursiveSort(arr.slice(mid), startIndex + mid);
      return merge(left, right, startIndex);
    };

    const sortedArray = await recursiveSort(arr, 0);
    setArray([...sortedArray]);
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]); // Correctly update state
        await sleep(speed);
      }
    }

    setIsSorting(false);
  };

  const quickSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    const partition = async (low, high) => {
      let pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]); // Ensure state update after each swap
          await sleep(speed);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]); // Ensure state update
      await sleep(speed);

      return i + 1;
    };

    const recursiveSort = async (low, high) => {
      if (low < high) {
        let pivotIndex = await partition(low, high);
        await recursiveSort(low, pivotIndex - 1);
        await recursiveSort(pivotIndex + 1, high);
      }
    };

    await recursiveSort(0, arr.length - 1);
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]); // Update state properly
        await sleep(speed);
      }

      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }

    setIsSorting(false);
  };

  return (
    <div className="p-4">
      {/* Nav Bar */}
      <nav className="flex justify-between items-center">
        <button
          className="header"
          onClick={generateArray}
          // style={{ border: "none", borderRadius: "0", background: "none", padding: "0" }}
        >
          Sorting Algorithm Visualizer
        </button>
        <div className="flex gap-4">
          <button
            className="white-button"
            onClick={bubbleSort}
            disabled={isSorting}
          >
            Bubble Sort
          </button>
          <button
            className="white-button"
            onClick={() => mergeSort(array, setArray, speed)}
            disabled={isSorting}
          >
            Merge Sort
          </button>
          <button
            className="white-button"
            onClick={() => selectionSort(array, setArray, speed)}
            disabled={isSorting}
          >
            Selection Sort
          </button>
          <button
            className="white-button"
            onClick={() => quickSort(array, setArray, speed)}
            disabled={isSorting}
          >
            Quick Sort
          </button>
          <button
            className="white-button"
            onClick={() => insertionSort(array, setArray, speed)}
            disabled={isSorting}
          >
            Insertion Sort
          </button>
        </div>
      </nav>

      {/* Buttons */}
      <div className="flex justify-start gap-4 my-4">
        <button
          className="white-button"
          onClick={generateArray}
          disabled={isSorting}
        >
          New Array
        </button>
        <div className="white-button">
          <label>
            Speed:
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isSorting}
              style={{ verticalAlign: "middle" }}
            />
          </label>
        </div>
      </div>

      {/* Center only the sorting visualization box */}
      <div className="visualizer-wrapper">
        <div
          className="border border-gray-300 p-4 overflow-hidden"
          style={{
            width: `${CONTAINER_WIDTH}px`,
            height: `${CONTAINER_HEIGHT}px`,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {array.map((value, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 2px",
                width: `${CONTAINER_WIDTH / ARRAY_SIZE - 4}px`,
              }}
            >
              <div
                className="bg-yellow-300"
                style={{
                  height: `${(value / 100) * MAX_HEIGHT}px`,
                  width: "100%",
                }}
              ></div>
              <span
                style={{ marginTop: "5px", color: "white", fontWeight: "bold" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
