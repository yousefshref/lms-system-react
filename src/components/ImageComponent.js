// ImageComponent.js
import React from "react";

const ImageComponent = ({ src, textOnImage }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        src={src}
        alt="Dragged Image"
        style={{ width: "100%", height: "auto" }}
      />
      {textOnImage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <span>{textOnImage}</span>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;
