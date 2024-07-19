import { useTheme } from "../../hooks/useTheme";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Button } from "../@/components/ui/button";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button
    title="Light/Dark Mode"
      className="bg-slate-700 text-2xl text-blue-100 hover:bg-slate-500 dark:bg-pallette-100 dark:text-pallette-600"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </Button>
  );
}

export default DarkModeToggle;
