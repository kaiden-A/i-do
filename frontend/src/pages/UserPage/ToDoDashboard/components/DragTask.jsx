import Draggable from "react-draggable";
import { useRef, useState } from "react";

const COLUMN_X = {
  prep: 0,
  ongoing: 380,
  completed: 760,
};

function DraggableTask({ children, initialColumn }) {
  const nodeRef = useRef(null);

  const [pos, setPos] = useState({
    x: COLUMN_X[initialColumn],
    y: 0,
  });

  const handleStop = (e, data) => {
    const nearest = Object.entries(COLUMN_X).reduce((a, b) =>
      Math.abs(data.x - a[1]) < Math.abs(data.x - b[1]) ? a : b
    );

    setPos({ x: nearest[1], y: data.y });
  };

  return (
    <Draggable
      axis="x"
      nodeRef={nodeRef}
      position={pos}
      onStop={handleStop}
    >
      <div ref={nodeRef}>
        {children}
      </div>
    </Draggable>
  );
}

export default DraggableTask;
