import React, { useState, useRef } from "react";

type Option = {
  code: string; // or 'number', depending on your data type
  label: string;
  image: string;
};

type CustomDropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle option selection
  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Get selected option
  const selectedOption = options.find((option) => option.code === value);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-selected" onClick={toggleDropdown}>
        {selectedOption ? (
          <div className="values">
            <img
              src={selectedOption.image}
              alt=""
              style={{ width: 15, height: 12 }}
            />
            <span className="info_text">
              ({selectedOption.code}) {selectedOption.label}
            </span>
          </div>
        ) : (
          <span>Select an option</span>
        )}
        <span className="dropdown-arrow"></span>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option.code}
              className="dropdown-option"
              onClick={() => handleSelect(option.code)}
            >
              <div className="single_option" style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={option.image}
                  alt=""
                  style={{ width: 15, height: 15 }}
                />
                <span>
                  ({option.code}) {option.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
