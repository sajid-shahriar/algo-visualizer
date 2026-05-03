import { useState, useEffect, useRef } from "react";
import type { DropDownProps } from "../../model/DropDownProps";
import type { DropDownData } from "../../model/DropDownData";

export function DropDown(props: DropDownProps) {
    const { dropDownData, onDataSelect, defaultText } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState(defaultText);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (data: DropDownData) => {
        setSelectedName(data.name);
        onDataSelect(data);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                {selectedName}
                <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
            </button>
            <div className={`dropdown-list ${isOpen ? 'show' : ''}`}>
                {dropDownData.map((data, index) => (
                    <button key={index} onClick={() => handleSelect(data)}>
                        {data.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
