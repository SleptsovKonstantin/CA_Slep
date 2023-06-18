import React, { useState } from "react";
import ReactDOM from "react-dom";

interface DropdownProps {
  options: string[];
}

const DropdownPortal: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>{"Select an option"}</button>
      {isOpen &&
        ReactDOM.createPortal(
          <ul style={{ border: "2px solid black", width: "10vw" }}>
            {options.map((option) => (
              <li key={option} onClick={() => handleOptionClick()}>
                {option}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};

export default DropdownPortal;
