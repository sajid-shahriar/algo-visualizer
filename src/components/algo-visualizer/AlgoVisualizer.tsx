import { useState } from "react";
import { algorithmList } from "../../data/AlgorithmsList";
import { playOptions } from "../../data/PlayOptions";
import type{ DropDownData } from "../../model/DropDownData";
import { Header } from '../header/Header'

export function AlgoVisualizer(){
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<DropDownData>();
    const [selectedPlaybackSpeed, setSelectedPlaybackSpeed] = useState<DropDownData>(playOptions[0]);
    return(
        <div>
        {/* header */}
            <Header 
                algorithmList={algorithmList} 
                onAlgorithmSelect={setSelectedAlgorithm} 
                playbackSpeed={playOptions} 
                onPlayBackSpeedSelect={setSelectedPlaybackSpeed}
            />
        
            <div style={{ padding: '20px', color: 'white', backgroundColor: '#2c3e50' }}>
                <p><b>Selected Algorithm:</b> {selectedAlgorithm?.name || ''}</p>
                <p><b>Selected Speed:</b> {selectedPlaybackSpeed?.name || ''}</p>
            </div>

        {/* visualization */}
        </div>
    );
}
