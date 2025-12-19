import Draggable from "react-draggable";
import { useState, useRef } from "react";

const snapPoints = [
  { x: 0, y: 0 },
  { x: 200, y: 0 },
  { x: 400, y: 200 },
];

function DragSnap() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null); // ✅ REQUIRED

  const handleStop = (e, data) => {
    let nearest = snapPoints[0];

    snapPoints.forEach((p) => {
      const dist = Math.hypot(data.x - p.x, data.y - p.y);
      const nearestDist = Math.hypot(data.x - nearest.x, data.y - nearest.y);
      if (dist < nearestDist) nearest = p;
    });

    setPos(nearest);
  };

  return (
    <Draggable
      nodeRef={nodeRef}     // ✅ FIX
      position={pos}
      onStop={handleStop}
    >
      <div
        ref={nodeRef}       // ✅ FIX
        style={{
          width: 80,
          height: 80,
          background: "crimson",
          borderRadius: 8,
          cursor: "grab",
        }}
      />
    </Draggable>
  );
}

export default DragSnap;
