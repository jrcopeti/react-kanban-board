import { useContext } from "react";
import { DragAndDropContext } from "../context/DragAndDropContext";

export function useDragAndDrop() {
  const context = useContext(DragAndDropContext);
  if (context === undefined) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
}
