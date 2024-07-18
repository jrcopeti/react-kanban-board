import { createContext, useEffect} from "react";
import type { ThemeContextType } from "../types";
import { useLocalStorageState } from "../hooks/useLocalStorage";

const defaultContextValue: ThemeContextType = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

const ThemeContext = createContext(defaultContextValue);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode",
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    },
    [isDarkMode],
  );

  function toggleDarkMode(e: React.MouseEvent) {
    e.stopPropagation();
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
