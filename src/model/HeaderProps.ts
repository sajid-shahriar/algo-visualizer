import type { DropDownData } from "./DropDownData";

export interface HeaderProps{
    algorithmList : DropDownData[],
    onAlgorithmSelect : (data : DropDownData) => void;
    playbackSpeed : DropDownData[];
    onPlayBackSpeedSelect : (data : DropDownData) => void;
}