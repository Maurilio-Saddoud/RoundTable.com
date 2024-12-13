import React from "react";

const Button = ({ children, backgroundColor, width, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-primary px-4 py-2 rounded-md text-white font-space font-bold cursor-pointer shadow-md flex items-center justify-center"
      style={{ backgroundColor, width, color }}
    >
      {children}
    </div>
  );
};

export default Button;
