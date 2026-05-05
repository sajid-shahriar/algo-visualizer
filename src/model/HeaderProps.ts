import type { DropDownData } from "./DropDownData";

export interface HeaderProps{
    algorithmList : DropDownData[];
    selectedAlgorithm : DropDownData | undefined;
    onAlgorithmSelect : (data : DropDownData) => void;
    playbackSpeed : DropDownData[];
    onPlayBackSpeedSelect : (data : DropDownData) => void;
    selectedPlayBackSpeed : DropDownData | undefined;
    onVisualize : () => void;
    isVisualizing : boolean;
}