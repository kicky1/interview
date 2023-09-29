'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [points, setPoints] = useState<{ x: number; y: number; visible: boolean}[]>([]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setPoints([...points, { x: e.clientX, y: e.clientY, visible: true }]);
  };

  const handleClearPoints = () => {
    setPoints([]);
  };

  const handleUndo = () => {
    const updatedPoints = [...points];
    for (let i = updatedPoints.length - 1; i >= 0; i--) {
      if (updatedPoints[i].visible) {
        updatedPoints[i].visible = false;
        setPoints(updatedPoints);
        break;
      }
    }
  };


  const handleRestore = () => {
    const updatedPoints = [...points];
    for (let i = updatedPoints.length - 1; i >= 0; i--) {
      if (!updatedPoints[i].visible) {
        updatedPoints[i].visible = true;
        setPoints(updatedPoints);
        break;
      }
    }
  };

  const checkIfAllPointsAreVisible = () => {
   return points.every((point) => point.visible);
  }

  const checkIfAllPointsAreInvisible = () => {
    return points.every((point) => !point.visible);
  }

  return (
    <>
      <div className="my-16 text-center">
        <p className="text-2xl">
          Task 1: <code className="font-mono font-bold">"Map of points"</code>
        </p>
        <div 
          className="box-content h-96 w-96 p-4 my-16 border-2 border-teal-600 rounded" 
          onClick={handleClick}
        >
          {points.map((point, index) => (
            point.visible && (
            <div 
              key={index} 
              className="absolute w-4 h-4 bg-teal-600 rounded-full" 
              style={{ top: point.y-7, left: point.x-7 }}
            />
          )))}
        </div>
          <Button className="m-2" onClick={handleClearPoints} disabled={points.length < 1}>Clear points</Button>
          <Button className="m-2" onClick={handleUndo} disabled={checkIfAllPointsAreInvisible()}>Undo</Button>
          <Button className="m-2" onClick={handleRestore} disabled={checkIfAllPointsAreVisible()}>Restore</Button>
      </div>
    </>
  );
}
