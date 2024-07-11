import { createContext, useState, useRef, RefObject } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  sidebarRef: RefObject<HTMLDivElement>;
  headerRef: RefObject<HTMLDivElement>;
};

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
