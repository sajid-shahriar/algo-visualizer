import "../App.css";
import type { HeaderProps } from "../model/HeaderProps";
import { DropDown } from "./reusables/DropDown";


export function Header(props : HeaderProps) {
  
  const {algorithmList, selectedAlgorithm, onAlgorithmSelect, playbackSpeed, onPlayBackSpeedSelect, selectedPlayBackSpeed, onVisualize, isVisualizing} = props

  return (
    <div id="header">
      <h1 className="title">Algorithm Visualizer</h1>
      <br />
      <div className="menu">
        <div className="menu-item">
          <DropDown 
            dropDownData={algorithmList} 
            onDataSelect={onAlgorithmSelect} 
            defaultText= {selectedAlgorithm ? selectedAlgorithm.name : `Select Algorithm`}
          />
        </div>
        <div className="menu-item">
          <button onClick={onVisualize}>{isVisualizing ? 'Pause' : 'Play'}</button>
        </div>
        <div className="menu-item">
          <DropDown 
            dropDownData={playbackSpeed} 
            onDataSelect={onPlayBackSpeedSelect} 
            defaultText={selectedPlayBackSpeed ? selectedPlayBackSpeed.name : `Speed`}
          />
        </div>
      </div>
    </div>
  );
}
