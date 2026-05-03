import "../../App.css";
import type { HeaderProps } from "../../model/HeaderProps";
import { DropDown } from "../reusables/DropDown";


export function Header(props : HeaderProps) {
  
  const {algorithmList, onAlgorithmSelect, playbackSpeed, onPlayBackSpeedSelect} = props

  return (
    <div id="header">
      <h1 className="title">Algorithm Visualizer</h1>
      <br />
      <div className="menu">
        <div className="menu-item">
          <DropDown 
            dropDownData={algorithmList} 
            onDataSelect={onAlgorithmSelect} 
            defaultText="Select Algorithm"
          />
        </div>
        <div className="menu-item">
          <button>Visualize</button>
        </div>
        <div className="menu-item">
          <DropDown 
            dropDownData={playbackSpeed} 
            onDataSelect={onPlayBackSpeedSelect} 
            defaultText="Speed"
          />
        </div>
      </div>
    </div>
  );
}
