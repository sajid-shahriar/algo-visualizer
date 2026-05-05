import { useState } from "react";
import { algorithmList } from "../data/AlgorithmsList";
import { playOptions } from "../data/PlayOptions";
import type{ DropDownData } from "../model/DropDownData";
import { Header } from './Header'
import '../App.css';
import { BubbleSortVisualization } from "./BubbleSort";
import { SelectionSortVisualization } from "./SelectionSort";
import { InsertionSortVisualization } from "./InsertionSort";

export function AlgoVisualizer(){
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<DropDownData>(algorithmList[0]);
    const [selectedPlaybackSpeed, setSelectedPlaybackSpeed] = useState<DropDownData>(playOptions[0]);
    const [isVisualizing, setIsVisualizing] = useState<boolean>(false);

    const handleAlgorithmSelect = (data: DropDownData) => {
        setSelectedAlgorithm(data);
        setIsVisualizing(false);
    };

    const handleVisualize = () => {
        setIsVisualizing(!isVisualizing);
    };

    const handleFinished = () => {
        setIsVisualizing(false);
    };

    return(
        <div>
        {/* header */}
            <Header 
                algorithmList={algorithmList}
                selectedAlgorithm={selectedAlgorithm}
                onAlgorithmSelect={handleAlgorithmSelect} 
                playbackSpeed={playOptions} 
                onPlayBackSpeedSelect={setSelectedPlaybackSpeed}
                selectedPlayBackSpeed={selectedPlaybackSpeed}
                onVisualize={handleVisualize}
                isVisualizing={isVisualizing}
            />
        {/* Algo details */}
            <div className="algorithm-details">
                <p><b>Selected Algorithm:</b> {selectedAlgorithm?.name || ''}</p>
                <p><b>Selected Speed:</b> {selectedPlaybackSpeed?.name || ''}</p>
            </div>

        {/* visualization */}
        <div id="visualization-container">
            {selectedAlgorithm?.value === 'bubbleSort' && (
                <BubbleSortVisualization 
                    speed={selectedPlaybackSpeed.value} 
                    isVisualizing={isVisualizing} 
                    onFinished={handleFinished}
                />
            )}
            {selectedAlgorithm?.value === 'selectionSort' && (
                <SelectionSortVisualization 
                    speed={selectedPlaybackSpeed.value} 
                    isVisualizing={isVisualizing} 
                    onFinished={handleFinished}
                />
            )}
            {selectedAlgorithm?.value === 'insertionSort' && (
                <InsertionSortVisualization 
                    speed={selectedPlaybackSpeed.value} 
                    isVisualizing={isVisualizing} 
                    onFinished={handleFinished}
                />
            )}
        </div>
        </div>
    );
}
