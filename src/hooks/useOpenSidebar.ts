import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";

export function useOpenSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useOpenSidebar must be used within a OpenSidebarProvider");
  }
  return context;
}
