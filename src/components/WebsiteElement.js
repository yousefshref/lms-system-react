import React from "react";
import { useDrag } from "react-dnd";

const WebsiteElement = ({ element, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: element,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`${
        isDragging ? "opacity-50" : ""
      } justify-center transition-all min-w-[120px] max-w-[120px] flex flex-col gap-1 text-center p-4 rounded-xl bg-indigo-600 bg-opacity-40`}
    >
      <p>{element.title}</p>
      <span className="mx-auto text-3xl">{element.icon}</span>
    </div>
  );
};

export default WebsiteElement;
