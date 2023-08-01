import React from "react";

export const ExpendableButton = ({ isOpen = false, toggle, showMaterialSymbol = true }) => {
  const handleClick = () => {
    toggle(!isOpen);
  };

  return (
    <button onClick={handleClick}>
      {showMaterialSymbol && (
        <span
          className="material-symbols-outlined"
          style={{
            transform: `rotate(${isOpen ? 180 : 180}deg)`,
            transition: "all 0.25s",
          }}
        >
          {!isOpen ? "expand_more" : "expand_less"}
        </span>
      )}
      {!showMaterialSymbol && (isOpen ? "-" : "+")}
    </button>
  );
};
