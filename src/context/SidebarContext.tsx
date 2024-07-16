import { createContext, useState, useRef } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import type { SidebarContextType } from "src/types";

const defaultContextValue: SidebarContextType = {
  isSidebarOpen: false,
  toggleSidebar: () => {},
  sidebarRef: { current: null },
  headerRef: { current: null },
};

const SidebarContext = createContext(defaultContextValue);

function OpenSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(() => setIsSidebarOpen(false), sidebarRef, headerRef);

  function toggleSidebar() {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  }

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        sidebarRef,
        headerRef,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarContext, OpenSidebarProvider };
