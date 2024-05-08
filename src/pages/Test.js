import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TextComponent from "../components/TextComponent";
import ImageComponent from "../components/ImageComponent";

const ItemTypes = {
  TEXT: "text",
  IMAGE: "image",
};

const Test = () => {
  const [textOnImage, setTextOnImage] = useState(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.TEXT,
    drop: () => ({ type: ItemTypes.TEXT }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleImageDrop = () => {
    setTextOnImage("Sample Text"); // You can replace 'Sample Text' with the actual dropped text
  };

  return (
    <div>
      <h1>Website Builder</h1>
      <div
        style={{
          position: "relative",
          minHeight: "300px",
          border: "1px solid black",
        }}
      >
        <ImageComponent
          src="https://via.placeholder.com/300"
          textOnImage={textOnImage}
        />
        <div
          ref={drop}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          onDrop={handleImageDrop}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <span ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
          🅰️
        </span>{" "}
        Drag Text
      </div>
    </div>
  );
};

export default Test;
