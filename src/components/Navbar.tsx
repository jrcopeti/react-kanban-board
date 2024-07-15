// Router
import { Link, useLocation } from "react-router-dom";

// UI
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

// Hooks
import { useOpenSidebar } from "../hooks/useOpenSidebar";

function Navbar() {
  const { toggleSidebar, headerRef } = useOpenSidebar();
  const path = useLocation();

  const pathname =
    path.pathname === "/" ? "home" : path.pathname.split("/").join("");

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between bg-gray-100 px-12 py-3 text-lg font-semibold w-full"
      ref={headerRef}
    >
      <button onClick={toggleSidebar}>
        <FiMenu size={40} className="cursor-pointer" />
      </button>

      <div className="capitalize text-xl">
        <h2>{pathname}</h2>
      </div>

      <Link to="/">
        <div className="flex cursor-pointer items-center gap-4">
          <h1>Kanban Board</h1>
          <MdOutlineSpaceDashboard size={45} />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
