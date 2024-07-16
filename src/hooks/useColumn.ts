import { useContext } from "react";
import { ColumnContext } from "../context/ColumnContext";

export function useColumn() {
  const context = useContext(ColumnContext);
  if (context === undefined) {
    throw new Error("useColumn must be used within a ColumnProvider");
  }
  return context;
}
