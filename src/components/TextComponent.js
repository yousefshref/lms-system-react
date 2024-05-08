// TextComponent.js
import React from "react";

const TextComponent = ({ text }) => {
  return (
    <div style={{ margin: "10px", padding: "5px", border: "1px solid black" }}>
      {text}
    </div>
  );
};

export default TextComponent;
