import React from "react";
import "./styles.css";

const Button = ({ children, backgroundColor, width, color }) => {
  return (
    <div
      className="download-button"
      style={{ backgroundColor: backgroundColor, width: width, color: color }}
    >
      <p>{children}</p>
    </div>
  );
};

export default Button;
