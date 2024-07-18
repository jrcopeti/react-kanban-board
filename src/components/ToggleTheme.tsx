import { useTheme } from "../hooks/useTheme";

import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { Button } from "./@/components/ui/button";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </Button>
  );
}

export default DarkModeToggle;
