import React, { FunctionComponent, useState } from "react";

interface DropdownProps {
  options: string[];
}

const Dropdown: FunctionComponent<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{
        width: "30vw",
        height: "30vh",
        background: "azure",
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button onClick={() => setIsOpen(!isOpen)}>
        { "Select an option"}
      </button>
      {isOpen && (
        <ul style={{ border: "solid" }}>
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick()}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
