import type { DropDownData } from "./DropDownData";

export interface DropDownProps{
    dropDownData : DropDownData[];
    onDataSelect : (value : DropDownData) => void;
    defaultText : string;
}